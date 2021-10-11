import 'ol/ol.css';
import Map from 'ol/Map';
import * as olProj from 'ol/proj';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import * as Style from 'ol/style';

var stations_shtml = 'https://ly1bwb.vhf.lt/kryzkalnis.html';
var start_lon_lat = [22.5, 55.5];

function getStyleCircle(radius) {
  return new Style.Style({ 
    image: new Style.Circle({
        radius: radius * 3, 
        fill: new Style.Fill({color: 'black'}),
        stroke: new Style.Stroke({
          color: [255,0,0], width: 2
      })
    }),
  })
}

function getStyleLabel(callsign) {
  return new Style.Style({
    text: new Style.Text({
        font: '12px Calibri,sans-serif',
        overflow: true,
        fill: new Style.Fill({
            color: '#000'
        }),
        stroke: new Style.Stroke({
            color: '#fff',
            width: 3
        }),
        text: callsign,
        offsetY: 15
    })
  })
}
var vs = new VectorSource({});
var vl = new VectorLayer({ source: vs });

function convertCoord(lNumber) {
  minutes = Math.floor(lNumber % 1 * 100);
  minutes_dec = Math.floor( ( minutes / 60 ) * 100);
  return lNumber - minutes/100 + minutes_dec/100;
}

function iterateRows(row) {
  columns = row.getElementsByTagName("td");
  latlon = columns[1].innerHTML.split(", "); 

  if (latlon.length == 2) {
    latNumber = parseFloat(latlon[0]) / 100;
    lonNumber = parseFloat(latlon[1]) / 100;
   
    f = new Feature({
      name: columns[0].innerText,
      geometry: new Point(olProj.fromLonLat(
        [ convertCoord(lonNumber), convertCoord(latNumber) ]))
    })
    
    size = columns[4].innerText.length - 1;
    if (size > 3) { 
      size = 3; 
    }
    f.setStyle( [getStyleCircle(size+1), getStyleLabel(columns[0].innerText)] )
    vs.addFeature(f);
  }
}

function fetchHTML(file) {
  fetch(file)
  .then(function(response) {
	  return response.text();
  })
  .then(function(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");
      var docTable = doc.getElementsByTagName("table")[0];
      
      var rows = docTable.getElementsByTagName("tr");
            var rowList = Array.prototype.slice.call(rows);
      rowList.forEach(iterateRows);
    }
  );
}

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  view: new View({
    center: olProj.fromLonLat(start_lon_lat),
    zoom: 6,
  }),
});

map.addLayer(vl);

fetchHTML(stations_shtml);
