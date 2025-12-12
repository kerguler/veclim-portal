// customHooks/useQuery.js
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const tile = params.get('tile');
  const panel = params.get('panel');
  const decade = params.get('decade');
  const lon = params.get('lon');   // clicked cell
  const lat = params.get('lat');   // clicked cell
  const cLon = params.get('cLon'); // camera center
  const cLat = params.get('cLat'); // camera center
  const session = params.get('session');
  const zoom = params.get('z');
  const bounds = params.get('b');

  return { tile, panel, decade, lon, lat, cLon, cLat, session, zoom, bounds };
}

export default useQuery;
