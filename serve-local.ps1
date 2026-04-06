param([int]$Port = 8765)

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
Write-Host "READY http://127.0.0.1:$Port/"

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  $urlPath = [Uri]::UnescapeDataString($request.Url.AbsolutePath)
  if ($urlPath -eq "/" -or $urlPath -eq "") { $urlPath = "/index.html" }
  $relative = $urlPath.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)
  $filePath = Join-Path $Root $relative
  $fullRoot = [IO.Path]::GetFullPath($Root)
  try {
    $fullFile = [IO.Path]::GetFullPath($filePath)
  } catch {
    $response.StatusCode = 400
    $response.Close()
    continue
  }
  if (-not $fullFile.StartsWith($fullRoot, [StringComparison]::OrdinalIgnoreCase)) {
    $response.StatusCode = 403
    $response.Close()
    continue
  }
  if (Test-Path $fullFile -PathType Container) {
    $fullFile = Join-Path $fullFile "index.html"
  }
  if (-not (Test-Path -LiteralPath $fullFile -PathType Leaf)) {
    $notFound = [Text.Encoding]::UTF8.GetBytes("404 Not Found")
    $response.StatusCode = 404
    $response.ContentLength64 = $notFound.Length
    $response.OutputStream.Write($notFound, 0, $notFound.Length)
    $response.Close()
    continue
  }
  $ext = [IO.Path]::GetExtension($fullFile).ToLowerInvariant()
  $mime = switch ($ext) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".svg" { "image/svg+xml" }
    ".png" { "image/png" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".ico" { "image/x-icon" }
    ".json" { "application/json; charset=utf-8" }
    ".txt" { "text/plain; charset=utf-8" }
    default { "application/octet-stream" }
  }
  $bytes = [IO.File]::ReadAllBytes($fullFile)
  $response.ContentType = $mime
  $response.ContentLength64 = $bytes.Length
  $response.OutputStream.Write($bytes, 0, $bytes.Length)
  $response.Close()
}
