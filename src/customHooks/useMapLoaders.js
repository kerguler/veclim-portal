import { useSelector } from 'react-redux';
import { useCallback } from 'react';
function useMapLoaders({ setMapLoaded, setLeftMapLoaded, setRightMapLoaded }) {
	const tileArray = useSelector((state) => state.location.tileArray);

	const loaders = useCallback(
		(tileLayer, tileName) => {
			const handleLoading = () => {};
			const handleTileLoad = (e) => {
				e.tile.style.boxShadow = 'none';
				e.tile.style.transition = 'boxshadow 1s ease-in-out';
				e.tile.style.backdropFilter = 'none';
				e.tile.style.opacity = '1';
			};
			const handleLoad = (e) => {
				if (tileArray.length === 1) {
					setMapLoaded(true);
					setLeftMapLoaded(false);
					setRightMapLoaded(false);
				} else {
					if (tileName === tileArray[0]) {
						setLeftMapLoaded(true);
					} else {
						setRightMapLoaded(true);
					}
				}
				document.querySelectorAll('.leaflet-tile').forEach((tile) => {
					tile.style.boxShadow = 'none';
				});
			};

			const handleTileLoadStart = (e) => {
				e.tile.style.backdropFilter = 'blur(20px)';
				e.tile.style.boxShadow =
					'inset -10px -10px 15px rgba(255, 255, 255, 0.5),	 inset 10px 10px 15px rgba(70, 70, 70, 0.12)';
				e.tile.style.filter =
					'drop-shadow(5px 5px 5px rgba(0,0,0,0.3))';
				e.tile.style.visibility = 'inherit';
			};

			tileLayer.on('loading', handleLoading);
			tileLayer.on('tileload', handleTileLoad);
			tileLayer.on('load', handleLoad);
			tileLayer.on('tileloadstart', handleTileLoadStart);

			return () => {
				tileLayer.off('loading', handleLoading, true);
				tileLayer.off('tileload', handleTileLoad, true);
				tileLayer.off('load', handleLoad, true);
				tileLayer.off('tileloadstart', handleTileLoadStart, true);
			};
		},
		[tileArray],
	);
	return { loaders };
}
export default useMapLoaders;
