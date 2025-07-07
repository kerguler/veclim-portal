import { useLocation } from "react-router-dom";


const useQuery = () => {
  const searchParams = new URLSearchParams(useLocation().search);

  return {
    tile: searchParams.get("tile"),
    panel: searchParams.get("panel"),
    decade: searchParams.get("decade"),
    lon: searchParams.get("lon"),
    lat: searchParams.get("lat"),
    session: searchParams.get("session"),
  };
};

export default useQuery;