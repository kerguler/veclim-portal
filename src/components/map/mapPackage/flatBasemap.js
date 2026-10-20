import { maplibreGL } from '@maplibre/maplibre-gl-leaflet';
import 'maplibre-gl/dist/maplibre-gl.css';

// OpenFreeMap positron, no key needed
const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';

// layers to hide besides all text/icons, edit to taste
const HIDE_IDS = /^(highway|road|tunnel|railway|aeroway|building|landuse|landcover|waterway)/;

export function createFlatBasemap() {
  const layer = maplibreGL({ style: STYLE_URL, attribution: '' });

  layer.on('add', () => {
    const gl = layer.getMaplibreMap();
    const hide = () => {
      const layers = gl.getStyle()?.layers || [];
      layers.forEach((l) => {
        const hidden = l.type === 'symbol' || HIDE_IDS.test(l.id);
        if (hidden && gl.getLayoutProperty(l.id, 'visibility') !== 'none') {
          gl.setLayoutProperty(l.id, 'visibility', 'none');
        }
      });
    };
    gl.on('styledata', hide);
    hide();
  });

  return layer;
}
