# IMOVEIS CS

Site de apartamentos Minha Casa Minha Vida em São Paulo.

> **Importante:** Os arquivos servidos na Vercel ficam na pasta `public/`. Ao editar o site, altere os arquivos em `public/` (index.html, styles.css, script.js, assets/).

## Deploy na Vercel

### Opção 1: Via Git (recomendado)

1. Crie um repositório no GitHub e envie o projeto:
   ```bash
   git init
   git add .
   git commit -m "Setup inicial"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/IMOVEIS-CS.git
   git push -u origin main
   ```

2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em **Add New Project**
4. Importe o repositório do GitHub
5. A Vercel detectará automaticamente a configuração
6. Clique em **Deploy**

### Opção 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

O site estará disponível em um URL como `imoveis-cs.vercel.app`.
