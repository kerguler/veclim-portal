import { setCurrentMapCenter, setCurrentMapZoom } from 'store';
export const syncReduxFromLeaflet = (mapParRef, dispatch) => {
  const p = mapParRef.current;
  if (!p?.map) return;
  const tempC = p.map.getCenter();
  const tempZ = p.map.getZoom();
  // console.log('Syncing Redux from Leaflet', { tempC, tempZ });
  dispatch(setCurrentMapZoom(tempZ));
  dispatch(setCurrentMapCenter({ lat: tempC.lat, lng: tempC.lng }));
};
