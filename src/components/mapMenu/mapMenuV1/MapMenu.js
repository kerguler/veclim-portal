import "./mapMenu.css";
import menuIcon from "assets/icons/map-page-right-menu/png/menu-32px.png";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import classNames from "classnames";
import mapMenuService from "services/MapMenuService";
import Switcher from "components/panel/Switcher/Switcher";
import useArrangePanels from "customHooks/useArrangePanels";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import useDirectorFun from "customHooks/useDirectorFun";
import { AlboDataProvider } from "context/AlboDataContext";
import { setPanelOpen } from "store";
import { setPanelInterfere } from "store";
import { setDisplayedPanelID } from "store";
import { setChartParameters } from "store";
import { setDirectMap } from "store";
import { setMapMenuOpen } from "store";
function MapMenu({ direction }) {
	const {
		mapMenuOpen,
		displayedPanelID,
		directInit,
		mapVector,
		displayedIcons,
		panelOpen,
		panelDataDir,
		directMap,
		setTwinIndexDir,
		panelInterfere,
		
		vectorName,
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
			directInit && dispatch(setPanelOpen({direction, value: false}));
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
				setDisplayedPanelID,
				setPanelOpen,
				setChartParameters,
				panelInterfere,direction
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
				dispatch(setPanelOpen({direction, value: false}));
				dispatch(setDirectMap({directoin, value: { ...directMap, display: null }}));
			}
			setPanelClassName("no-anim");
			dispatch(setDirectInitDir(false));
		}
		if (panelInterfere === -1) {
			dispatch(setMapMenuOpen({direction,value:true}));
			dispatch(setPanelOpen({direction,value:true}));
			handlePanel(panelInterfere);
			setPanelClassName("no-anim");
			dispatch(setPanelInterfere({direction,value:null}));
		}
	}, [panelInterfere, handlePanel, dispatch, directMap, directInit]);
	useEffect(() => {
		if (!mapMenuOpen) {
			setPanel(null);
			setPanelChart(null);
			dispatch(setPanelOpen({direction,value:false}));
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
