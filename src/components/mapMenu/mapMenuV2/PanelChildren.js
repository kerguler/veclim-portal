import RenderedPanelV2 from "components/panel/SwitcherV2/RenderedPanelV2";
import useDirectorFun from "customHooks/useDirectorFun";
import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { setPlotReadyLeft } from "store";
import { setTwinArray } from "store";
import { setGraphType } from "store";
function PanelChildren({ displayedItem,level }) {
	const dispatch = useDispatch();
	const {
		openItems,
		panelDataDir: panelData,
		dataArrivedRight,
		dataArrivedLeft,
		menuStructure,
		twinIndex,
		setTwinIndexDir: setTwinIndex,
		setChartParametersDir: setChartParameters,
	} = useDirectorFun("left");

	const panelChildren = menuStructure.filter((child) => {
		if (child.parent === displayedItem.key) {
			const desiredPanel = panelData.filter(
				(panel) => panel.key === child.key
			)[0];
			if (desiredPanel.simulation && !dataArrivedRight) {
			} else if (desiredPanel.simulation && dataArrivedRight) {
				return child;
			} else {
				return child;
			}
		}
	});



	useEffect(() => {
		if (panelChildren && panelChildren[twinIndex]) {
			if (
				panelData.filter(
					(panel) => panel.key === panelChildren[twinIndex].key
				)[0].simulation
			) {
				dispatch(setGraphType("sim"));
				
			} else {
				dispatch(setGraphType("ts"));
			}
		}
	}, [dispatch, panelChildren, panelData, twinIndex]);

	const siblingCount = panelChildren.length;

	const displayedPanel = panelChildren && panelChildren[twinIndex];
	const displayedPanelDetails = panelData.filter(
		(panel) => panel.key === displayedPanel.key
	)[0];
	const { content, chartParameters } = displayedPanelDetails;
	useEffect(() => {
		dispatch(setChartParameters(chartParameters));
	}, [displayedPanelDetails]);

	return (
		<RenderedPanelV2 
			
			siblingCount={siblingCount}
			direction="left"
			panelClassName={null}
			panel={content}
			level={level}
			passedKey={panelChildren[twinIndex]}
			panelChart={
				chartParameters && Object.keys(chartParameters).length > 0
					? true
					: false
			}
		/>
	);
}

export default PanelChildren;
