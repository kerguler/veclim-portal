import "./Panel.css";
import closeIcon from "assets/icons/flip2-close-white.jpg";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setPanelOpen } from "store";
function Panel({ onClosed, children, className }) {
	const dispatch = useDispatch();
	const panelOpen = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.panelOpen
	);
	const handleClick = () => {
		onClosed();
		dispatch(setPanelOpen(!panelOpen));
	};

	const outerClassNames = classNames("panel-container", className);
	return (
		<div className={outerClassNames}>
			<div className="panel-inner-box">
				<div className="panel-close-button" onClick={handleClick}>
					<img alt="close-button" src={closeIcon} />
				</div>
				{children}
			</div>
		</div>
	);
}

export default Panel;
