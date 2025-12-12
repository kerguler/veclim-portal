import ContextMenu from "../map/ContextMenu";
import "../../styles/vectorSelection/vectorSelectionContextMenu.css";
import sandfly from "../../assets/icons/map-page-right-menu/png/mosquito-3-32px.png";
import { useDispatch } from "react-redux";
function VectorSelectionContextMenu({ onClick }) {
	const dispatch = useDispatch();
	// const handleClickOnAlbopictus = () => {
	// 	dispatch(setVectorName("albopictus"));
	// 	dispatch(setTileArray(["colegg"]));
	// };
	const handleClick = () => {
		onClick();
	};

	return (
		<ContextMenu onClick={handleClick} className="down" backgroundColor="dark">
				<img  className="context-icon" alt="papatasi-icon" src={sandfly} />
		</ContextMenu>
	);
}

export default VectorSelectionContextMenu;
