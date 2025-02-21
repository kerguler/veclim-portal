import "./Panel.css";
import closeIcon from "assets/icons/flip2-close-white.jpg";
import classNames from "classnames";
import useDirectorFun from "customHooks/useDirectorFun";
import { useDispatch } from "react-redux";
function Panel({ onClosed, children, className, direction }) {
	const dispatch = useDispatch();
	const {
		panelOpen,
		setPanelOpenDir,
		interferePanelStyleRight: interferePanelStyle,
	} = useDirectorFun(direction);
	const handleClick = () => {
		onClosed();
		dispatch(setPanelOpenDir(!panelOpen));
	};
console.log({interferePanelStyle})
	const outerClassNames = classNames("panel-container", className);
	return (
		<div className={outerClassNames} style={interferePanelStyle}>
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
