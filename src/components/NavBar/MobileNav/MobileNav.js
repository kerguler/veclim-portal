import './mobileNav.css';
import overlayImage from 'assets/images/dark_background_overlay_complete.webp';
import worldPic from 'assets/icons/009-globe-4-32px.png';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import 'styles/IconMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClickClose from 'customHooks/useOutsideClickClose';
import PackageMapServices from 'components/map/mapPackage/PackageMapServices';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import useRenderCount from 'customHooks/useRenderCount';
function MobileNav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const mainDivRef = useRef();
	useOutsideClickClose(mainDivRef, setIsMenuOpen);
	const dispatch = useDispatch();
	const mapVector = useSelector((state) => state.vector.mapVector);
	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const vectorName = useSelector((state) => state.vector.vectorName);
	let linkText;
	if (vectorName === 'albopictus') {
		linkText = '/MapPage';
	} else {
		linkText = '/MapPage/SandFly';
	}

	const handleMapBounds = () => {
		PackageMapServices.handleToMapPageTransition(
			dispatch,
			vectorName,
			mapVector,
		);
	};

	return (
		<div className='navbar mobile'>
			<div ref={mainDivRef} className='cover'>
				{isMenuOpen && (
					<BurgerMenu
						handleMenu={handleClick}
						mainDivRef={mainDivRef}
						linkText={linkText}
						handleMapBounds={handleMapBounds}
					></BurgerMenu>
				)}

				<div className='overlay-pic'>
					<img alt='overlay' src={overlayImage}></img>
				</div>
				<Link onClick={handleMapBounds} to={linkText} className='map'>
					<div className='map-page-icon '>
						<img
							className='map-icon'
							alt='map-icon'
							src={worldPic}
						></img>
					</div>
				</Link>
				<header className='mobile-header'>
					<div className='burger-menu'>
						<div
							onClick={handleClick}
							width='32px'
							className='burger-icon'
						/>
					</div>
				</header>
			</div>
		</div>
	);
}

export default MobileNav;
