import { fetchEarthquakes } from './lib/earthquakes.js';
import { createPopup, init } from './lib/map.js';
import { el, element, formatDate } from './lib/utils.js';
import L from 'leaflet';
const URL = './4.5_week.geojson';

function hideLoading() {
  const load = document.querySelector('.loading');
  load.parentNode.removeChild(load);
}

async function getgeoJson() {
  const data = await fetchEarthquakes();
  return data.features;
}

async function addgeoJson() {
  const data = await getgeoJson();
  if (data === null) {
    console.log('Ekki séns');
    return
  }
  const ulist = document.querySelector('.earthquakes');
  data.forEach((featured) => {
    const content = el('div',
      el('h3', featured.properties.title),
      el('p', `${formatDate(featured.properties.time)}`),
      element('a',
        { href: featured.properties.url, target: '_blank' },
        {},
        'Skoða nánar'
      )
    );
    const marker = createPopup(featured, content);
    ulist.appendChild(
      el('li',
        el('div',
          el('h2', featured.properties.title),
          el('dl',
            el('dt', 'Tími'),
            el('dd', `${formatDate(featured.properties.time)}`),
            el('dt', 'Styrkur'),
            el('dd', featured.properties.mag + ' á Richter')
          ),
          el('div',
            element('button',
              { class: 'buttons' },
              { click: () => { marker.openPopup(); } },
              'Sjá á korti'
            ),
            element('a',
              { href: featured.properties.url, target: '_blank' },
              {},
              'Skoða nánar'
            )
          )
        )
      )
    );
  });
  hideLoading();
}

document.addEventListener('DOMContentLoaded', async () => {
  const kort = document.querySelector('.map');
  init(kort);
  addgeoJson();
});
