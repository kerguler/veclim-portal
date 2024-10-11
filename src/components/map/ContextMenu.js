import classNames from "classnames";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTileArray, setVectorName } from "../../store";
const ContextMenu = ({ children, className, backgroundColor, onClick }) => {
	require("../../styles/contextMenu.css");
	const dispatch = useDispatch();
	const handleClick = () => {
		onClick();
		// console.log("we have set papatasi");
		dispatch(setVectorName("papatasi"));
		dispatch(setTileArray(["papatasi_aprdec"]));
	};
	const classNameInternal = className ? className : "down";

	const directionPadCN = classNames("context-menu-wrapper", classNameInternal);
	return (
		<div className={directionPadCN}>
			<div
				id="icon"
				onClick={handleClick}
				className={`${directionPadCN} context-row ${
					backgroundColor && backgroundColor
				}`}>
				<Link to="MapPage" onClick={handleClick}>
					{" "}
					{children}
				</Link>
			</div>
		</div>
	);
};

export default ContextMenu;
