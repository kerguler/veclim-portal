import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
	setSwitchMap,
	setVectorName,
	setTileArray,
	setMapPagePosition,
	setCurrentMapCenter,
	setCurrentMapZoom,
	setDisplayedPanelID,
	setPanelOpen,
	setPageTransition,
} from "../../../store";
import tileIconMoz from "assets/icons/map-page-right-menu/png/adult-32px.png";
import tileIconFly from "assets/icons/map-page-right-menu/png/mosquito-3-32px.png";
import useWindowSize from "customHooks/useWindowSize";
import MapAdjustmentsService from "../../charts/services/MapAdjustmentsService";
import { Link } from "react-router-dom";
import "./ChangeMapPanel.css";
function ChangeMapPanel() {
	const dispatch = useDispatch();
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const vectorNames = useSelector((state) => state.vector.vectorNames);
	const tileIcons = {
		albopictus: tileIconMoz,
		papatasi: tileIconFly,
	};
	const descr = {
		albopictus: (
			<p>
				The model of the Asian tiger mosquito (<i>Ae. albopictus</i>) and
				disease (CHIKV/DENV/ZIKV) transmission
			</p>
		),
		papatasi: (
			<>
				<p>
					The model of sand flies (<i>Ph. papatasi</i>) in Cyprus
				</p>
			</>
		),
	};
	const handleChangeTile = (desiredVector) => {
		MapAdjustmentsService.handleMapSwitch(dispatch, vectorName, desiredVector);
		dispatch(setPageTransition(false));
	};

	const listVectors = vectorNames.map((vec, index) => {
		const active =
			"panel-content icons-area " +
			["inactive", "active"][Number(vec === vectorName)];
		let linkText;
		if (vec === "albopictus") {
			linkText = "/MapPage";
		} else {
			linkText = "/MapPage?session=papatasi";
		}
		return (
			<div key={index} className="description-row">
				<div key={"A" + index}>
					<Link
						to={linkText}
						onClick={() => {
							handleChangeTile(vec);
						}}
						className={active}
					>
						<img alt="albopictus-icon" src={tileIcons[vec]}></img>
					</Link>
				</div>
				<div key={"B" + index}>{descr[vec]}</div>
			</div>
		);
	});

	return (
		<div className="text-area">
			<h1>Model Repository</h1>
			<div className="map-descriptions-wrapper">{listVectors}</div>
		</div>
	);
}

export default ChangeMapPanel;
