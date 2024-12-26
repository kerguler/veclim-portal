import Panel from "./Panel";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { setPanelTop } from "store";
import "./Switcher/Switcher.css";
import useDirectorFun from "customHooks/useDirectorFun";
import usePanelResize from "./usePanelResize";
import RenderedPanelChart from "./RenderedPanelChart";
const RenderedPanel = ({ panel, panelChart, panelClassName, direction }) => {
	const dispatch = useDispatch();
	const { panelOpen, setPanelOpenDir } = useDirectorFun(direction);
	const panelRef = useRef(null);


	usePanelResize({ panelRef, direction, setPanelTop });

	const handlePanelClosed = (value) => {
		dispatch(setPanelOpenDir(false));
	};

	return (
		<span className={`panel-restrictive-wrapper ${direction}`}>
			{panelOpen && (
				<div ref={panelRef}>
					<Panel
						direction={direction}
						className={panelClassName}
						onClosed={() => handlePanelClosed(true)}
					>
						<div className="panel-content" style={{ userSelect: "none" }}>
							{panel}
							{panelChart && <RenderedPanelChart direction={direction} />}
						</div>{" "}
					</Panel>
				</div>
			)}
		</span>
	);
};


export default RenderedPanel;