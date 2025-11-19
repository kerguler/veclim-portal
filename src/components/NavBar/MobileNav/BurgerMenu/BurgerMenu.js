import HoverMenuMethods from "components/HoverMenuMethods/HoverMenuMethods";
import { Link } from "react-router-dom";
import "./BurgerMenu.css";
import { useState } from "react";
function BurgerMenu({ mainDivRef, linkText, handleMapBounds, handleMenu }) {
	const handleMenuClose = () => {
		handleMenu(false);
	};

	return (
		<div className="nav-burger">
			<nav>
				<div className="nav-burger links">
					<Link onClick={handleMenuClose} to="/">
						HOME
					</Link>
					<Link onClick={handleMenuClose} to="/Project">
						PROJECT
					</Link>
					<Link onClick={handleMenuClose} to="/Policy">
						POLICY
					</Link>
					{/* <Link to="/MobileLandingPageMethods">METHODS</Link> */}

					<HoverMenuMethods mainDivRef={mainDivRef} onClose={handleMenuClose}>
						{" "}
						
					</HoverMenuMethods>

			        <Link onClick={handleMenuClose} to="/tutorials-viewer/localfile/README.ipynb">
						TUTORIALS
					</Link>

					<Link to={linkText} onClick={handleMapBounds} className="map">
						MAP
					</Link>
				</div>
			</nav>
		</div>
	);
}

export default BurgerMenu;
