import "./MapLeftMenu.css";
import menuIcon from "assets/icons/map-page-right-menu/png/menu-32px.png";
import { useCallback, useEffect, useState } from "react";
import PanelContext from "context/panelsIcons";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPanelInterfere } from "store";
import { setPanelOpen, setMapMenuOpen } from "store";
import { useRef } from "react";
import classNames from "classnames";
import mapMenuService from "services/LeftMenuService";
import Switcher from "components/panel/Switcher/Switcher";
import { setTwinIndex } from "store";
import { setDirectInit } from "store";
import useArrangePanels from "customHooks/useArrangePanels";
import { setDirectMap } from "store";

function MapLeftMenu() {
	const panelInterfere = useSelector((state) => state.panel.panelInterfere);
	const panelOpenRef = useRef(0);
	const dispatch = useDispatch();
	const { panelData } = useContext(PanelContext);
	const [panel, setPanel] = useState(null);
	const [panelChart, setPanelChart] = useState(null);
	const [panelClassName, setPanelClassName] = useState("");
	const [shimmerOn, setShimmerOn] = useState(false);
	let className = classNames();
	if (shimmerOn) {
		className = classNames("icon", "shimmer-on");
	} else {
		className = classNames("icon", "shimmer-off");
	}

	const mapMenuOpen = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.mapMenuOpen
	);
	const displayedPanelID = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.displayedPanelID
	);
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const directInit = useSelector(
		(state) => state.fetcher.fetcherStates.directInit
	);
	const directMap = useSelector(
		(state) => state.fetcher.fetcherStates.directMap
	);
	useEffect(() => {
		if (mapMenuOpen) {
			setShimmerOn(false);
		} else {
			setShimmerOn(true);
		}
	}, [mapMenuOpen]);

	useEffect(() => {
		if (displayedPanelID === panelOpenRef.current && panelOpenRef.current) {
			setPanelClassName("no-anim");
		} else {
			setPanelClassName("");
		}
	}, [displayedPanelID]);
	
	useEffect(() => {
		if (directMap.display === -2) {
			directInit && dispatch(setPanelOpen(false));
			dispatch(setDirectInit(false));
		}
	}, [directMap.display, directInit, dispatch]);
	const displayedIcons = useSelector(
		(state) => state.graphSwitch.displayedIcons
	);
	const panelOpen = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.panelOpen
	);
	const handlePanel = useCallback(
		(id) => {
			if (displayedIcons.filter((item) => item.id === id).length === 1) {
				dispatch(setTwinIndex(0));
			}

			mapMenuService.handlePanel(
				id,
				vectorName,
				panelOpenRef,
				dispatch,
				panelData,
				panel,
				setPanel,
				setPanelChart,
				directInit,
				panelOpen
			);
			// directInit && dispatch(setDirectInit(false));
			// directMap.display &&
			// 	dispatch(setDirectMap({ ...directMap, display: null }));
		},
		[
			displayedIcons,
			directInit,
			directMap,
			dispatch,
			vectorName,
			panelData,
			panel,
			panelOpen,
		]
	);

	const { icons } = useArrangePanels(panelData, handlePanel, displayedPanelID);
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector
	);
	useEffect(() => {
		panelOpenRef.current = 0;
	}, [mapVector]);
	useEffect(() => {
		if (directInit) {
			directMap.display !== -2 && handlePanel(directMap.display);
			if (directMap.display === -2) {
				// dispatch(setMapMenuOpen(false));
				dispatch(setPanelOpen(false));
				dispatch(setDirectMap({ ...directMap, display: null }));
			}
			setPanelClassName("no-anim");
			dispatch(setDirectInit(false));
		}
		if (panelInterfere === -1) {
			dispatch(setMapMenuOpen(true));
			dispatch(setPanelOpen(true));
			handlePanel(panelInterfere);
			setPanelClassName("no-anim");
			dispatch(setPanelInterfere(null));
		}
	}, [panelInterfere, handlePanel, dispatch, directMap, directInit]);
	useEffect(() => {
		if (!mapMenuOpen) {
			setPanel(null);
			setPanelChart(null);
			dispatch(setPanelOpen(false));
		}
	}, [mapMenuOpen, dispatch]);

	const handleOpenMenu = () => {
		dispatch(setMapMenuOpen(!mapMenuOpen));
	};

	return (
		<div>
			<div className="icon-column">
				<div className={className} onClick={handleOpenMenu}>
					<img alt="menu icon" src={menuIcon} />
				</div>
				{mapMenuOpen && <div className="vertical-menu">{icons}</div>}
			</div>

			<Switcher
				panelClassName={panelClassName}
				panel={panel}
				panelChart={panelChart}
			/>
		</div>
	);
}

export default MapLeftMenu;
