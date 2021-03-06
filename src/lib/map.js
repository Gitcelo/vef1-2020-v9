import L from 'leaflet';

let map;

// Býr til popup á korti út frá geojson með content
export function createPopup(geojson, content) {
  /*L.geoJSON(geojson, {
    pointToLayer: function(feature, latlng) {
      return new L.marker(latlng);
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(content)
    }
  }).addTo(map);*/
  return L.geoJSON(geojson).addTo(map).bindPopup(content);
}

// Býr til Leaflet kort og setur miðju á (0, 0) í zoom level 2
export function init(el) {
  // TODO
  map = L.map(el, {
    center: [0.0, 0.0],
    zoom: 2
  });
  // Bætum við "tiles" frá OSM sem eru open source. Gætum líka
  // notað frá Google, mapbox eða fleirum en þyrftum þá aðgang
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
}
