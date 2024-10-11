import useWindowSize from "customHooks/useWindowSize";
import MobileNav from "./MobileNav/MobileNav";
import MyNavbar from "./DesktopNav/MyNavbar";
import React from "react";
function NavBarContainer() {
	const {webApp} = useWindowSize();
	let displayedNavbar = webApp ? <MobileNav /> : <MyNavbar />;
	return displayedNavbar;
}

export default NavBarContainer;
