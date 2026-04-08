// ============================================================
// PRÉ-APROVAÇÃO — destino do envio (use UM dos dois)
//
// A) GOOGLE FORMS (grátis, respostas na planilha do Google)
//    1) Crie um formulário em https://forms.google.com com perguntas de texto para:
//       Nome, E-mail, WhatsApp, CPF, Origem, Empreendimento (texto), Mensagem, Autorização (Sim/Não).
//    2) Publique o formulário e copie o link de envio: deve terminar em /formResponse
//       Ex.: https://docs.google.com/forms/d/e/1FAIpQLSdXXXX...XXXX/formResponse
//    3) Obtenha o ID "entry.123..." de cada pergunta:
//       — Envie uma resposta de teste, abra DevTools (F12) → Rede → procure "formResponse"
//         e veja os nomes entry.xxxxx; ou use a extensão "Formfacade" / guias online "Google Form entry id".
//    4) Cole a URL em GOOGLE_FORM_POST_URL e cada entry em GOOGLE_FORM_ENTRIES.
//    Anexos: o Google não recebe ficheiros deste POST simples; o site acrescenta uma notação na
//    mensagem quando há arquivos para a equipa pedir pelo WhatsApp.
//
// B) FORMSPREE (alternativa) — FORMSPREE_FORM_ID = 'abc'; anexos dependem do plano.
// ============================================================
const GOOGLE_FORM_POST_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSfGkJUe2t73RPvFoAo65LpIux2oJSb01BErYTvr9PsX2CrEBA/formResponse';
/** IDs entry.xxxxx de cada pergunta do Google Form (strings vazias = não envia esse campo).
 *  Obrigatório preencher pelo menos nome, email e telefone para o envio ao Google funcionar.
 *  Com o formulário em “quem tem o link pode responder”, use “Obter link pré-preenchido” ou F12 → Rede → formResponse. */
const GOOGLE_FORM_ENTRIES = {
    nome: 'entry.1773176765',
    email: 'entry.1493237079',
    telefone: 'entry.920680774',
    cpf: '',
    origem: '',
    empreendimento: '',
    empreendimento_texto: '',
    mensagem: '',
    aceito_contato: 'entry.911115408'
};

/** Texto idêntico à opção escolhida no Google Forms (múltipla escolha Sim/Não ou semelhante). Se a resposta não aparecer na coluna, copie o texto exato da opção no formulário. */
const GOOGLE_FORM_ACEITO_CONTATO_OPCAO = 'Sim';

/** Opcional: se as respostas não aparecerem, no viewform → F12 → inspecionar o <form> e copie o value de input[name="fbzx"]. */
const GOOGLE_FORM_FBZX = '';

const FORMSPREE_FORM_ID = '';

// ============================================================
// FOTOS DOS EMPREENDIMENTOS
// Coloque em: assets/empreendimentos/
// Nomeie pelo ID: 1.jpg, 2.jpg... (troque EXTENSAO se usar .png)
// Ex: 1.jpg = Barra Funda 900 | 3.jpg = Mérito Lapa
// Sem foto? Usa placeholder automático (onerror)
// ============================================================
const PASTA_FOTOS = 'assets/empreendimentos/';
const EXTENSAO_FOTO = '.jpg';
const FOTO_PLACEHOLDER = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop';

const empreendimentos = [
    // Zona Oeste - 19 empreendimentos
    { id: 1, nome: 'Barra Funda 900', regiao: 'oeste', local: 'Barra Funda', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço | lazer completo', amenities: ['Sala de Massagem', 'Playground', 'Pet Place', 'Piscina Adulto'] },
    { id: 2, nome: 'Barra Funda 930', regiao: 'oeste', local: 'Barra Funda', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de vaga | terraço | lazer completo', amenities: ['Piscinas', 'Espaço Games', 'Redário', 'Espaço Beleza'] },
    { id: 3, nome: 'Mérito Lapa', regiao: 'oeste', local: 'Lapa', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço | 32 a 38m²', amenities: ['Beach Tennis', 'Sauna', 'Piscina', 'Salão de Festas'] },
    { id: 4, nome: 'Mérito Barra Funda', regiao: 'oeste', local: 'Barra Funda', dormitorios: [1, 2], status: 'lancamento', desc: 'Studio, 1 e 2 dorms. com opção de terraço | Rooftop', amenities: ['Churrasqueira', 'Salão de Festas', 'Easy Market', 'Fitness'] },
    { id: 5, nome: 'Atmosfera Jaguaré', regiao: 'oeste', local: 'Jaguaré', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com opção de terraço | lazer completo', amenities: ['Piscinas', 'Playground', 'Redário', 'Sport Bar'] },
    { id: 6, nome: 'Dez Butantã', regiao: 'oeste', local: 'Butantã', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço e lazer completo', amenities: ['Redário', 'Espaço Beleza', 'Churrasqueiras', 'Fitness'] },
    { id: 7, nome: 'Singular Butantã', regiao: 'oeste', local: 'Butantã', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de varanda e vaga | lazer completo', amenities: ['Piscina', 'Playground', 'Fitness', 'Salão de Festas'] },
    { id: 8, nome: 'Cidade Lapa · Água Branca', regiao: 'oeste', local: 'Lapa', dormitorios: 2, status: 'obras', desc: '2 dorms. com suíte | terraço | vaga | lazer no rooftop', amenities: ['Rooftop', 'Espaço Zen', 'Solário', 'Churrasqueira'] },
    { id: 9, nome: 'Cidade Lapa · Pompéia', regiao: 'oeste', local: 'Lapa', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com suíte · terraço e vaga | rooftop', amenities: ['Rooftop', 'Piscina', 'Quadra', 'Pet Care'] },
    { id: 10, nome: 'Cidade Lapa · Santa Marina', regiao: 'oeste', local: 'Lapa', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com suíte, terraço e vaga | lazer diferenciado', amenities: ['Rooftop', 'Piscina', 'Sauna', 'Quadra'] },
    { id: 11, nome: 'Astro Santa Marina', regiao: 'oeste', local: 'Água Branca', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com terraço e lazer completo', amenities: ['Campinho', 'Piscinas', 'Praça', 'Salão de Festas'] },
    { id: 12, nome: 'Arte Santa Marina', regiao: 'oeste', local: 'Água Branca', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com suíte e terraço | rooftop', amenities: ['Rooftop', 'Piscina', 'Sauna', 'Pet Care'] },
    { id: 13, nome: 'Galleria Santa Marina', regiao: 'oeste', local: 'Água Branca', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com suíte | terraço | lazer completo com rooftop', amenities: ['Redário', 'Piscina', 'Solário', 'Espaço Gourmet'] },
    { id: 14, nome: 'Supreme Vila Romana', regiao: 'oeste', local: 'Vila Romana', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. de 25 a 52m² | Sky Bar | Rooftop', amenities: ['Sky Bar', 'Beach Tennis', 'Rooftop', 'Piscina'] },
    { id: 15, nome: 'Cidade Villa-Lobos · Melodia', regiao: 'oeste', local: 'Jaguaré', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com terraço | lazer completo', amenities: ['Piscina', 'Playground', 'Fitness', 'Salão de Festas'] },
    { id: 16, nome: 'Cidade Villa-Lobos · Maestro', regiao: 'oeste', local: 'Jaguaré', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com terraço | lazer completo', amenities: ['Piscina', 'Playground', 'Pet Place', 'Piscina Infantil'] },
    { id: 17, nome: 'Cidade Villa-Lobos · Soprano', regiao: 'oeste', local: 'Jaguaré', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com terraço | lazer completo', amenities: ['Piscina', 'Fitness', 'Playground', 'Churrasqueira'] },
    { id: 18, nome: 'Cidade Villa-Lobos · Sonata', regiao: 'oeste', local: 'Jaguaré', dormitorios: 2, status: 'lancamento', desc: '2 dorms. | lazer diferenciado', amenities: ['Área Verde', 'Fitness', 'Quadra', 'Pet Care'] },
    { id: 19, nome: 'Mirae Bom Retiro', regiao: 'oeste', local: 'Bom Retiro', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de varanda | lazer completo', amenities: ['Piscina', 'Rooftop', 'Fitness', 'Playground'] },
    // Zona Norte - 4 empreendimentos
    { id: 20, nome: 'Marco Freguesia', regiao: 'norte', local: 'Freguesia do Ó', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço | lazer completo', amenities: ['Sala de descanso', 'Sport Bar', 'Sauna', 'Piscina infantil'] },
    { id: 21, nome: '360° Park View', regiao: 'norte', local: 'City América', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com suíte | terraço | lazer completo', amenities: ['Piscinas', 'Solário', 'Piquenique', 'Sport Bar'] },
    { id: 22, nome: 'Alto São Domingos', regiao: 'norte', local: 'São Domingos', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço | lazer completo', amenities: ['Piscina', 'Fitness', 'Churrasqueira', 'Playground'] },
    { id: 23, nome: 'Dez Limão', regiao: 'norte', local: 'Limão', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço | lazer completo', amenities: ['Piscina', 'Fitness', 'Redário', 'Salão de Festas'] },
    // Zona Sul - 5 empreendimentos
    { id: 24, nome: 'Cidade Parque Guarapiranga', regiao: 'sul', local: 'Socorro', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com vaga | terraço | lazer completo', amenities: ['Sky Bar', 'Sauna', 'Praça Zen', 'Piscina Adulto'] },
    { id: 25, nome: 'Parque das Nações · Laguna', regiao: 'sul', local: 'Zona Sul', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com suíte, terraço e vaga | rooftop', amenities: ['Rooftop', 'Piscina', 'Praça Zen', 'Pet Care'] },
    { id: 26, nome: 'Alto Chácara Santo Antônio', regiao: 'sul', local: 'Chácara Santo Antônio', dormitorios: 2, status: 'obras', desc: '2 dorms. com varanda | suíte | vaga | rooftop', amenities: ['Pet Place', 'Piscinas', 'Horta', 'Lavanderia'] },
    { id: 27, nome: 'Lyne Campo Limpo', regiao: 'sul', local: 'Campo Limpo', dormitorios: [2, 3], status: 'lancamento', desc: '2 e 3 dorms. com terraço e garagem | Rooftop', amenities: ['Piscinas', 'Rooftop', 'Beauty Care', 'Salão de Jogos'] },
    { id: 28, nome: 'Praça Santo Antônio', regiao: 'sul', local: 'Santo Antônio', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de varanda | lazer completo', amenities: ['Piscina', 'Playground', 'Fitness', 'Salão de Festas'] },
    // Zona Leste - 9 empreendimentos
    { id: 29, nome: 'Novo Mundo Carrão', regiao: 'leste', local: 'Carrão', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço | lazer completo', amenities: ['Piscina', 'Fitness', 'Playground', 'Salão de Festas'] },
    { id: 30, nome: 'Modern Mooca', regiao: 'leste', local: 'Mooca', dormitorios: [2, 3], status: 'lancamento', desc: '2 e 3 dorms. com suíte | varanda | lazer completo', amenities: ['Rooftop', 'Fitness', 'Piscinas', 'Espaço Beleza'] },
    { id: 31, nome: 'Dez Belenzinho', regiao: 'leste', local: 'Belém', dormitorios: [1, 2], status: 'obras', desc: 'Studio e 2 dorms. com suíte e terraço', amenities: ['Piscinas', 'Mini Quadra', 'Fitness Externo', 'Bicicletário'] },
    { id: 32, nome: 'Mérito Belenzinho', regiao: 'leste', local: 'Belenzinho', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com suíte e terraço | lazer completo', amenities: ['Piscina', 'Churrasqueira', 'Fitness', 'Pet Place'] },
    { id: 33, nome: 'Cidade Mooca · Navona', regiao: 'leste', local: 'Mooca', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço e lazer completo', amenities: ['Piscinas', 'Beach Tennis', 'Salão de Festas', 'Coworking'] },
    { id: 36, nome: 'Mood Design Regente Feijó · Holos', regiao: 'leste', local: 'Regente Feijó · Av. Sapopemba', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com varanda | 25,60m² a 65m² | MCMV · 2 torres | próx. estação Santa Clara (Linha 2 Verde)', amenities: ['Piscinas', 'Academia', 'Pet Place', 'Minimercado'] },
    { id: 37, nome: 'Mood Vila Matilde · Holos', regiao: 'leste', local: 'Vila Matilde · Rua Dr. Heládio', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com varanda | 28,98m² a 74,68m² | MCMV · sucesso de vendas | a 5 min da estação Vila Matilde (Linha 3)', amenities: ['Piscinas', 'Academia', 'Pet Place', 'Coworking'] },
    { id: 38, nome: 'Zoom Parque Ecológico · Holos', regiao: 'leste', local: 'Vila Silvia · Lauro de Freitas x São José Ribamar', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com varanda | 35,51m² a 86,83m² | MCMV · breve lançamento | a 1 min da Av. Dr. Assis Ribeiro | próx. Parque Ecológico do Tietê', amenities: ['Piscinas', 'Academia', 'Pet Place', 'Mercadinho'] },
    { id: 39, nome: 'DOMO Jardim Penha', regiao: 'leste', local: 'Jardim Penha · Rua Monsenhor Meirelles, 249', dormitorios: 2, status: 'lancamento', desc: '2 dorms. · 30m² a 42,80m² | Domo Empreendimentos · rooftop, piscina e lazer completo', amenities: ['Piscina', 'Rooftop', 'Pet Place', 'Salão de Festas'], site: 'https://domoempreendimentos.com.br/empreendimentos-domo/domo-jd-penha/' },
    // Guarulhos - 2 empreendimentos
    { id: 34, nome: 'Mérito Guarulhos', regiao: 'guarulhos', local: 'Ponte Grande', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com garden | terraço | lazer completo', amenities: ['Churrasqueira', 'Piscinas', 'Beach Tênis', 'Piquenique'] },
    { id: 35, nome: 'Next Guarulhos', regiao: 'guarulhos', local: 'Guarulhos', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço | lazer completo', amenities: ['Piscina', 'Fitness', 'Playground', 'Churrasqueira'] }
];

// Zona Leste primeiro (conforme solicitado)
const REGIOES = [
    { id: 'leste', nome: 'Zona Leste', emoji: '🌄' },
    { id: 'oeste', nome: 'Zona Oeste', emoji: '🏙️' },
    { id: 'norte', nome: 'Zona Norte', emoji: '🌿' },
    { id: 'sul', nome: 'Zona Sul', emoji: '🌊' },
    { id: 'guarulhos', nome: 'Guarulhos', emoji: '🌆' }
];

function getImagemEmpreendimento(id) {
    return `${PASTA_FOTOS}${id}${EXTENSAO_FOTO}`;
}

function getZonaNome(regiaoId) {
    const reg = REGIOES.find(r => r.id === regiaoId);
    return reg ? reg.nome : '';
}

function renderizarCard(e) {
    const badgeClass = e.status === 'obras' ? 'obras' : 'lancamento';
    const badgeText = e.status === 'obras' ? 'Em Obras' : 'Lançamento';
    const zonaNome = getZonaNome(e.regiao);
    const amenitiesHtml = e.amenities.slice(0, 4).map(a => `<span>${a}</span>`).join('');
    const imgUrl = e.imagem || getImagemEmpreendimento(e.id);
    const siteBtn = e.site
        ? `<a href="${e.site}" class="card-btn card-btn--secondary" target="_blank" rel="noopener noreferrer">Ver projeto no site</a>`
        : '';
    return `
        <article class="empreendimento-card" data-regiao="${e.regiao}" data-dorms="${Array.isArray(e.dormitorios) ? Math.min(...e.dormitorios) : e.dormitorios}">
            <div class="card-image">
                <img src="${imgUrl}" alt="${e.nome}" loading="lazy" onerror="this.src='${FOTO_PLACEHOLDER}'">
                <span class="card-badge card-badge-zona">${zonaNome}</span>
            </div>
            <div class="card-body">
                <span class="card-badge ${badgeClass}">${badgeText}</span>
                <h3 class="card-title">${e.nome}</h3>
                <p class="card-location">${e.local}</p>
                <p class="card-desc">${e.desc}</p>
                <div class="card-amenities">${amenitiesHtml}</div>
                <div class="card-actions">
                ${siteBtn}
                <button type="button" class="card-btn js-open-pre-aprovacao" data-origem="card" data-empreendimento="${encodeURIComponent(e.nome)}">Tenho interesse</button>
                </div>
            </div>
        </article>
    `;
}

let regiaoSelecionada = 'leste';

// Empreendimentos em destaque (mix de todas as regiões)
const DESTAQUES_IDS = [1, 3, 5, 11, 14, 20, 24, 29, 34, 39];

function renderizarDestaques() {
    const lista = empreendimentos.filter(e => DESTAQUES_IDS.includes(e.id));
    const scrollEl = document.getElementById('destaques-scroll');
    if (scrollEl) scrollEl.innerHTML = lista.map(renderizarCard).join('');
}

function renderizarTabs() {
    const tabsContainer = document.getElementById('region-tabs');
    tabsContainer.innerHTML = REGIOES.map(reg => `
        <button class="region-tab ${reg.id === regiaoSelecionada ? 'active' : ''}" data-regiao="${reg.id}" type="button">
            <span class="region-tab-icon">${reg.emoji}</span>
            <span class="region-tab-text">${reg.nome}</span>
        </button>
    `).join('');
    tabsContainer.querySelectorAll('.region-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            regiaoSelecionada = tab.dataset.regiao;
            renderizarTabs();
            renderizarCardsRegiao();
        });
    });
}

function renderizarCardsRegiao() {
    const regiao = document.getElementById('filter-regiao').value;
    const dorms = document.getElementById('filter-dormitorios').value;
    let lista = empreendimentos.filter(e => e.regiao === regiaoSelecionada);
    if (regiao && regiao !== regiaoSelecionada) lista = [];
    if (dorms) {
        lista = lista.filter(e => {
            const d = e.dormitorios;
            if (Array.isArray(d)) return d.includes(parseInt(dorms));
            return d === parseInt(dorms);
        });
    }
    const scrollEl = document.getElementById('empreendimentos-scroll');
    scrollEl.innerHTML = lista.map(renderizarCard).join('');
}

function renderizarEmpreendimentos() {
    renderizarDestaques();
    renderizarTabs();
    renderizarCardsRegiao();
}

function filtrarImoveis() {
    const regiao = document.getElementById('filter-regiao').value;
    const dorms = document.getElementById('filter-dormitorios').value;
    if (regiao) regiaoSelecionada = regiao;
    renderizarTabs();
    renderizarCardsRegiao();
}

// Buscar - filtra e atualiza
document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.querySelector('.filters .btn-primary');
    if (btnBuscar) btnBuscar.onclick = filtrarImoveis;
});

// Simulador — fluxo em etapas
function parseBRLDigits(str) {
    const n = parseInt(String(str || '').replace(/\D/g, ''), 10);
    return Number.isFinite(n) ? n : 0;
}

function formatBRLValor(n) {
    if (n == null || !Number.isFinite(Number(n))) return '—';
    const v = Number(n);
    return `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Maior linha da tabela Caixa com renda <= renda informada (referência por faixa). */
function findLinhaCaixaPorRenda(rendaMensal) {
    const t = typeof TABELA_CAIXA_MCMV !== 'undefined' ? TABELA_CAIXA_MCMV : [];
    if (!t || !t.length) return null;
    const sorted = [...t].sort((a, b) => a.renda - b.renda);
    let pick = sorted[0];
    for (const r of sorted) {
        if (r.renda <= rendaMensal) pick = r;
    }
    return pick;
}

function initSimuladorWizard() {
    const form = document.getElementById('form-simulador');
    if (!form) return;

    let step = 1;
    const panels = [1, 2, 3, 4].map((n) => document.getElementById(`sim-panel-${n}`));
    if (panels.some((p) => !p)) return;

    const stepItems = form.querySelectorAll('.sim-step-item');
    const btnCont = document.getElementById('btn-sim-continuar');
    const btnVolta = document.getElementById('btn-sim-voltar');
    const simNav = document.getElementById('sim-nav');
    const fgtsValor = document.getElementById('fgts-valor');
    const fgtsGroup = document.getElementById('fgts-valor-group');

    function updateFgtsField() {
        const tem = form.querySelector('input[name="fgts_possui"]:checked')?.value === 'sim';
        fgtsGroup.classList.toggle('is-disabled', !tem);
        if (!tem) fgtsValor.value = '';
        fgtsValor.required = tem;
    }
    form.querySelectorAll('input[name="fgts_possui"]').forEach((r) => r.addEventListener('change', updateFgtsField));
    updateFgtsField();

    function setStep(n) {
        step = n;
        panels.forEach((p, i) => {
            const on = i + 1 === n;
            p.hidden = !on;
            p.classList.toggle('is-active', on);
        });
        stepItems.forEach((el) => {
            const s = parseInt(el.getAttribute('data-step'), 10);
            el.classList.remove('active', 'done');
            if (s === n) el.classList.add('active');
            else if (s < n) el.classList.add('done');
        });
        const emValidacao = n === 3;
        const noResultado = n === 4;
        simNav.classList.toggle('sim-nav-hidden', emValidacao || noResultado);
        btnVolta.hidden = n <= 1 || emValidacao || noResultado;
        btnCont.hidden = emValidacao || noResultado;
    }

    function validateStep1() {
        const renda = parseBRLDigits(document.getElementById('renda').value);
        if (renda < 100) {
            alert('Informe a renda familiar total.');
            return false;
        }
        if (!document.getElementById('nascimento').value) {
            alert('Informe sua data de nascimento.');
            return false;
        }
        const temFgts = form.querySelector('input[name="fgts_possui"]:checked')?.value === 'sim';
        if (temFgts && parseBRLDigits(fgtsValor.value) < 1) {
            alert('Informe o valor do FGTS ou marque "Não".');
            return false;
        }
        return true;
    }

    function runCalculation() {
        const renda = parseBRLDigits(document.getElementById('renda').value);
        const comDep = form.querySelector('input[name="dependentes_subsidio"]:checked')?.value === 'sim';
        const row = findLinhaCaixaPorRenda(renda);
        const refEl = document.getElementById('result-tabela-ref');

        if (!row) {
            document.getElementById('result-financiamento').textContent = '—';
            document.getElementById('result-subsidio').textContent = '—';
            document.getElementById('result-parcela').textContent = '—';
            document.getElementById('result-juros').textContent = '—';
            if (refEl) refEl.textContent = 'Tabela Caixa não carregada. Verifique se o arquivo caixa-mcmv-tabela.js está no site.';
            return;
        }

        const finTxt = formatBRLValor(row.finCom);
        document.getElementById('result-financiamento').textContent = finTxt;

        const subVal = comDep ? row.subCom : row.subSem;
        if (subVal != null && subVal >= 0 && Number.isFinite(subVal)) {
            document.getElementById('result-subsidio').textContent = formatBRLValor(subVal);
        } else {
            document.getElementById('result-subsidio').textContent = '—';
        }

        document.getElementById('result-parcela').textContent = `${formatBRLValor(row.parcelaCom)}/mês`;
        document.getElementById('result-juros').textContent = `${row.taxaCom.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% a.a.`;

        if (refEl) {
            refEl.textContent = `Referência na tabela Caixa: linha até R$ ${row.renda.toLocaleString('pt-BR')}/mês de renda (PRICE com redutor). Sua renda informada: R$ ${renda.toLocaleString('pt-BR')}.`;
        }
    }

    btnCont.addEventListener('click', () => {
        if (step === 1) {
            if (!validateStep1()) return;
            setStep(2);
        } else if (step === 2) {
            setStep(3);
            setTimeout(() => {
                runCalculation();
                setStep(4);
            }, 1100);
        }
    });

    btnVolta.addEventListener('click', () => {
        if (step === 2) setStep(1);
    });

    form.addEventListener('submit', (e) => e.preventDefault());

    const btnModal = document.getElementById('btn-sim-abrir-modal');
    if (btnModal) {
        btnModal.addEventListener('click', () => {
            abrirModalPreAprovacao({ origem: 'simulador' });
        });
    }

    window.resetSimuladorWizard = function () {
        setStep(1);
        document.getElementById('renda').value = '';
        document.getElementById('nascimento').value = '';
        form.querySelector('input[name="fgts_possui"][value="sim"]').checked = true;
        const depNao = form.querySelector('input[name="dependentes_subsidio"][value="nao"]');
        if (depNao) depNao.checked = true;
        fgtsValor.value = '';
        document.getElementById('sim-regiao').value = '';
        document.getElementById('empreendimento').value = '';
        updateFgtsField();
    };
}

initSimuladorWizard();

function abrirModalPreAprovacao(opts) {
    const o = opts || {};
    const modal = document.getElementById('modal-pre-aprovacao');
    if (!modal) return;
    const origemEl = document.getElementById('pre-aprov-origem');
    const embHidden = document.getElementById('pre-aprov-empreendimento');
    const embTexto = document.getElementById('pre-aprov-empreendimento-texto');
    if (origemEl) origemEl.value = o.origem || '';
    if (embHidden) embHidden.value = o.empreendimento || '';
    if (embTexto) {
        embTexto.value = o.empreendimento || '';
        embTexto.readOnly = !!o.empreendimento;
    }
    modal.classList.add('active');
    limparMsgFormPreAprovacao();
    const first = document.getElementById('pre-aprov-nome');
    if (first) setTimeout(() => first.focus(), 100);
}

function limparMsgFormPreAprovacao() {
    const el = document.getElementById('form-pre-aprovacao-erro');
    if (!el) return;
    el.textContent = '';
    el.hidden = true;
    el.className = 'form-pre-aprovacao-msg';
}

function mostrarMsgFormPreAprovacao(texto, tipo) {
    const el = document.getElementById('form-pre-aprovacao-erro');
    if (!el) return;
    el.textContent = texto;
    el.hidden = false;
    el.className = `form-pre-aprovacao-msg form-pre-aprovacao-msg--${tipo === 'info' ? 'info' : 'erro'}`;
    el.focus();
}

function digitosTelefoneBR(val) {
    return String(val || '').replace(/\D/g, '');
}

function telefoneBrValido(val) {
    const d = digitosTelefoneBR(val);
    return d.length >= 10 && d.length <= 11;
}

function cpfDigitos(val) {
    return String(val || '').replace(/\D/g, '');
}

function tamanhoTotalAnexos(form) {
    let t = 0;
    form.querySelectorAll('input[type="file"]').forEach((inp) => {
        for (let i = 0; i < inp.files.length; i++) t += inp.files[i].size;
    });
    return t;
}

function contarArquivosForm(form) {
    let n = 0;
    form.querySelectorAll('input[type="file"]').forEach((inp) => {
        n += inp.files.length;
    });
    return n;
}

function montarMensagemComNotaAnexos(base, form) {
    const n = contarArquivosForm(form);
    if (n === 0) return base || '';
    const nota =
        '\n\n[IMOVEIS CS — site] O cliente anexou ' +
        n +
        ' arquivo(s) aqui. Envio via Google Forms não inclui anexos; solicitar documentos pelo WhatsApp da IMOVEIS CS.';
    return (base || '') + nota;
}

function googleFormConfigOk() {
    const u = String(GOOGLE_FORM_POST_URL || '').trim();
    if (!u || !u.includes('docs.google.com/forms') || !u.includes('/formResponse')) return false;
    const E = GOOGLE_FORM_ENTRIES;
    return !!(E.nome && E.email && E.telefone);
}

function enviarParaGoogleForm(formEl) {
    const E = GOOGLE_FORM_ENTRIES;
    const action = String(GOOGLE_FORM_POST_URL || '').trim();
    const nome = formEl.querySelector('#pre-aprov-nome')?.value?.trim() ?? '';
    const email = formEl.querySelector('#pre-aprov-email')?.value?.trim() ?? '';
    const telRaw = formEl.querySelector('#pre-aprov-telefone')?.value?.trim() ?? '';
    const tel = digitosTelefoneBR(telRaw) || telRaw;
    const cpf = cpfDigitos(formEl.querySelector('#pre-aprov-cpf')?.value || '');
    const origem = formEl.querySelector('#pre-aprov-origem')?.value ?? '';
    const emb = formEl.querySelector('#pre-aprov-empreendimento')?.value ?? '';
    const embTexto = formEl.querySelector('#pre-aprov-empreendimento-texto')?.value?.trim() ?? '';
    let mensagem = formEl.querySelector('#pre-aprov-mensagem')?.value?.trim() ?? '';
    mensagem = montarMensagemComNotaAnexos(mensagem, formEl);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = action;
    // Nova aba: o Google mostra confirmação ou erro (perguntas em falta / fbzx). Iframe oculto falha em muitos casos.
    form.target = '_blank';
    form.acceptCharset = 'UTF-8';
    form.style.display = 'none';

    function addField(name, value) {
        if (!name) return;
        const inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = name;
        inp.value = value == null ? '' : String(value);
        form.appendChild(inp);
    }

    if (E.nome) addField(E.nome, nome);
    if (E.email) addField(E.email, email);
    if (E.telefone) addField(E.telefone, tel);
    if (E.cpf && cpf.length === 11) addField(E.cpf, cpf);
    if (E.origem) addField(E.origem, origem);
    if (E.empreendimento) addField(E.empreendimento, emb);
    if (E.empreendimento_texto) addField(E.empreendimento_texto, embTexto);
    if (E.mensagem) addField(E.mensagem, mensagem);
    if (E.aceito_contato) {
        const aceitoChk = formEl.querySelector('input[name="aceito_contato"]');
        if (aceitoChk && aceitoChk.checked) {
            addField(E.aceito_contato, String(GOOGLE_FORM_ACEITO_CONTATO_OPCAO || 'Sim').trim());
        }
    }

    if (String(GOOGLE_FORM_FBZX || '').trim()) {
        addField('fbzx', String(GOOGLE_FORM_FBZX).trim());
    }

    document.body.appendChild(form);
    form.submit();
    setTimeout(() => {
        try {
            form.remove();
        } catch (e) {}
    }, 2000);

    return Promise.resolve();
}

function fecharModalPreAprovacao() {
    const modal = document.getElementById('modal-pre-aprovacao');
    if (modal) modal.classList.remove('active');
    const f = document.getElementById('form-pre-aprovacao');
    if (f) f.reset();
    limparMsgFormPreAprovacao();
    const embTexto = document.getElementById('pre-aprov-empreendimento-texto');
    if (embTexto) embTexto.readOnly = false;
    const h = document.getElementById('pre-aprov-empreendimento');
    if (h) h.value = '';
    const o = document.getElementById('pre-aprov-origem');
    if (o) o.value = '';
    const btn = document.getElementById('btn-pre-aprov-enviar');
    if (btn && btn.dataset.labelDefault) btn.textContent = btn.dataset.labelDefault;
}

document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-open-pre-aprovacao');
    if (!trigger) return;
    e.preventDefault();
    let emb = '';
    try {
        emb = trigger.dataset.empreendimento ? decodeURIComponent(trigger.dataset.empreendimento) : '';
    } catch (err) {
        emb = trigger.dataset.empreendimento || '';
    }
    abrirModalPreAprovacao({
        origem: trigger.dataset.origem || 'site',
        empreendimento: emb
    });
});

const formPreAprov = document.getElementById('form-pre-aprovacao');
const btnPreAprov = document.getElementById('btn-pre-aprov-enviar');
if (btnPreAprov && !btnPreAprov.dataset.labelDefault) {
    btnPreAprov.dataset.labelDefault = btnPreAprov.textContent.trim();
}

if (formPreAprov) {
    formPreAprov.addEventListener('input', () => {
        const el = document.getElementById('form-pre-aprovacao-erro');
        if (el && !el.hidden && el.classList.contains('form-pre-aprovacao-msg--erro')) limparMsgFormPreAprovacao();
    });

    formPreAprov.addEventListener('submit', async (e) => {
        e.preventDefault();
        limparMsgFormPreAprovacao();
        const hp = formPreAprov.querySelector('input[name="_gotcha"]');
        if (hp && hp.value) return;

        const useGoogle = googleFormConfigOk();
        const useFormspree = !!(FORMSPREE_FORM_ID && String(FORMSPREE_FORM_ID).trim());
        const urlGoogle = String(GOOGLE_FORM_POST_URL || '').trim();

        if (urlGoogle && !googleFormConfigOk()) {
            mostrarMsgFormPreAprovacao(
                'Google Forms: em script.js, defina GOOGLE_FORM_POST_URL (URL …/formResponse) e os IDs em GOOGLE_FORM_ENTRIES (mínimo: nome, email, telefone).',
                'info'
            );
            return;
        }

        if (!useGoogle && !useFormspree) {
            mostrarMsgFormPreAprovacao(
                'Configure o envio em script.js: GOOGLE_FORM_POST_URL + GOOGLE_FORM_ENTRIES (Google Forms) ou FORMSPREE_FORM_ID (Formspree).',
                'info'
            );
            return;
        }

        if (!formPreAprov.checkValidity()) {
            formPreAprov.reportValidity();
            return;
        }

        const tel = document.getElementById('pre-aprov-telefone');
        if (tel && !telefoneBrValido(tel.value)) {
            mostrarMsgFormPreAprovacao('Informe um WhatsApp válido com DDD (10 ou 11 dígitos).', 'erro');
            tel.focus();
            return;
        }

        const cpfEl = document.getElementById('pre-aprov-cpf');
        if (cpfEl) {
            const cd = cpfDigitos(cpfEl.value);
            if (cd.length > 0 && cd.length !== 11) {
                mostrarMsgFormPreAprovacao('CPF: informe 11 dígitos ou deixe em branco.', 'erro');
                cpfEl.focus();
                return;
            }
        }

        const maxBytes = 20 * 1024 * 1024;
        const totalAnexos = tamanhoTotalAnexos(formPreAprov);
        if (totalAnexos > maxBytes) {
            mostrarMsgFormPreAprovacao(
                'O total dos anexos passa de 20 MB. Remova ou comprima os arquivos e tente de novo.',
                'erro'
            );
            return;
        }

        const btn = document.getElementById('btn-pre-aprov-enviar');
        const labelEnvio = (btn && btn.dataset.labelEnvio) || 'Enviando…';
        const labelOk = (btn && btn.dataset.labelDefault) || 'Enviar para pré-análise';
        if (btn) {
            btn.disabled = true;
            btn.textContent = labelEnvio;
        }

        try {
            if (useGoogle) {
                await enviarParaGoogleForm(formPreAprov);
                fecharModalPreAprovacao();
                document.getElementById('modal-sucesso').classList.add('active');
            } else {
                const fd = new FormData(formPreAprov);
                const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID.trim()}`, {
                    method: 'POST',
                    body: fd,
                    headers: { Accept: 'application/json' }
                });
                const data = await res.json().catch(() => ({}));
                if (res.ok) {
                    fecharModalPreAprovacao();
                    document.getElementById('modal-sucesso').classList.add('active');
                } else {
                    let msg = 'Não foi possível enviar. Verifique os campos ou tente mais tarde.';
                    if (data && data.error) {
                        msg = typeof data.error === 'string' ? data.error : msg;
                    }
                    if (data && data.errors && typeof data.errors === 'object') {
                        const partes = [];
                        Object.keys(data.errors).forEach((k) => {
                            const v = data.errors[k];
                            if (Array.isArray(v)) partes.push(...v.map(String));
                            else if (v) partes.push(String(v));
                        });
                        if (partes.length) msg = partes.join(' ');
                    }
                    mostrarMsgFormPreAprovacao(msg, 'erro');
                }
            }
        } catch (err) {
            mostrarMsgFormPreAprovacao('Erro de rede. Verifique a ligação à internet e tente de novo.', 'erro');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = labelOk;
            }
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const modal = document.getElementById('modal-pre-aprovacao');
    if (modal && modal.classList.contains('active')) fecharModalPreAprovacao();
});

function fecharModalSucesso() {
    document.getElementById('modal-sucesso').classList.remove('active');
    if (typeof window.resetSimuladorWizard === 'function') window.resetSimuladorWizard();
}

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (modal.id === 'modal-pre-aprovacao') fecharModalPreAprovacao();
            else modal.classList.remove('active');
        }
    });
});

// Inicialização
renderizarEmpreendimentos();
