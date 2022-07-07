//Layer padrão do mapa;
const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://minhaaju.pages.dev/">MinhaAju</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


//Layer darkmode;
const mapaEscuro = L.tileLayer('https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=6oZOdUci1whayaUdLywS', {
    attribution: '<a href="https://minhaaju.pages.dev/">MinhaAju</a> | <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a> © swisstopo'
});


//Insere informações na box de endereço do marcador;
function addrInfo(props){
    if(props == null) document.getElementById('addr-box').style.display = 'none';
    else{
        document.getElementById('addr-box').style = "display: block;"
        document.getElementById('addr-info').innerHTML = 'Nome: ' + '<span class="addr-destaque">'+ props.name + '</span>'+ (props.contact ? '<br>Dependência Administrativa: ' + '<span class="addr-destaque">'+ props.dep_admin + '</span>' + '<br>Modalidades: '+ '<span class="addr-destaque">'+ props.modalidades + '</span>' + '<br>Porte (matrículas): '+ '<span class="addr-destaque">'+ props.porte + '</span>' + '<br>Contato: '+ '<span class="addr-destaque">'+ props.contact + '</span>' + '<br><br>': '<br>') + 'Rua: ' + '<span class="addr-destaque">'+ props.address.road + '</span>' + '<br>' + 'Bairro: ' + '<span class="addr-destaque">'+ props.address.suburb + '</span>' + '<br>' + 'CEP: ' + '<span class="addr-destaque">'+ props.address.postcode + '</span>' + '<br>'+ '<span class="close-addr">Clique na box para fechá-la.</span>';
        if(!flagControl) {
            $('#control-panel').fadeOut();
            flagControl = !flagControl;
        }
    }
}


//Instanciamento do Mapa;
const map = new L.map('map', {
    center: [-10.9095, -37.0748],
    zoom: 14,
    layers: [baseLayer],
});


//Layers do mapa;
const baseMaps = {
    "Padrão": baseLayer,
    "Dark Mode": mapaEscuro
};


//Modos de visualização;
const mapViews = {
    label: 'Modo de visualização',
    children: [{label:' Padrão', layer: baseLayer},{label:' Dark mode', layer: mapaEscuro}]
};


//Converte float para string (com virgula);
function formataDado(props){
    return (props.toFixed(2)).toString().replace('.',',');
}


//Função de atualização da box de informações das ocorrências;
let flagControl = false;
info_update = function (feature) {
    const props = feature.properties;

    if(props){
        $('#info-box').fadeIn();
        $('#control-panel').fadeOut();
        flagControl = true
    }

    else{
        $('#info-box').fadeOut();
        $('#control-panel').fadeIn();
        flagControl = false;
    }

    if (feature.totalAjuPeriodo == 0) document.getElementById('info-box').innerHTML = (props ?
        '<h4>Tipo de ocorrência: ' + feature.natureza +
        '<br><span>Entre ' + feature.periodo +
        '</span><h4>'+ feature.bairro +'</h4>' +
        '</span></h4><span>' +
        '<p><b>Não há dados referentes à data fornecida.</b></p><br><div><h4><span>Clique na box para fechá-la.</span></h4></div>'
        :
        ''
    );
    else document.getElementById('info-box').innerHTML = (props ?
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


//Quantidade de dias de cada mês
function getQtdDias(mes) {
    if(mes == "Fevereiro") return 28;
    else if(mes in ["Janeiro", "Março", "Maio", "Julho", "Agosto", "Outubro", "Dezembro"]) return 31;
    else return 30
}


//Função de coloração da layer interativa
function colorirMapa(indicador, total) {
    const escala = (total*0.12)/10;
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


//Estilo da layer interativa
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


//Prepara o vetor dos pontos do heatmap
function preparaCalor(natureza){
    let heatmap = [];
    for(feature of dataBairros.features){
        console.log(natureza);
        dataSet[feature.bairro][natureza].properties.filter(function (ocr) {if(ocr.lat != -999.0) heatmap.push([ocr.lat, ocr.lng, 12])});
    }
    return heatmap;
}


//Adiciona a layer de heatmap das ocorrências
function showCalor(nat){
    layer_heatmap = L.heatLayer(preparaCalor(nat), {radius:15});
    map.addLayer(layer_heatmap);
}


//Prepara a layer com os dados escolhidos e adiciona no mapa
function showData(dados){
    const overlay_menuInterativo = L.geoJson(dados, {
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


//Reseta layer do menu de ocorrências
function resetLayers(){
    $("#info-box").fadeOut();
    layer_menuInterativo.clearLayers();
    map.removeLayer(layer_heatmap);
    map.removeLayer(layer_menuInterativo);
}


//Exibe os dropboxes de ano e mês
function showAnoMes(nat, ocorrencia, ano){
    if (nat == "Vazio" && ocorrencia == "null") {
        $(".drop-anos").fadeOut();
        $(".drop-meses").fadeOut();
    }
    else {
        if(nat != "Vazio" && ocorrencia == "violencia") $(".drop-anos").fadeIn();
        if(ano != "null") $(".drop-meses").fadeIn();
    }
}


//Exibe a layer desejada
function exibirLayer() {
    const ocorrencia = $("#list-ocorrencias").val();
    const nat = $("#list-ocs-natureza option:selected").text();
    const ano = $("#list-anos").val();
    const mes = $("#list-meses option:selected").text();
    
    showAnoMes(nat,ocorrencia, ano);
    resetLayers();

    if(ocorrencia == "violencia" && nat != "Vazio"){
        if(ano != "null" && mes == "Todo o período") showData(preparaMapaFiltrado(nat, ano, null));
        else if(ano != "null" && mes != "Todo o período") showData(preparaMapaFiltrado(nat, ano, mes));
        else showData(preparaMapaFiltrado(nat, null, null));
    }
    else if(ocorrencia == "violenciaCalor" && nat != "Vazio") showCalor(nat)
    else resetLayers();
}

//filtra em relação ao ano ou ano & mês
function filtroAnoMes(data, mode, y, m) {
    if(mode) return data.filter(function(e){ return e.ano == y});
    else return data.filter(e => e.ano == y && e.mes == m);
}


//Prepara os dados da layer de ocorrência
function preparaMapaFiltrado(natureza, ano, mes){
    let data = dataBairros;
    let len = 0;
    for(feature of data.features){
        if(!ano && !mes) {
            feature.periodo = (feature.natureza == "Homícidio Doloso" ? feature.periodo : (feature.natureza == "Latrocínio" ? feature.periodo : "Janeiro/2019 - Abril/2022"))
            feature.properties = dataSet[feature.bairro][natureza].properties;
        }
        else if(ano && !mes) {
            feature.periodo = `Janeiro/${ano} - ` + (ano == 2022 ? 'Abril/2022': `Dezembro/${ano}`);
            feature.properties = filtroAnoMes(dataSet[feature.bairro][natureza].properties, true, ano, mes);
        }
        else {
            feature.periodo = `1/${mes}/${ano} - ${getQtdDias(mes)}/${mes}/${ano}`;
            feature.properties = filtroAnoMes(dataSet[feature.bairro][natureza].properties, false, ano, mes);
        }

        feature.natureza = natureza;
        len += feature.properties.length;
    }
    for(feature of data.features) feature.totalAjuPeriodo = len;
    return data;
}


//Botão limpa mapa
$("#remove").click(function () {
    resetLayers();
    $("#list-ocorrencias").prop('selectedIndex', 0);
    $("#list-ocs-natureza").prop('selectedIndex', 0);
    $("#list-anos").prop('selectedIndex', 0);
    $("#list-meses").prop('selectedIndex', 0);
    exibirLayer();
});


//Funções onChange das DropBoxes
$("#list-ocs-natureza").on("change", exibirLayer);
$("#list-ocorrencias").on("change", exibirLayer);
$("#list-anos").on("change", exibirLayer);
$("#list-meses").on("change", exibirLayer);



//Criação do menu de layers;
let menu_layers = L.control.layers.tree(mapViews, localizacoes, {
    namedToggle: false,
    collapsed: true,
});


//Adicionando o menu de layers ao mapa;
menu_layers.addTo(map);


//Resets das boxes ao selecionar outra layer;
$(".leaflet-control-layers-selector").click(function() {
    menu_layers.collapse();
    if(flagControl){
        $("#control-panel").fadeIn();
        flagControl = !flagControl;
    }
    ($('#addr-box').css('visibility') == 'visible' ? $('#addr-box').css('visibility', 'hidden'): '');
    ($('#info-box').css('display') == 'block' ? $('#info-box').css('display', 'none'): '');
})


//Verifica a orientação do dispositivo móvel;
let checkOrientation = function(){
    (window.innerHeight > window.innerWidth ? $(".aviso-map").fadeIn() : $(".aviso-map").fadeOut());
    if(window.innerHeight > window.innerWidth) $("#control-panel").fadeOut();
    else if(!flagControl) $("#control-panel").fadeIn();
}
setInterval(checkOrientation,1000);


//Fecha os as boxes;
$("#info-box").on("click", () => {
    $("#info-box").fadeOut();
   flagControl = !flagControl;
});

$("#addr-box").on("click", () => {
    $("#addr-box").fadeOut();
    $("#control-panel").fadeIn();
    flagControl = !flagControl;
});


exibirLayer();