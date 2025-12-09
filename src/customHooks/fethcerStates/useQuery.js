// customHooks/useQuery.js  (conceptual)
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const tile = params.get('tile');
  const panel = params.get('panel');
  const decade = params.get('decade');
  const lon = params.get('lon');
  const lat = params.get('lat');
  const session = params.get('session'); // vector id

  // NEW:
  const zoom = params.get('z'); // zoom level
  const bounds = params.get('b'); // "minLat,minLng,maxLat,maxLng"

  return { tile, panel, decade, lon, lat, session, zoom, bounds };
}

export default useQuery;
