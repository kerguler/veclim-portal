import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './hoverMenuMethods.css';
import { useDispatch } from 'react-redux';
import useWindowSize from 'customHooks/useWindowSize';
const HoverMenuMethods = ({ mainDivRef, onClose }) => {
	const webApp = useWindowSize();

	const dispatch = useDispatch();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleLinkClickSand = () => {
		onClose(false);

		setIsMenuOpen(false);
	};
	const handleLinkClickAlbo = () => {
		onClose(false);
		setIsMenuOpen(false);
	};
	const handleMenuOpen = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const menuRef = useRef();

	// useOutsideClickClose(menuRef, setIsMenuOpen);
	useEffect(() => {
		const handleClickOnDoc = (event) => {
			if (!menuRef.current) {
			}
			if (
				menuRef &&
				menuRef.current &&
				!menuRef.current.contains(event.target)
			) {
				setIsMenuOpen(false);
			}
		};
		window.addEventListener('click', handleClickOnDoc, true);
		return () => {
			window.removeEventListener('click', handleClickOnDoc);
		};
	});

	return (
		<div
			ref={menuRef}
			className='hover-menu-wrapper'
			//  onClick={handleMenuOpen}
		>
			<div onClick={handleMenuOpen} style={{ cursor: 'pointer' }}>
				{' '}
				METHODS
			</div>
			{isMenuOpen && (
				<div className='hover-menu'>
					<Link
						onClick={handleLinkClickAlbo}
						to='/Methods/TigerMosquito'
					>
						Tiger Mosquito
					</Link>

					<Link onClick={handleLinkClickSand} to='/Methods/SandFly'>
						Sand&nbsp;Fly
					</Link>
				</div>
			)}
		</div>
	);
};

export default HoverMenuMethods;
