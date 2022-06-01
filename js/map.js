//Layer padrão do mapa;
let baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://minhaaju.pages.dev/">MinhaAju</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


//Layer darkmode;
let mapaEscuro = L.tileLayer('https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=6oZOdUci1whayaUdLywS', {
    attribution: '<a href="https://minhaaju.pages.dev/">MinhaAju</a> | <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a> © swisstopo'
});


//Insere informações na box de endereço do marcador;
function addrInfo(props){
    if(props == null) document.getElementById('addr-box').style.display = 'none';
    else{
        document.getElementById('addr-box').style = "display: block;"
        document.getElementById('addr-info').innerHTML = 'Nome: ' + '<span class="addr-destaque">'+ props.name + '</span>'+ (props.contact ? '<br>Dependência Administrativa: ' + '<span class="addr-destaque">'+ props.dep_admin + '</span>' + '<br>Modalidades: '+ '<span class="addr-destaque">'+ props.modalidades + '</span>' + '<br>Porte (matrículas): '+ '<span class="addr-destaque">'+ props.porte + '</span>' + '<br>Contato: '+ '<span class="addr-destaque">'+ props.contact + '</span>' + '<br><br>': '<br>') + 'Rua: ' + '<span class="addr-destaque">'+ props.address.road + '</span>' + '<br>' + 'Bairro: ' + '<span class="addr-destaque">'+ props.address.suburb + '</span>' + '<br>' + 'CEP: ' + '<span class="addr-destaque">'+ props.address.postcode + '</span>' + '<br>'+ '<span class="close-addr">Clique na box para fechá-la.</span>';
    }
}


//Instanciamento do Mapa;
let map = new L.map('map', {
    center: [-10.9095, -37.0748],
    zoom: 14,
    layers: [baseLayer],
});


//Layers do mapa;
let baseMaps = {
    "Padrão": baseLayer,
    "Dark Mode": mapaEscuro
};


//Modos de visualização;
let mapViews = {
    label: 'Modo de visualização',
    children: [{label:' Padrão', layer: baseLayer},{label:' Dark mode', layer: mapaEscuro}]
};


//Converte float para string (com virgula);
function formataDado(props){
    return (props.toFixed(2)).toString().replace('.',',');
}


//Criação da marca d'água;
let marca = L.control({position: 'bottomright'});

marca.onAdd =function (map) {
    this._div = L.DomUtil.create('div', 'marca');
    this._div.innerHTML = '<a href="https://minhaaju.pages.dev/"><img src="./assets/logo/logo.png" alt="Logo do Minha Aju" width="100" style="opacity:80%;"></img></a>'
    return this._div;
};


//Função de atualização da box de informações das ocorrências;
info_update = function (feature) {
    let props = feature.properties;

    (props ? $('#info-box').css('display','block') : $('#info-box').css('display','none'));
    
    document.getElementById('info-box').innerHTML = (props ?
        '<h4>Tipo de ocorrência: ' + feature.natureza +
        '<br><span>Entre ' + feature.periodo +
        '</span><h4>'+ feature.bairro +'</h4>' +
        '</span></h4><span>' +
        '<p><b>Ocorrências registradas: </b>' + props.length +
        '<br><b>Equivalente a </b>' + formataDado((props.length/feature.totalAjuPeriodo)*100) + '% <b>do total de ocorrências.</b>' +
        '<p><b>Total de ocorrências: </b>' + feature.totalAjuPeriodo +
        '</p><div class="legend"><i style="background:#ffffcc"></i> <i style="background:#ffeda0"></i> <i style="background:#fed976"></i> <i style="background:#feb24c"></i> <i style="background:#fd8d3c"></i> <i style="background:#fc4e2a"></i> <i style="background:#e31a1c"></i> <i style="background:#bd0026"></i> <i style="background:#800026"></i></div><div><h4><span>Clique na box para fechá-la.</span></h4></div>'
        :
        ''
    );
};

function getCountryByCode(data, code) {
    return data.filter(
        function(data){ return data.properties.name == code }
    );
  }


$("#remove").click(function () {
    resetLayers();
});


function numeroMes(mes) {
    return mes == "Janeiro" ? 1 :
    mes == "Fevereiro" ? 2 :
    mes == "Março" ? 3 :
    mes == "Abril" ? 4 :
    mes == "Maio" ? 5 :
    mes == "Junho" ? 6 :
    mes == "Julho" ? 7 :
    mes == "Agosto" ? 8 :
    mes == "Setembro" ? 9 :
    mes == "Outubro" ? 10 :
    mes == "Novembro"? 11 :
    12;
}

function colorirMapa(indicador, total) {
    let escala = (total*0.12)/10;
    return indicador > escala*9 ? '#800026' :
    indicador > escala*8 ? '#bd0026' :
    indicador > escala*7 ? '#e31a1c' :
    indicador > escala*6 ? '#fc4e2a' :
    indicador > escala*5 ? '#fd8d3c' :
    indicador > escala*4 ? '#feb24c' :
    indicador > escala*3 ? '#fed976' :
    indicador > escala*2 ? '#ffeda0' :
    indicador > 0 ? '#ffffcc' :
    '#ffffff'
}


function estiloVisualizacao(feature) {
    return {
        fillColor: colorirMapa(feature.properties.length, feature.totalAjuPeriodo),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };
}


function preparaMapa(natureza){
    let data = dataBairros;
    let len = 0;
    for(feature of data.features){
        feature.properties = dataSet[feature.bairro][natureza].properties;
        feature.natureza = natureza;
        len += feature.properties.length;
    }
    for(feature of data.features) feature.totalAjuPeriodo = len;
    return data;
}


function preparaCalor(natureza){
    let heatmap = [];
    for(feature of dataBairros.features){
        dataSet[feature.bairro][natureza].properties.filter(function (ocr) {if(ocr.lat != -999.0) heatmap.push([ocr.lat, ocr.lng, 12])});
    }
    return heatmap;
}


function showCalor(nat){
    layer_heatmap = L.heatLayer(preparaCalor(nat), {radius:15});
    map.addLayer(layer_heatmap);
}

function showData(nat){
    let dados = preparaMapa(nat);
    let overlay_menuInterativo = L.geoJson(dados, {
        style: estiloVisualizacao,
        onEachFeature: function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                click : showOcorrencias,
                mouseout: function resetHighlight(e) {
                    overlay_menuInterativo.resetStyle(e.target);
            
                }
            });
        }
    }).addTo(layer_menuInterativo);
    map.addLayer(layer_menuInterativo);
}

function resetLayers(){
    layer_menuInterativo.clearLayers();
    map.removeLayer(layer_heatmap);
    map.removeLayer(layer_menuInterativo);
}

$("#exibir-ocs").click(function () {
    let ocorrencia = $("#list-ocorrencias").val();
    let nat = $("#list-ocs-natureza option:selected").text();
    if(ocorrencia == "violencia" && nat != "Vazio"){
        resetLayers();
        showData(nat);
    }
    else if(ocorrencia == "violenciaCalor" && nat != "Vazio"){
        resetLayers();
        showCalor(nat);
    }
    else{
        resetLayers();
    }
});



//Criação do menu de layers;
let menu_layers = L.control.layers.tree(mapViews, localizacoes, {
    namedToggle: false,
    collapsed: true,
});


//Adicionando a marca d'água e o menu de layers ao mapa;
marca.addTo(map);
menu_layers.addTo(map);


//Resets das boxes ao selecionar outra layer;
$(".leaflet-control-layers-selector").click(function() {
    menu_layers.collapse();
    ($('#addr-box').css('visibility') == 'visible' ? $('#addr-box').css('visibility', 'hidden'): '');
    ($('#info-box').css('display') == 'block' ? $('#info-box').css('display', 'none'): '');
})


//Verifica a orientação do dispositivo móvel;
let checkOrientation = function(){
    (window.innerHeight > window.innerWidth ? $(".aviso-map").fadeIn() : $(".aviso-map").fadeOut());
}
setInterval(checkOrientation,1000);

//Fecha os as boxes;
$("#info-box").on("click", () => $("#info-box").fadeOut());

$("#addr-box").on("click", () => $("#addr-box").fadeOut());