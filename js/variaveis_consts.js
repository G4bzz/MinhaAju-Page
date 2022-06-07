
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

const papelIcon = L.AwesomeMarkers.icon({
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

const escolaIcon = L.AwesomeMarkers.icon({
    icon: 'book-open',
    markerColor: 'darkpurple',
    prefix: 'fa'
});

const religiaoIcon = L.AwesomeMarkers.icon({
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

function getIcon(categ){
    return (categ == 'Alimentação' ? alimentosIcon : (categ == 'Arte' ? arteIcon : (categ == 'Comércio alimentício' ? comAlimenIcon : (categ == 'Lojas de departamento' ? comAlimenIcon : (categ == 'Faça você mesmo' ? diyIcon : (categ == 'Educação' ? escolaIcon : (categ == 'Lojas de eletrônicos' ? eletroIcon : (categ == 'Entreternimento' ? entretIcon : (categ == 'Estacionamentos' ? estacIcon : (categ == 'Financeiro' ? financeiroIcon : (categ == 'Mobiliário' ? mobIcon : (categ == 'Outros' ? servicosIcon : (categ == 'Papelaria' ? papelIcon : (categ == 'Postos de gasolina' ? postosIcon : (categ == 'Religiosidade' ? religiaoIcon : (categ == 'Saúde' ? saudeIcon : (categ == 'Estética' ? estetIcon : (categ == 'Serviços' ? servicosIcon : (categ == 'Transporte' ? transpIcon : "")))))))))))))))))));
}

function makePointLayers(){
    let categs = Object.keys(Dataset_pontos);
    let vetor = [];
    for (const categGeral of categs) {
        let temp = []
        for(const subCateg of Object.keys(Dataset_pontos[categGeral])){
            let tempLayer = L.layerGroup();
            Dataset_pontos[categGeral][subCateg].map(function (p){
                L.marker([p['lat'], p['lng']],{icon: getIcon(categGeral)}).addTo(tempLayer).on('click', function(){addrInfo(p)});
            })
            temp.push({label: subCateg, layer: tempLayer})
        }
        vetor.push({label: categGeral, collapsed: true, children: temp});
    }
    return vetor;
}

function makeHeatLayers(){
    let categs = Object.keys(Dataset_pontos);
    let vetor = [];
    for (const categGeral of categs) {
        let temp = []
        for(const subCateg of Object.keys(Dataset_pontos[categGeral])){
            Dataset_pontos[categGeral][subCateg].map(function (p){
                temp.push([p['lat'], p['lng'],12]);
            })
        }
        vetor.push({label: categGeral, layer: L.heatLayer(temp, {radius: 20})});
    }
    return vetor;
}

//-------------------- CONTROL TREE ------------------------
let localizacoes = [
    {
        label: ' Limpar mapa', layer: L.layerGroup(),
    },
    {
    label: 'Pontos de interesse',
    collapsed: true,
    children: makePointLayers()
    },
    {
    label: ' Mapas de calor',
    collapsed: true,
    children: makeHeatLayers()
    }
];
//------------------------------------------------------------
