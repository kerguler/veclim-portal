import Panel from "../Panel";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { setPanelTop } from "store";
import "components/panel/Switcher/Switcher.css";
import useDirectorFun from "customHooks/useDirectorFun";
import usePanelResize from "../usePanelResize";
import RenderedPanelChartV2 from "./RenderedPanelChartV2";
import { useEffect } from "react";
import { useState } from "react";
import { setOpenItems } from "store";
import { setPanelLevel } from "store";
const RenderedPanelV2 = ({
	panel,
	panelChart,
	panelClassName,
	direction,
	siblingCount,level,passedKey
}) => {
	const dispatch = useDispatch();
	const { panelOpen, setPanelOpenDir,openItems,panelLevelLeft:levelData } = useDirectorFun(direction);
	const panelRef = useRef(null);
	usePanelResize({ panelRef, direction, setPanelTop });

	const handlePanelClosed = (value) => {
		let openItemsTemp={...openItems}

		
		delete openItemsTemp[passedKey.parent]
		console.log({passedKey,openItemsTemp})
		dispatch(setOpenItems(openItemsTemp));
		dispatch(setPanelLevel({...levelData, level: Object.keys(openItemsTemp).length}));

	};
	

	return (
		<span  className={`panel-restrictive-wrapper ${direction}`} >
			
			<div ref={panelRef} >
				<Panel
					direction={direction}
					className={panelClassName}
					onClosed={(key) => handlePanelClosed(key)}
				>
					<div className="panel-content" style={{ userSelect: "none" }}>
						{panel}
						{panelChart && (
							<RenderedPanelChartV2
								siblingCount={siblingCount}
								direction={direction}
							/>
						)}
					</div>{" "}
				</Panel>
			</div>
			)
		</span>
	);
};

export default RenderedPanelV2;
