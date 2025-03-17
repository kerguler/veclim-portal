import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../Switcher/Switcher.css";

import useDirectorFun from "customHooks/useDirectorFun";
import { useSelector } from "react-redux";
import { setGraphType } from "store";
import RenderedPanelV2 from "./RenderedPanelV2";
import { setChartParameters } from "store";
import { setDisplayedPanelID } from "store";
function SwithcerV2({ direction, panelClassName }) {
	const {
		dataArrivedRight,
		twinIndex,
		displayedPanelID,
		displayedIcons,
		directMap,
		directInit,
		mapVector,
		panelDataDir,
		setTwinIndexDir,
		setTwinArrayDir,
		setSwitcherDir,
		invalidateSimData,
	} = useDirectorFun(direction);
	const graphType = useSelector(
		(state) => state.fetcher.fetcherStates.graphType
	);
	const dispatch = useDispatch();
	const [panelChart, setPanelChart] = useState(null);
	const [panel, setPanel] = useState(null);

	useEffect(() => {
		let desiredPanel;
		const findDesiredPanel = (p) => {
			let desiredPanel = panelDataDir.filter((item) => {
				if (item.id === p) {
					return item;
				} else {
					return null;
				}
			});
			return desiredPanel;
		};

		if (directInit) {
			displayedIcons.forEach((p) => {
				if (p.id === directMap.display) {
					if (p.panelArray.length > 0) {
						if (p.panelArray.length > 1) {
							dispatch(setTwinArrayDir(p.panelArray.length));
							dispatch(setSwitcherDir(true));
						} else {
							dispatch(setSwitcherDir(false));
						}
						dispatch(setTwinIndexDir(0));
						setPanelChart(true);
						desiredPanel = findDesiredPanel(p.panelArray[twinIndex]);
						dispatch(setDisplayedPanelID({direction, value: p.id}));
						setPanel(desiredPanel[0].content);
						dispatch(setChartParameters({direction, value: desiredPanel[0].chartParameters}));
					} else {
						setPanelChart(false);
						desiredPanel = findDesiredPanel(displayedPanelID);
						setPanel(desiredPanel[0].content);
						dispatch(setDisplayedPanelID({direction, value: p.id}));
					}
				} else if (p.panelArray.includes(directMap.display)) {
					dispatch(setDisplayedPanelID({direction, value: p.id}));
					if (p.panelArray.length > 1) {
						dispatch(setTwinArrayDir(p.panelArray.length));
						dispatch(setTwinIndexDir(p.panelArray.indexOf(directMap.display)));
						dispatch(setSwitcherDir(true));
					} else {
						dispatch(setSwitcherDir(false));
					}

					setPanelChart(true);
					desiredPanel = findDesiredPanel(directMap.display);

					dispatch(setDisplayedPanelID({direction, value: p.id}));
					setPanel(desiredPanel[0].content);
					dispatch(setChartParameters({direction, value: desiredPanel[0].chartParameters}));
				}
			});
		} else {
			displayedIcons.forEach((p) => {
				if (p.id === displayedPanelID) {
					if (p.panelArray.length > 0) {
						if (p.panelArray.length > 1) {
							dispatch(setTwinArrayDir(p.panelArray.length));
							dispatch(setSwitcherDir(true));
						} else {
							dispatch(setSwitcherDir(false));
						}
						setPanelChart(true);
						desiredPanel = findDesiredPanel(p.panelArray[twinIndex]);
						setPanel(desiredPanel[0].content);
						dispatch(setChartParameters({direction, value: desiredPanel[0].chartParameters}));
					} else {
						setPanelChart(false);
						desiredPanel = panelDataDir.filter((item) => {
							if (item.id === displayedPanelID) {
								return item;
							} else {
								return null;
							}
						});
						setPanel(desiredPanel[0].content);
					}
				} else if (p.panelArray.includes(displayedPanelID)) {
					dispatch(setDisplayedPanelID({direction, value: p.id}));
					let currentPanel = p.panelArray[twinIndex];
					desiredPanel = findDesiredPanel(currentPanel);
					setPanel(desiredPanel[0].content);
					dispatch(setChartParameters({direction, value: desiredPanel[0].chartParameters}));
				}
			});
		}
	}, [
		invalidateSimData,
		dispatch,
		displayedIcons,
		displayedPanelID,
		panelDataDir,
		twinIndex,
		directInit,
		directMap.display,
		mapVector,
		setTwinIndexDir,
		setDisplayedPanelID,
		setChartParameters,
		setTwinArrayDir,
		setSwitcherDir,
	]);

	useEffect(() => {
		let result = [];

		panelDataDir.forEach((item) => {
			if (item.chartParameters?.twins) {
				item.chartParameters.twins.forEach((twin) => {
					if (twin.simulation === true) {
						result.push(twin.id);
					}
				});
			}
		});
		displayedIcons.forEach((icon) => {
			if (icon.id === displayedPanelID) {
				if (icon.panelArray.length > 0) {
					if (result.includes(icon.panelArray[twinIndex])) {
						// graphType === "ts" &&
						dispatch(setGraphType("sim"));
					} else {
						dispatch(setGraphType("ts"));
					}
				}
			}
		});
	}, [
		displayedIcons,
		displayedPanelID,
		twinIndex,
		dataArrivedRight,
		panelDataDir,
		dispatch,
	]);

	return (
		<RenderedPanelV2
			direction={direction}
			panelClassName={panelClassName}
			panel={panel}
			panelChart={panelChart}
		/>
	);
}

export default SwithcerV2;
