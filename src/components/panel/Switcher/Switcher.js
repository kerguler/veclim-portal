import React, { useRef, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelContext from "context/panelsIcons";
import "./Switcher.css";
import RenderedPanel from "../RenderedPanel";
import { setTwinArray } from "store";
import { setChartParameters } from "store";
import { setSwitcher } from "store";
import { setTwinIndex } from "store";
import updateNestedState from "services/updateNestedState";
import { setDisplayedPanelID } from "store";
import { setPanelOpen } from "store";
import { setDirectInit } from "store";

function Swithcer({ panelClassName }) {
	const { panelData } = useContext(PanelContext);
	const twinIndex = useSelector((state) => state.graphSwitch.twinIndex);
	const displayedPanelID = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.displayedPanelID
	);

	const dispatch = useDispatch();

	const displayedIcons = useSelector(
		(state) => state.graphSwitch.displayedIcons
	);
	const [panelChart, setPanelChart] = useState(null);
	const [panel, setPanel] = useState(null);
	const directMap = useSelector(
		(state) => state.fetcher.fetcherStates.directMap
	);
	const directInit = useSelector(
		(state) => state.fetcher.fetcherStates.directInit
	);
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector
	);
	useEffect(() => {
		let desiredPanel;
		if (directInit) {
			displayedIcons.forEach((p) => {
				if (p.id === directMap.display) {
					if (p.panelArray.length > 0) {
						if (p.panelArray.length > 1) {
							dispatch(setTwinArray(p.panelArray.length));
							dispatch(setSwitcher(true));
						} else {
							dispatch(setSwitcher(false));
						}
						dispatch(setTwinIndex(0));
						setPanelChart(true);
						desiredPanel = panelData.filter((item) => {
							if (item.id === p.panelArray[twinIndex]) {
								return item;
							} else {
								return null;
							}
						});
						dispatch(setDisplayedPanelID(p.id));
						setPanel(desiredPanel[0].content);
						dispatch(setChartParameters(desiredPanel[0].chartParameters));
					} else {
						setPanelChart(false);
						desiredPanel = panelData.filter((item) => {
							if (item.id === displayedPanelID) {
								return item;
							} else {
								return null;
							}
						});

						setPanel(desiredPanel[0].content);
						dispatch(setDisplayedPanelID(p.id));
					}
				} else if (p.panelArray.includes(directMap.display)) {
					dispatch(setDisplayedPanelID(p.id));
					if (p.panelArray.length > 1) {
						dispatch(setTwinArray(p.panelArray.length));
						dispatch(setTwinIndex(p.panelArray.indexOf(directMap.display)));
						dispatch(setSwitcher(true));
					} else {
						dispatch(setSwitcher(false));
					}

					setPanelChart(true);
					desiredPanel = panelData.filter((item) => {
						if (item.id === directMap.display) {
							return item;
						} else {
							return null;
						}
					});
					dispatch(setDisplayedPanelID(p.id));
					setPanel(desiredPanel[0].content);
					dispatch(setChartParameters(desiredPanel[0].chartParameters));
				}
			});
		} else {
			displayedIcons.forEach((p) => {
				if (p.id === displayedPanelID) {
					if (p.panelArray.length > 0) {
						if (p.panelArray.length > 1) {
							dispatch(setTwinArray(p.panelArray.length));
							dispatch(setSwitcher(true));
						} else {
							dispatch(setSwitcher(false));
						}
						setPanelChart(true);
						desiredPanel = panelData.filter((item) => {
							if (item.id === p.panelArray[twinIndex]) {
								return item;
							} else {
								return null;
							}
						});
						setPanel(desiredPanel[0].content);
						dispatch(setChartParameters(desiredPanel[0].chartParameters));
					} else {
						setPanelChart(false);
						desiredPanel = panelData.filter((item) => {
							if (item.id === displayedPanelID) {
								return item;
							} else {
								return null;
							}
						});
						setPanel(desiredPanel[0].content);
					}
				} else if (p.panelArray.includes(displayedPanelID)) {
					dispatch(setDisplayedPanelID(p.id));
					let currentPanel = p.panelArray[twinIndex];
					desiredPanel = panelData.filter((item) => {
						if (item.id === currentPanel) {
							return item;
						} else {
							return null;
						}
					});
					setPanel(desiredPanel[0].content);
					dispatch(setChartParameters(desiredPanel[0].chartParameters));
				}
			});
		}
	}, [
		dispatch,
		displayedIcons,
		displayedPanelID,
		panelData,
		twinIndex,
		directInit,
		directMap.display,
		mapVector,
	]);

	return (
		<RenderedPanel
			panelClassName={panelClassName}
			panel={panel}
			panelChart={panelChart}
		/>
	);
}

export default Swithcer;
