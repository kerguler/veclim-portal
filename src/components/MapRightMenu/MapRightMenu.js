import "./MapRightMenu.css";
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
import mapMenuService from "services/MapMenuService";
import Switcher from "components/panel/Switcher/Switcher";
import { setTwinIndex } from "store";
import { setDirectInit } from "store";
import useArrangePanels from "customHooks/useArrangePanels";
import { setDirectMap } from "store";
import { setRightPanelOpen } from "store";
import { setRightMapMenuOpen } from "store";
import { setDirectInitRight } from "store";
import { setTwinIndexRight } from "store";

function MapRightMenu() {
	const panelOpenRef = useRef(0);
	const { parPickerPanelData } = useContext(PanelContext);
	const dispatch = useDispatch();
	const [rightPanel, setRightPanel] = useState(null);
	const [rightPanelChart, setRightPanelChart] = useState(null);
	const [panelClassName, setPanelClassName] = useState("");
	const [shimmerOn, setShimmerOn] = useState(false);
	let className = classNames();

	if (shimmerOn) {
		className = classNames("icon", "shimmer-on");
	} else {
		className = classNames("icon", "shimmer-off");
	}

	const rightMapMenuOpen = useSelector(
		(state) => state.fetcher.fetcherStates.map.rightMenu.mapMenuOpen
	);

	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const directInitRight = useSelector(
		(state) => state.fetcher.fetcherStates.directInitRight
	);
	const directMap = useSelector(
		(state) => state.fetcher.fetcherStates.directMap
	);

	const rightDisplayedPanelID = useSelector(
		(state) => state.fetcher.fetcherStates.map.rightMenu.displayedPanelID
	);

	useEffect(() => {
		if (
			rightDisplayedPanelID === panelOpenRef.current &&
			panelOpenRef.current
		) {
			setPanelClassName("no-anim");
		} else {
			setPanelClassName("");
		}
	}, [rightDisplayedPanelID]);

	useEffect(() => {
		if (directMap.displayRight === -2) {
			directInitRight && dispatch(setRightPanelOpen(false));
			dispatch(setDirectInitRight(false));
		}
	}, [directMap.displayRight, directInitRight, dispatch]);

	const displayedIconsRight = useSelector(
		(state) => state.graphSwitch.displayedIconsRight
	);
	const panelOpenRight = useSelector(
		(state) => state.fetcher.fetcherStates.map.rightMenu.panelOpen
	);
	const handlePanel = useCallback(
		(id) => {
			if (displayedIconsRight.filter((item) => item.id === id).length === 1) {
				dispatch(setTwinIndexRight(0));
			}
			mapMenuService.handlePanel(
				id,
				vectorName,
				panelOpenRef,
				dispatch,
				parPickerPanelData,
				rightPanel,
				setRightPanel,
				setRightPanelChart,
				directInitRight,
				panelOpenRight,
				"right"
			);
			// directInit && dispatch(setDirectInit(false));
			// directMap.display &&
			// 	dispatch(setDirectMap({ ...directMap, display: null }));
		},
		[
			displayedIconsRight,
			directInitRight,
			directMap,
			dispatch,
			vectorName,
			parPickerPanelData,
			rightPanel,
			panelOpenRight,
		]
	);
	const { icons } = useArrangePanels(
		parPickerPanelData,
		handlePanel,
		rightDisplayedPanelID
	);
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector
	);
	useEffect(() => {
		panelOpenRef.current = 0;
	}, [mapVector]);
	useEffect(() => {
		if (directInitRight) {
			directMap.displayRight !== -2 && handlePanel(directMap.displayRight);
			if (directMap.displayRight === -2) {
				// dispatch(setMapMenuOpen(false));
				dispatch(setRightPanelOpen(false));
				dispatch(setDirectMap({ ...directMap, displayRight: null }));
			}
			setPanelClassName("no-anim");
			dispatch(setDirectInitRight(false));
		}
	}, [handlePanel, dispatch, directMap, directInitRight]);
	useEffect(() => {
		if (!rightMapMenuOpen) {
			setRightPanel(null);
			setRightPanelChart(null);
			dispatch(setPanelOpen(false));
		}
	}, [rightMapMenuOpen, dispatch]);
	useEffect(() => {
		if (!rightMapMenuOpen) {
			setRightPanel(null);
			setRightPanelChart(null);
			dispatch(setRightPanelOpen(false));
		}
	}, [rightMapMenuOpen, dispatch]);
	const handleOpenMenu = (side) => {
		dispatch(setRightMapMenuOpen(!rightMapMenuOpen));
	};

	return (
		<div>
			<div className="icon-column right">
				<div className={className} onClick={() => handleOpenMenu("right")}>
					<img alt="menu icon" src={menuIcon} />
				</div>
				{rightMapMenuOpen && <div className="vertical-menu">{icons}</div>}
			</div>

			<Switcher
				direction="right"
				panelClassName={panelClassName}
				panel={rightPanel}
				panelChart={rightPanelChart}
			/>
		</div>
	);
}

export default MapRightMenu;
