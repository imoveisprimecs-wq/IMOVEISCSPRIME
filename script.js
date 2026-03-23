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
    // Zona Leste - 5 empreendimentos
    { id: 29, nome: 'Novo Mundo Carrão', regiao: 'leste', local: 'Carrão', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço | lazer completo', amenities: ['Piscina', 'Fitness', 'Playground', 'Salão de Festas'] },
    { id: 30, nome: 'Modern Mooca', regiao: 'leste', local: 'Mooca', dormitorios: [2, 3], status: 'lancamento', desc: '2 e 3 dorms. com suíte | varanda | lazer completo', amenities: ['Rooftop', 'Fitness', 'Piscinas', 'Espaço Beleza'] },
    { id: 31, nome: 'Dez Belenzinho', regiao: 'leste', local: 'Belém', dormitorios: [1, 2], status: 'obras', desc: 'Studio e 2 dorms. com suíte e terraço', amenities: ['Piscinas', 'Mini Quadra', 'Fitness Externo', 'Bicicletário'] },
    { id: 32, nome: 'Mérito Belenzinho', regiao: 'leste', local: 'Belenzinho', dormitorios: [1, 2], status: 'lancamento', desc: '1 e 2 dorms. com suíte e terraço | lazer completo', amenities: ['Piscina', 'Churrasqueira', 'Fitness', 'Pet Place'] },
    { id: 33, nome: 'Cidade Mooca · Navona', regiao: 'leste', local: 'Mooca', dormitorios: 2, status: 'lancamento', desc: '2 dorms. com opção de terraço e lazer completo', amenities: ['Piscinas', 'Beach Tennis', 'Salão de Festas', 'Coworking'] },
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
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent('Tenho interesse no empreendimento ' + e.nome)}`;
    const imgUrl = e.imagem || getImagemEmpreendimento(e.id);
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
                <a href="${whatsappUrl}" class="card-btn" target="_blank" rel="noopener">Tenho interesse</a>
            </div>
        </article>
    `;
}

let regiaoSelecionada = 'leste';

// Empreendimentos em destaque (mix de todas as regiões)
const DESTAQUES_IDS = [1, 3, 5, 11, 14, 20, 24, 29, 34];

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

// Simulador
document.getElementById('form-simulador').addEventListener('submit', (e) => {
    e.preventDefault();
    const renda = parseInt(document.getElementById('renda').value);
    const fgts = parseInt(document.getElementById('fgts').value);
    const financiamento = Math.min(renda * 30, 250000) + fgts;
    const subsidio = Math.floor(financiamento * 0.15);
    const parcela = Math.floor((financiamento - subsidio) / 360);
    
    document.getElementById('result-financiamento').textContent = `R$ ${financiamento.toLocaleString('pt-BR')}`;
    document.getElementById('result-subsidio').textContent = `R$ ${subsidio.toLocaleString('pt-BR')}`;
    document.getElementById('result-parcela').textContent = `R$ ${parcela.toLocaleString('pt-BR')}/mês`;
    document.getElementById('result-juros').textContent = '8,16% a.a.';
    
    document.getElementById('modal-simulacao').classList.add('active');
});

// Form contato (modal)
document.getElementById('form-contato').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('modal-simulacao').classList.remove('active');
    document.getElementById('modal-sucesso').classList.add('active');
});

function fecharModal() {
    document.getElementById('modal-simulacao').classList.remove('active');
}

function fecharModalSucesso() {
    document.getElementById('modal-sucesso').classList.remove('active');
}

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
});

// Renda slider
const rendaInput = document.getElementById('renda');
const rendaValor = document.getElementById('renda-valor');
if (rendaInput && rendaValor) {
    rendaInput.addEventListener('input', () => {
        rendaValor.textContent = parseInt(rendaInput.value).toLocaleString('pt-BR');
    });
}

// Inicialização
renderizarEmpreendimentos();
