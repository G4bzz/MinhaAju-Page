
//--------------------ICONES DOS MARCADORES------------------------
const alimentosIcon = L.AwesomeMarkers.icon({
    icon: 'utensils',
    markerColor: 'darkgreen',
    prefix: 'fa',
});

const arteIcon = L.AwesomeMarkers.icon({
    icon: 'paint-brush',
    markerColor: 'purple',
    prefix: 'fa',
});

const comAlimenIcon = L.AwesomeMarkers.icon({
    icon: 'store',
    markerColor: 'blue',
    prefix: 'fa',
});

const servicosIcon = L.AwesomeMarkers.icon({
    icon: 'handshake',
    markerColor: 'purple',
    prefix: 'fa',
});

const diyIcon = L.AwesomeMarkers.icon({
    icon: 'tools',
    markerColor: 'gray',
    prefix: 'fa',
});

const eletroIcon = L.AwesomeMarkers.icon({
    icon: 'mobile-alt',
    markerColor: 'cadetblue',
    prefix: 'fa',
});

const entretIcon = L.AwesomeMarkers.icon({
    icon: 'user-friends',
    markerColor: 'gray',
    prefix: 'fa',
});

const estacIcon = L.AwesomeMarkers.icon({
    icon: 'car-side',
    markerColor: 'darkpurple',
    prefix: 'fa',
});

const estetIcon = L.AwesomeMarkers.icon({
    icon: 'air-freshener',
    markerColor: 'red',
    prefix: 'fa',
});

const mobIcon = L.AwesomeMarkers.icon({
    icon: 'chair',
    markerColor: 'darkpurple',
    prefix: 'fa',
});

const outIcon = L.AwesomeMarkers.icon({
    icon: 'tree',
    markerColor: 'darkgreen',
    prefix: 'fa',
});

const papelIocn = L.AwesomeMarkers.icon({
    icon: 'scroll',
    markerColor: 'black',
    prefix: 'fa',
});

const saudeIcon = L.AwesomeMarkers.icon({
    icon: 'first-aid',
    markerColor: 'red',
    prefix: 'fa',
});

const financeiroIcon = L.AwesomeMarkers.icon({
    icon: 'money-bill-wave',
    markerColor: 'green',
    prefix: 'fa',
});

const escola = L.AwesomeMarkers.icon({
    icon: 'book-open',
    markerColor: 'orange',
    prefix: 'fa'
});

const religiao = L.AwesomeMarkers.icon({
    icon: 'church',
    markerColor: 'blue',
    prefix: 'fa'
});

const vestIcon = L.AwesomeMarkers.icon({
    icon: 'tshirt',
    markerColor: 'darkblue',
    prefix: 'fa'
});

const transpIcon = L.AwesomeMarkers.icon({
    icon: 'bus',
    markerColor: 'orange',
    prefix: 'fa'
});

const postosIcon = L.AwesomeMarkers.icon({
    icon: 'gas-pump',
    markerColor: 'red',
    prefix: 'fa'
});

//------------------------------------------------------------

//-------------------- LAYER GROUPS ------------------------
marks_Alimentacao = L.layerGroup()
marks_Arte = L.layerGroup()
marks_ComAlimen = L.layerGroup()
marks_Departamento = L.layerGroup()
marks_DIY = L.layerGroup()
marks_Educacao = L.layerGroup()
marks_Eletronicos = L.layerGroup()
marks_Entreternimento = L.layerGroup()
marks_Estacionamentos = L.layerGroup()
marks_Financeiro = L.layerGroup()
marks_Mobiliario = L.layerGroup()
marks_Outdoors = L.layerGroup()
marks_Outros = L.layerGroup()
marks_Papelaria = L.layerGroup()
marks_Postos = L.layerGroup()
marks_Religiao = L.layerGroup()
marks_Saude = L.layerGroup()
marks_SaudeEstetica = L.layerGroup()
marks_Servicos = L.layerGroup()
marks_Transporte = L.layerGroup()
marks_Veiculos = L.layerGroup()
marks_Vestuario = L.layerGroup()
clear_map = L.layerGroup()
//------------------------------------------------------------

//-------------------- HEATMAPS ------------------------
let heats_Alimentacao = [];
let heats_Arte = [];
let heats_ComAlimen = [];
let heats_Departamento = [];
let heats_DIY = [];
let heats_Educacao = [];
let heats_Eletronicos = [];
let heats_Entreternimento = [];
let heats_Estacionamentos = [];
let heats_Financeiro = [];
let heats_Mobiliario = [];
let heats_Outdoors = [];
let heats_Outros = [];
let heats_Papelaria = [];
let heats_Postos = [];
let heats_Religiao = [];
let heats_Saude = [];
let heats_SaudeEstetica = [];
let heats_Servicos = [];
let heats_Transporte = [];
let heats_Veiculos = [];
let heats_Vestuario = [];
//------------------------------------------------------------

//------------- CRIAÇÃO DOS MARCADORES E HEATMAPS -------------------
function newCriaPontos(dataS, grupo, heats, icone){
    for (i in dataS){
         dataS[i].map(function(p) {
            L.marker([p['lat'], p['lng']],{icon: icone}).addTo(grupo).on('click', function(){addrInfo(p)});
            heats.push([p['lat'], p['lng'],12]);
        });
    }
};

newCriaPontos(DataSet_Alimentacao, marks_Alimentacao,heats_Alimentacao, alimentosIcon)
newCriaPontos(DataSet_Arte, marks_Arte, heats_Arte, arteIcon)
newCriaPontos(DataSet_ComAlimen, marks_ComAlimen, heats_ComAlimen, comAlimenIcon)
newCriaPontos(DataSet_DIY, marks_DIY, heats_DIY, diyIcon)
newCriaPontos(DataSet_Departamento, marks_Departamento, heats_Departamento, comAlimenIcon)
newCriaPontos(DataSet_Entreternimento, marks_Entreternimento, heats_Entreternimento, entretIcon)
newCriaPontos(DataSet_Estacionamentos, marks_Estacionamentos, heats_Estacionamentos, estacIcon)
newCriaPontos(DataSet_Eletronicos, marks_Eletronicos, heats_Eletronicos, eletroIcon)
newCriaPontos(DataSet_Educacao, marks_Educacao, heats_Educacao, escola)
newCriaPontos(DataSet_Financeiro, marks_Financeiro, heats_Financeiro, financeiroIcon)
newCriaPontos(DataSet_Mobiliario, marks_Mobiliario, heats_Mobiliario, mobIcon)
newCriaPontos(DataSet_Outdoors, marks_Outdoors, heats_Outdoors, outIcon)
newCriaPontos(DataSet_Outros, marks_Outros, heats_Outros, comAlimenIcon)
newCriaPontos(DataSet_Papelaria, marks_Papelaria, heats_Papelaria, papelIocn)
newCriaPontos(DataSet_Postos, marks_Postos, heats_Postos, postosIcon)
newCriaPontos(DataSet_Religiao, marks_Religiao, heats_Religiao, religiao)
newCriaPontos(DataSet_Saude, marks_Saude, heats_Saude, saudeIcon)
newCriaPontos(DataSet_SaudeEstetica, marks_SaudeEstetica, heats_SaudeEstetica, estetIcon)
newCriaPontos(DataSet_Servicos, marks_Servicos, heats_Servicos, servicosIcon)
newCriaPontos(DataSet_Transporte, marks_Transporte, heats_Transporte, transpIcon)
newCriaPontos(DataSet_Veiculos, marks_Veiculos, heats_Veiculos, estacIcon)
newCriaPontos(DataSet_Vestuario, marks_Vestuario, heats_Vestuario, vestIcon)
//------------------------------------------------------------

//-------------------- LAYERS DOS HEATMAPS ------------------------
let heatmap_Alimentacao = L.heatLayer(heats_Alimentacao, {radius: 20});
let heatmap_Arte = L.heatLayer(heats_Arte, {radius: 20});
let heatmap_ComAlimen = L.heatLayer(heats_ComAlimen, {radius: 20});
let heatmap_Departamento = L.heatLayer(heats_Departamento, {radius: 20});
let heatmap_DIY = L.heatLayer(heats_DIY, {radius: 20});
let heatmap_Educacao = L.heatLayer(heats_Educacao, {radius: 20});
let heatmap_Eletronicos = L.heatLayer(heats_Eletronicos, {radius: 20});
let heatmap_Entreternimento = L.heatLayer(heats_Entreternimento, {radius: 20});
let heatmap_Estacionamentos = L.heatLayer(heats_Estacionamentos, {radius: 20});
let heatmap_Financeiro = L.heatLayer(heats_Financeiro, {radius: 20});
let heatmap_Mobiliario = L.heatLayer(heats_Mobiliario, {radius: 20});
let heatmap_Outdoors = L.heatLayer(heats_Outdoors, {radius: 20});
let heatmap_Outros = L.heatLayer(heats_Outros, {radius: 20});
let heatmap_Papelaria = L.heatLayer(heats_Papelaria, {radius: 20});
let heatmap_Postos = L.heatLayer(heats_Postos, {radius: 20});
let heatmap_Religiao = L.heatLayer(heats_Religiao, {radius: 20});
let heatmap_Saude = L.heatLayer(heats_Saude, {radius: 20});
let heatmap_SaudeEstetica = L.heatLayer(heats_SaudeEstetica, {radius: 20});
let heatmap_Servicos = L.heatLayer(heats_Servicos, {radius: 20});
let heatmap_Transporte = L.heatLayer(heats_Transporte, {radius: 20});
let heatmap_Veiculos = L.heatLayer(heats_Veiculos, {radius: 20});
let heatmap_Vestuario = L.heatLayer(heats_Vestuario, {radius: 20});


//-------------------- LAYERS OCORRENCIAS ------------------------
let layer_menuInterativo = L.layerGroup();
let layer_heatmap = L.heatLayer();

function showOcorrencias(e){
    let layer = e.target;
    info_update(layer.feature);
}

function highlightFeature(e) {
    let layer = e.target;

    layer.setStyle({
        weight: 4,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//------------------------------------------------------------


//-------------------- CONTROL TREE ------------------------
let localizacoes = [
    {
        label: ' Limpar mapa', layer: clear_map,
    },
    {
    label: 'Pontos de interesse',
    children: [
        {
            label: ' Locais variados',
            collapsed: true,
            children: [
                { label: " Alimentação", layer: marks_Alimentacao},
                { label: " Educação", layer: marks_Educacao},
                { label: " Entreternimento", layer: marks_Entreternimento},
                { label: " Estacionamentos", layer: marks_Estacionamentos},
                { label: " Financeiro", layer: marks_Financeiro},
                { label: " Religião", layer: marks_Religiao},
                { label: " Saúde", layer: marks_Saude},
                { label: " Serviços de interesse geral", layer: marks_Servicos},
                { label: " Transporte", layer: marks_Transporte},
                { label: " Postos de Gasolina", layer: marks_Postos}
            ]
        },
        {
            label: ' Comércio',
            collapsed: true,
            children: [
                { label: " Arte", layer: marks_Arte},
                { label: " Comércio alimentício", layer: marks_ComAlimen},
                { label: " DIY (faça você mesmo)", layer: marks_DIY},
                { label: " Departamento", layer: marks_Departamento},
                { label: " Eletrônicos", layer: marks_Eletronicos},
                { label: " Mobiliário", layer: marks_Mobiliario},
                { label: " Outdoors", layer: marks_Outdoors},
                { label: " Outros", layer: marks_Outros},
                { label: " Papelaria", layer: marks_Papelaria},
                { label: " Saúde e Estética", layer: marks_SaudeEstetica},
                { label: " Veículos", layer: marks_Veiculos},
                { label: " Vestuário", layer: marks_Vestuario}
            ]
        }
    ]},
    {
    label: ' Mapas de calor',
    children: [
        {
            label: ' Locais variados',
            collapsed: true,
            children: [
                { label: " Alimentação", layer: heatmap_Alimentacao},
                { label: " Educação", layer: heatmap_Educacao},
                { label: " Entreternimento", layer: heatmap_Entreternimento},
                { label: " Estacionamentos", layer: heatmap_Estacionamentos},
                { label: " Financeiro", layer: heatmap_Financeiro},
                { label: " Religião", layer: heatmap_Religiao},
                { label: " Saúde", layer: heatmap_Saude},
                { label: " Serviços de interesse geral", layer: heatmap_Servicos},
                { label: " Transporte", layer: heatmap_Transporte},
                { label: " Postos de Gasolina", layer: heatmap_Postos}
            ]
        },
        {
            label: ' Comércio',
            collapsed: true,
            children: [
                { label: " Arte", layer: heatmap_Arte},
                { label: " Comércio alimentício", layer: heatmap_ComAlimen},
                { label: " DIY", layer: heatmap_DIY},
                { label: " Departamento", layer: heatmap_Departamento},
                { label: " Eletrônicos", layer: heatmap_Eletronicos},
                { label: " Mobiliário", layer: heatmap_Mobiliario},
                { label: " Outdoors", layer: heatmap_Outdoors},
                { label: " Outros", layer: heatmap_Outros},
                { label: " Papelaria", layer: heatmap_Papelaria},
                { label: " Saúde e Estética", layer: heatmap_SaudeEstetica},
                { label: " Veículos", layer: heatmap_Veiculos},
                { label: " Vestuário", layer: heatmap_Vestuario}
            ]
        }
    
    ]}
];
//------------------------------------------------------------
