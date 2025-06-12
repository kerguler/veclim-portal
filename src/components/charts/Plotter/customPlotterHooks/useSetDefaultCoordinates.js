import useDirectorFun from 'customHooks/useDirectorFun';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MapAdjustmentsService from 'components/charts/services/MapAdjustmentsService';
function useSetDefaultCoordinates(direction) {
	const dispatch = useDispatch();
	const { mapPagePosition, vectorName, setMapPagePositionDir } =
		useDirectorFun(direction);
	useEffect(() => {
		if (direction === 'left') {
			if (!mapPagePosition.lat) {
				if (vectorName === 'albopictus') {
					dispatch(
						setMapPagePositionDir(
							MapAdjustmentsService.defaultWorldCenter,
						),
					);
				} else {
					dispatch(
						setMapPagePositionDir(
							MapAdjustmentsService.defaultCypCenter,
						),
					);
				}
			}
		}
	}, [
		vectorName,
		dispatch,
		mapPagePosition,
		direction,
		setMapPagePositionDir,
	]);
}

export default useSetDefaultCoordinates;
