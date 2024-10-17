import { React } from "react";
import "../styles/MapPage.css";
import { useDispatch } from "react-redux";
import MapLeftMenu from "../components/MapLeftMenu/MapLeftMenu";
import MapLogo from "../components/MapLogo/MapLogo";
import {
	setDirectInitError,
} from "../store";
import { useEffect } from "react";

import { useState } from "react";
import { useContext } from "react";
import PanelContext from "context/panelsIcons";

import { useSelector } from "react-redux";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import useFetcherStates from "customHooks/useFetcherStates";
import GenericMapComponent from "components/map/MapComponent/GenericMapComponent";
function GenericMapPage() {
	useFetcherStates();

	const directInitError = useSelector(
		(state) => state.fetcher.fetcherStates.directInitError
	);
	const readyToView = useSelector(
		(state) => state.fetcher.fetcherStates.readyToView
	);
// const directInit=useSelector((state)=>state.fetcher.fetcherStates.directInit)
// 	useEffect(() => {
// 	}, [directInit]);
	return (
		readyToView && (
			<div className="wrappers-wrapper">
				{directInitError.isError && (
					<DirectInitError message={directInitError.message} />
				)}
				<MapLogo />
				<div className="map-wrapper">
					<MapLeftMenu></MapLeftMenu>
					<ErrorBoundary>
						<GenericMapComponent />
					</ErrorBoundary>
				</div>
			</div>
		)
	);
}

export default GenericMapPage;

const DirectInitError = ({ message }) => {
	const dispatch = useDispatch();
	const { panelData } = useContext(PanelContext);
	const [counter, setCounter] = useState(10);
	const tileArray = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);
	const errorInfo = useSelector(
		(state) => state.fetcher.fetcherStates.directInitError
	);
	const displayedPanelID = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMenu.displayedPanelID
	);

	useEffect(() => {
		setTimeout(() => {
			setCounter(counter - 1);
		}, 1000);
		if (counter === 0) {
			dispatch(setDirectInitError(false));
		}
	}, [dispatch, counter]);
	let tileNames = tileArray.map((item) => {
		return item + "  ";
	});
	let displayedIcon = panelData.filter((item) => item.id === displayedPanelID);
	return (
		<div className="direct-init-error">
			<h1>There was an Error with your request : {errorInfo.type}</h1>
			<br />
			<h2>{message.heading}</h2> <br />
			<p>{message.explanation}</p>
			<br />
			You are being redirected to {tileNames}, Panel to open is
			{displayedIcon[0].key}
			<br />
			<br />
			This message will self destruct if you dont... in {counter} seconds
		</div>
	);
};
