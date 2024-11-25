import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Switcher.css";
import RenderedPanel from "../RenderedPanel";

import useDirectorFun from "customHooks/useDirectorFun";

function Swithcer({ direction, panelClassName }) {
	const {
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
		setDisplayedPanelIDDir,
		setChartParametersDir,
	} = useDirectorFun(direction);

	const dispatch = useDispatch();

	const [panelChart, setPanelChart] = useState(null);
	const [panel, setPanel] = useState(null);

	useEffect(() => {
		let desiredPanel;

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
						desiredPanel = panelDataDir.filter((item) => {
							if (item.id === p.panelArray[twinIndex]) {
								return item;
							} else {
								return null;
							}
						});
						dispatch(setDisplayedPanelIDDir(p.id));
						setPanel(desiredPanel[0].content);
						dispatch(setChartParametersDir(desiredPanel[0].chartParameters));
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
						dispatch(setDisplayedPanelIDDir(p.id));
					}
				} else if (p.panelArray.includes(directMap.display)) {
					dispatch(setDisplayedPanelIDDir(p.id));
					if (p.panelArray.length > 1) {
						dispatch(setTwinArrayDir(p.panelArray.length));
						dispatch(setTwinIndexDir(p.panelArray.indexOf(directMap.display)));
						dispatch(setSwitcherDir(true));
					} else {
						dispatch(setSwitcherDir(false));
					}

					setPanelChart(true);
					desiredPanel = panelDataDir.filter((item) => {
						if (item.id === directMap.display) {
							return item;
						} else {
							return null;
						}
					});
					dispatch(setDisplayedPanelIDDir(p.id));
					setPanel(desiredPanel[0].content);
					dispatch(setChartParametersDir(desiredPanel[0].chartParameters));
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
						desiredPanel = panelDataDir.filter((item) => {
							if (item.id === p.panelArray[twinIndex]) {
								return item;
							} else {
								return null;
							}
						});
						setPanel(desiredPanel[0].content);
						dispatch(setChartParametersDir(desiredPanel[0].chartParameters));
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
					dispatch(setDisplayedPanelIDDir(p.id));
					let currentPanel = p.panelArray[twinIndex];
					desiredPanel = panelDataDir.filter((item) => {
						if (item.id === currentPanel) {
							return item;
						} else {
							return null;
						}
					});
					setPanel(desiredPanel[0].content);
					dispatch(setChartParametersDir(desiredPanel[0].chartParameters));
				}
			});
		}
	}, [
		dispatch,
		displayedIcons,
		displayedPanelID,
		panelDataDir,
		twinIndex,
		directInit,
		directMap.display,
		mapVector,
		
	]);
	return (
		<RenderedPanel
			direction={direction}
			panelClassName={panelClassName}
			panel={panel}
			panelChart={panelChart}
		/>
	);
}

export default Swithcer;
