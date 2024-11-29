import { Link } from "react-router-dom";
import veclimLogo from "assets/images/logos/VEClim-Icon.svg";
import "./mapLogo.css";
import { useDispatch } from "react-redux";
import { setDisplayedPanelIDLeft } from "store";
function MapLogo() {
	const dispatch = useDispatch();
	const handleMainPageTransition = () => {
		dispatch(setDisplayedPanelIDLeft(null));
		// dispatch(setMapVector(vectorName));
	};

	return (
		<div className="map-logo-wrapper">
			<Link onClick={handleMainPageTransition} to="/">
				<div className="image-container">
					<img src={veclimLogo} alt="transparent logo"></img>
				</div>
			</Link>
		</div>
	);
}

export default MapLogo;
