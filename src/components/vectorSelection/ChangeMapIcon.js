import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
	setSwitchMap,
	setVectorName,
	setTileArray,
	setMapPagePosition,
	setCurrentMapCenter,
	setCurrentMapZoom,
	setDisplayedPanelID,
	setPanelOpen,
} from '../../store';

function ChangeMapIcon({ image, className }) {
	const dispatch = useDispatch();
	const vectorName = useSelector((state) => state.vector.vectorName);
	const handleChangeTile = () => {
		dispatch(setSwitchMap(true));
		if (vectorName === 'albopictus') {
			dispatch(setVectorName('papatasi'));
			dispatch(setTileArray(['papatasi_aprdec']));
			dispatch(setMapPagePosition({ lat: 35, lng: 33 }));
			dispatch(setCurrentMapZoom(3));
			dispatch(setCurrentMapCenter([35.05, 33.24]));
		} else {
			dispatch(setVectorName('albopictus'));
			dispatch(setTileArray(['colegg']));
			dispatch(setCurrentMapZoom(1));
			dispatch(setCurrentMapCenter([0, 0]));
		}

		dispatch(setDisplayedPanelID({ direction: 'left', value: 0 }));
		dispatch(setPanelOpen(false));
	};

	return (
		<div onClick={handleChangeTile} className={className}>
			<img alt='fly-icon' src={image}></img>
		</div>
	);
}

export default ChangeMapIcon;
