import { useEffect } from 'react';

function useLMapResize(mapParRef) {
  useEffect(() => {
    require('leaflet/dist/leaflet.css');
    require('components/LeftPanel/MapWithDate/MyMap/MyMap.css');
  }, []);

  useEffect(() => {
    function handleResize() {
      const mapElement = document.getElementById('map1');
      if (mapElement) {
        mapElement.style.height = `${window.innerHeight}px`;
        mapElement.style.width = `${window.innerWidth}px`;
      }

      if (mapParRef?.current?.map) {
        mapParRef.current.map.invalidateSize();
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mapParRef]);
}

export default useLMapResize;