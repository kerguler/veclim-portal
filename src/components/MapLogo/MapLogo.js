import { Link } from 'react-router-dom';
import veclimLogo from 'assets/images/logos/VEClim-Icon.svg';
import './mapLogo.css';
import { useDispatch } from 'react-redux';
import { setDisplayedPanelID } from 'store';
function MapLogo() {
	const dispatch = useDispatch();
	const handleMainPageTransition = () => {
		dispatch(setDisplayedPanelID({ direction: 'left', value: null }));
		// dispatch(setMapVector(vectorName));
	};

	return (
		<div className='map-logo-wrapper'>
			<Link onClick={handleMainPageTransition} to='/'>
				<div className='image-container'>
					<img src={veclimLogo} alt='transparent logo'></img>
				</div>
			</Link>
		</div>
	);
}

export default MapLogo;
