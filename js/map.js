let baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://minhaaju.pages.dev/">MinhaAju</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let mapaEscuro = L.tileLayer('https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=6oZOdUci1whayaUdLywS', {
    attribution: '<a href="https://minhaaju.pages.dev/">MinhaAju</a> | &copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a> © swisstopo <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a> <a target="_blank" href="https://www.swisstopo.admin.ch/en/home.html">&copy; swisstopo</a> contributors'
});


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


addressPoints=[]
for (const indicador in DataSet_Educacao) {
    DataSet_Educacao[indicador].map(function(p) {
        addressPoints.push([p['lat'],p['lng'], 12])
    });
}


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


function newCriaPontos(dataS, grupo, heats, icone){
    for (i in dataS){
         dataS[i].map(function(p) {
            L.marker([p['lat'], p['lng']],{icon: icone}).addTo(grupo).on('click', function(){addrInfo(p)});
            heats.push([p['lat'], p['lng'],12]);
        });
    }
};


function addrInfo(a){
    if( a == null) document.getElementById('addr-box').style.display = 'none';
    else{
        document.getElementById('addr-box').style = "display: block;"
        document.getElementById('addr-info').innerHTML = 'Nome: ' + a.name + (a.contact ? '<br>Dependência Administrativa: ' + a.dep_admin + '<br>Modalidades: '+ a.modalidades + '<br>Porte (matrículas): '+ a.porte + '<br>Contato: '+ a.contact + '<br><br>': '<br>') + 'Rua: ' + a.address.road + '<br>' + 'Bairro: ' + a.address.suburb + '<br>' + 'CEP: ' + a.address.postcode + '<br>'+ 'Para resetar o box, clique em qualquer local do mapa.';
    }
}

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


let map = new L.map('map', {
    center: [-10.9095, -37.0748],
    zoom: 14,
    layers: [baseLayer],
});


let baseMaps = {
    "Padrão": baseLayer,
    "Dark Mode": mapaEscuro
};

let mapViews = {
    label: 'Modo de visualização',
    children: [{label:' Padrão', layer: baseLayer},{label:' Dark mode', layer: mapaEscuro}]
};


function highIndics_getColor(indicador) {
    return indicador > 1125 ? '#800026' :
    indicador > 1000 ? '#bd0026' :
    indicador > 875 ? '#e31a1c' :
    indicador > 750 ? '#fc4e2a' :
    indicador > 625 ? '#fd8d3c' :
    indicador > 500 ? '#feb24c' :
    indicador > 375 ? '#fed976' :
    indicador > 250 ? '#ffeda0' :
    indicador > 125 ? '#ffffcc' :
    '#ffffff'
}

function lowIndics_getColor(indicador) {
    return indicador > 25 ? '#800026' :
    indicador > 20 ? '#bd0026' :
    indicador > 15 ? '#e31a1c' :
    indicador > 12 ? '#fc4e2a' :
    indicador > 9 ? '#fd8d3c' :
    indicador > 7 ? '#feb24c' :
    indicador > 5 ? '#fed976' :
    indicador > 3 ? '#ffeda0' :
    indicador >= 1 ? '#ffffcc' :
    '#ffffff'
}

function homicidios_getColor(indicador) {
    return indicador > 80 ? '#800026' :
    indicador > 70 ? '#bd0026' :
    indicador > 60 ? '#e31a1c' :
    indicador > 50 ? '#fc4e2a' :
    indicador > 40 ? '#fd8d3c' :
    indicador > 30 ? '#feb24c' :
    indicador > 20 ? '#fed976' :
    indicador > 10 ? '#ffeda0' :
    indicador >= 1 ? '#ffffcc' :
    '#ffffff'
}

function assedios_getColor(indicador) {
    return indicador > 9 ? '#800026' :
    indicador > 8 ? '#bd0026' :
    indicador > 7 ? '#e31a1c' :
    indicador > 6 ? '#fc4e2a' :
    indicador > 5 ? '#fd8d3c' :
    indicador > 4 ? '#feb24c' :
    indicador > 3 ? '#fed976' :
    indicador > 2 ? '#ffeda0' :
    indicador >= 1 ? '#ffffcc' :
    '#ffffff'
}

function style4(feature) {
    return {
        fillColor: assedios_getColor(feature.properties.indicador),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };
}

function style3(feature) {
    return {
        fillColor: homicidios_getColor(feature.properties.indicador),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };
}

function style2(feature) {
    return {
        fillColor: lowIndics_getColor(feature.properties.indicador),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };
}

function style1(feature) {
    return {
        fillColor: highIndics_getColor(feature.properties.indicador),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


let layer_latrocinios = L.geoJson(latrocinioAju);
let layer_homicidios = L.geoJson(homicidioAju);
let layer_vulneravel = L.geoJson(vulneravelAju);
let layer_importu = L.geoJson(importuAju);
let layer_assedios = L.geoJson(assedioAju);
let layer_estupros = L.geoJson(estuproAju);
let layer_furtos = L.geoJson(furtoAju);
let layer_roubos = L.geoJson(rouboAju);

let info = L.control({position: 'topleft'});


let overlay_furtos = L.geoJson(furtoAju, {
    style: style1,
    onEachFeature: function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: function resetHighlight(e) {
                overlay_furtos.resetStyle(e.target);
                info.update();
            }
        });
    }
}).addTo(layer_furtos);


let overlay_roubos = L.geoJson(rouboAju, {
    style: style1,
    onEachFeature: function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: function resetHighlight(e) {
                overlay_roubos.resetStyle(e.target);
                info.update();
            }
        });
    }
}).addTo(layer_roubos);

let overlay_estupros = L.geoJson(estuproAju, {
    style: style2,
    onEachFeature: function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: function resetHighlight(e) {
                overlay_estupros.resetStyle(e.target);
                info.update();
            }
        });
    }
}).addTo(layer_estupros);


let overlay_assedios = L.geoJson(assedioAju, {
    style: style4,
    onEachFeature: function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: function resetHighlight(e) {
                overlay_assedios.resetStyle(e.target);
                info.update();
            }
        });
    }
}).addTo(layer_assedios);


let overlay_importu = L.geoJson(importuAju, {
    style: style2,
    onEachFeature: function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: function resetHighlight(e) {
                overlay_importu.resetStyle(e.target);
                info.update();
            }
        });
    }
}).addTo(layer_importu);


let overlay_vulneravel = L.geoJson(vulneravelAju, {
    style: style2,
    onEachFeature: function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: function resetHighlight(e) {
                overlay_vulneravel.resetStyle(e.target);
                info.update();
            }
        });
    }
}).addTo(layer_vulneravel);


let overlay_homicidios = L.geoJson(homicidioAju, {
    style: style3,
    onEachFeature: function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: function resetHighlight(e) {
                overlay_homicidios.resetStyle(e.target);
                info.update();
            }
        });
    }
}).addTo(layer_homicidios);


let overlay_latrocinios = L.geoJson(latrocinioAju, {
    style: style2,
    onEachFeature: function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: function resetHighlight(e) {
                overlay_latrocinios.resetStyle(e.target);
                info.update();
            }
        });
    }
}).addTo(layer_latrocinios);


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
    
    info.update(layer.feature.properties);
}

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

function formataDado(props){
    return (props.toFixed(2)).toString().replace('.',',');
}

let marca = L.control({position: 'bottomright'});

marca.onAdd =function (map) {
    this._div = L.DomUtil.create('div', 'marca');
    this._div.innerHTML = '<a href="https://minhaaju.pages.dev/"><img src="./assets/logo/logo.png" alt="Logo do Minha Aju" width="100" style="opacity:80%;"></img></a>'
    return this._div;
};

info.update = function (props) {
    this._div.style.display = (this._div.innerHTML == ''? "block": "none");
    this._div.innerHTML = (props ?
        '<div id="info-box"><h4>Tipo de ocorrência: ' + props.Natureza +
        '<br><span style="font-size: 18px">Entre ' + props.periodo +
        '<br>Bairro '+props.name + 
        '</span></h4><span style="font-size: 18px">' +
        '<p><b>Ocorrencias registradas: </b>' + props.indicador +
        '<br><b>Média anual: </b>' + formataDado(props.m_anual) +
        '<br><b>Média mensal: </b>' + formataDado(props.m_mensal) + '</p>'+

        '<h4><span style="font-size: 20px">Aracaju:</h4></span>' +
        '<p><b>Total de correncias: </b>' + props.aju +
        '<br><b>Média anual: </b>' + formataDado(props.aju_m_anual) +
        '<br><b>Média mensal: </b>' + formataDado(props.aju_m_mensal) +
        
        '</p><div class="legend"><i style="background:#ffffcc"></i> <i style="background:#ffeda0"></i> <i style="background:#fed976"></i> <i style="background:#feb24c"></i> <i style="background:#fd8d3c"></i> <i style="background:#fc4e2a"></i> <i style="background:#e31a1c"></i> <i style="background:#bd0026"></i> <i style="background:#800026"></i> </div></div>'
        :
        ''
    );
};

info.addTo(map);
marca.addTo(map);

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
    
    ]},
    {
        label: ' Ocorrências',
        children: [
            {
                label: ' Violência',
                collapsed: true,
                children: [
                    {label: ' Roubos', layer: layer_roubos}, {label:' Furtos', layer: layer_furtos}, {label:' Homicídios dolosos', layer: layer_homicidios}, {label:' Latrocínios', layer: layer_latrocinios}, {label:' Estupros', layer: layer_estupros}, {label:' Estupro de vulnerável', layer: layer_vulneravel}, {label:' Importunação Sexual', layer: layer_importu}, {label:' Assédio sexual', layer: layer_assedios}
                ]
            }
        ]
    }
];



L.control.layers.tree(mapViews, localizacoes, {
    namedToggle: false,
    collapsed: true,
}).addTo(map);

map.on("click", e => {
    addrInfo(null);
});