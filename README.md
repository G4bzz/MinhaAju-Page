# MinhaAju
Repositório oficial da aplicação MinhaAju.

A aplicação é fruto do projeto PIBITI, orientado pelo Prof. Dr. Hendrik T. Macedo e executado pelo discente Gabriel de O. Santos ambos da Universidade Federal de Sergipe - UFS.

Link do app: [acessar o app!](http://minhaaju.pages.dev/)


## O que é o MinhaAju?
Trata-se de uma aplicação Web que, de maneira visual, provê dados estatísticos acerca da violência na cidade de Aracaju-SE, exibindo por meio de um mapa interativo informações sobre roubos, furtos, homicídio doloso, assédio, entre outras naturezas de crime. Além disso, a aplicação também fornece diversos pontos de interesse como escolas, lojas de departamento, postos policiais, entre outros, que são exibidos como marcadores no mapa da aplicação, tais marcadores contêm informações acerca do local.


## Caracterização e justificativa
Ao buscar por algumas aplicações que trabalhassem com a visualização de dados abertos, notou-se algo em comum entre as aplicações, todas trazem uma solução para um problema específico de um determinado assunto. Tal fato explica a deficiência de apps que apresentem soluções para problemáticas com um escopo mais generalista.

Por abordarem uma temática mais específica, o público alvo destes apps acaba sendo mais específico. Por exemplo: pesquisadores, estudantes ou pessoas que possuem interesse neste determinado tema. Com isso, o público comum acaba não tendo acesso a tais informações ou, quando tem, acaba não compreendendo totalmente a aplicação por não ter o conhecimento específico do tema.

Tendo em vista estes problemas atrelados à dificuldade de acesso do grande público aos dados abertos dos softwares/portais já existentes, o software MinhaAju visa dispor uma forma de apresentar os dados abertos referentes à cidade de Aracaju para a sua população através de um mapa interativo da cidade, com uma interface de fácil acesso e entendimento.


## Registro de software
Tanto a aplicação quanto a marca *Minha Aju* foram registradas no INPI.


## Aspectos técnicos:
- Logo: autoria própria, feito no Adobe Photoshop;
- Página principal: HTML, CSS, javascript e  jQuery;
- Dados: catálogo de escolas do INEP, dados da API OpenStreetMap e conjunto de dados referentes à violência na capital sergipana, cedido pela SSP/SE;
- Tratamento dos dados: feito em python;
- Biblioteca usada para gerar o mapa: [Leaflet](https://leafletjs.com/) e [OpenStreetMap](https://www.openstreetmap.org/);
- Plugins usados: [leaflet-heat](https://github.com/Leaflet/Leaflet.heat), [leaflet.awesome-markers](https://github.com/lennardv2/Leaflet.awesome-markers) e [Leaflet.Control.Layers.Tree](https://github.com/jjimenezshaw/Leaflet.Control.Layers.Tree);