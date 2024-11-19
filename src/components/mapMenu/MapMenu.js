import "./mapMenu.css";
import menuIcon from "assets/icons/map-page-right-menu/png/menu-32px.png";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import classNames from "classnames";
import mapMenuService from "services/MapMenuService";
import Switcher from "components/panel/Switcher/Switcher";
import useArrangePanels from "customHooks/useArrangePanels";
import useDirectorFun from "customHooks/useDirectorFun";
function MapMenu({ direction }) {
	console.log("MAPMANU");
	const {
		setMapMenuOpenDir,
		mapMenuOpen,
		displayedPanelID,
		directInit,
		mapVector,
		displayedIcons,
		panelOpen,
		panelDataDir,
		directMap,
		setPanelOpenDir,
		setDirectInitDir,
		setDirectMapDir,
		setTwinIndexDir,
		setDisplayedPanelIDDir,
		panelInterfere,
		setChartParametersDir,
		vectorName,
		setPanelInterfereDir,
	} = useDirectorFun(direction);
	const panelOpenRef = useRef(0);
	const dispatch = useDispatch();
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
			directInit && dispatch(setPanelOpenDir(false));
			dispatch(setDirectInitDir(false));
		}
	}, [directMap.display, directInit, dispatch]);

	const handlePanel = useCallback(
		(id) => {
			if (displayedIcons.filter((item) => item.id === id).length === 1) {
				dispatch(setTwinIndexDir(0));
			}

			mapMenuService.handlePanel(
				id,
				vectorName,
				panelOpenRef,
				dispatch,
				panelDataDir,
				panel,
				setPanel,
				setPanelChart,
				directInit,
				panelOpen,
				setDisplayedPanelIDDir,
				setPanelOpenDir,
				setChartParametersDir,
				panelInterfere
			);
			// directInit && dispatch(setDirectInitDir(false));
			// directMap.display &&
			// 	dispatch(setDirectMapDir({ ...directMap, display: null }));
		},
		[
			displayedIcons,
			directInit,
			directMap,
			vectorName,
			dispatch,
			panelDataDir,
			panel,
			panelOpen,
		]
	);

	const { icons } = useArrangePanels(handlePanel, direction);

	useEffect(() => {
		panelOpenRef.current = 0;
	}, [mapVector]);
	useEffect(() => {
		if (directInit) {
			directMap.display !== -2 && handlePanel(directMap.display);
			if (directMap.display === -2) {
				// dispatch(setMapMenuOpenDir(false));
				dispatch(setPanelOpenDir(false));
				dispatch(setDirectMapDir({ ...directMap, display: null }));
			}
			setPanelClassName("no-anim");
			dispatch(setDirectInitDir(false));
		}
		if (panelInterfere === -1) {
			dispatch(setMapMenuOpenDir(true));
			dispatch(setPanelOpenDir(true));
			handlePanel(panelInterfere);
			setPanelClassName("no-anim");
			dispatch(setPanelInterfereDir(null));
		}
	}, [panelInterfere, handlePanel, dispatch, directMap, directInit]);
	useEffect(() => {
		if (!mapMenuOpen) {
			setPanel(null);
			setPanelChart(null);
			dispatch(setPanelOpenDir(false));
		}
	}, [mapMenuOpen, dispatch]);

	const handleOpenMenu = () => {
		dispatch(setMapMenuOpenDir(!mapMenuOpen));
	};

	return (
		<div>
			<div className={`icon-column ${direction}`}>
				<div className={className} onClick={handleOpenMenu}>
					<img alt="menu icon" src={menuIcon} />
				</div>
				{mapMenuOpen && <div className="vertical-menu">{icons}</div>}
			</div>

			<Switcher
				direction={direction}
				panelClassName={panelClassName}
				panel={panel}
				panelChart={panelChart}
			/>
		</div>
	);
}

export default MapMenu;
