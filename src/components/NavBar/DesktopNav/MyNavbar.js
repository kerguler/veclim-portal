import logo100 from 'assets/images/logos/VEClim-Logo.svg';
import './MyNavbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import HoverMenuMethods from 'components/HoverMenuMethods/HoverMenuMethods';
import { useEffect } from 'react';
import { setReadyToView } from 'store';
import { setPanelOpen } from 'store';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
function MyNavbar({ style }) {
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName,
	);
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector,
	);
	const dispatch = useDispatch();
	let linkText;

	if (vectorName === 'albopictus') {
		linkText = '/MapPage';
	} else {
		linkText = '/MapPage';
	}

	const handleMapBounds = () => {
		PackageMapServices.handleToMapPageTransition(
			dispatch,
			vectorName,
			mapVector,
		);
		dispatch(setPanelOpen({ direction: 'left', value: false }));
		dispatch(setReadyToView(false));
	};

	useEffect(() => {
		handleMapBounds();
	}, [mapVector]);

	return (
		<div className='navbar'>
			<div className='my-navbar'>
				<Link to='/'>
					<div className='logo-div'>
						<img src={logo100} alt='VEClim Logo'></img>
					</div>
				</Link>

				<div className='navbar-links'>
					<Link to='/'>HOME</Link>
					<Link to='/Project'>PROJECT</Link>
					<Link to='/Policy'>POLICY</Link>

					<HoverMenuMethods onClose={() => {}}></HoverMenuMethods>
					{/* 
					<Link onClick={handleMapBounds} className="button" to={linkText}>
						MAP &gt;
					</Link> */}
					<Link
						onClick={handleMapBounds}
						className='button'
						to='/MapPage'
					>
						MAP &gt;
						{/* {displayContextMenu && <VectorSelectionContextMenu />} */}
					</Link>
				</div>
			</div>{' '}
		</div>
	);
}

export default MyNavbar;
