import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
function useLMapCoordinateUpdate(mapParRef) {
	let p = mapParRef.current;
	const dispatch = useDispatch();
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName,
	);
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector,
	);
	useEffect(() => {
		function handleCoordinateUpdate(e) {
			PackageMapServices.updateCoordinates({
				e,
				mapParRef,
				vectorName,
				dispatch,
			});
		}

		p.map && p.map.on('mousemove', handleCoordinateUpdate);

		return () => {
			p.map && p.map.off('mousemove', handleCoordinateUpdate);
		};
	}, [vectorName, dispatch, p.map, mapParRef]);
}

export default useLMapCoordinateUpdate;
