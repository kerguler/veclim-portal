import CircularProgress from "@mui/material/CircularProgress";
import "./MapCircularProgressBar.css";
import { useSelector } from "react-redux";
function MapCircularProgressBar() {
	const tileArray = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);
	const rightMapLoaded = useSelector(
		(state) => state.fetcher.fetcherStates.map.rightMapLoaded
	);
	const mapLoaded = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapLoaded
	);
	const leftMapLoaded = useSelector(
		(state) => state.fetcher.fetcherStates.map.leftMapLoaded
	);


	let left = tileArray.length === 2 && !leftMapLoaded ? true : false;
	let right = tileArray.length === 2 && !rightMapLoaded ? true : false;
	let single = tileArray.length === 1 && !mapLoaded ? true : false;

	const centralCircularProgress = (
		<div className="circular-progressbar wrapper single">
			<CircularProgress size={100} />
			<div className="circular-progressbar text">
				{" "}
				<p>we are loading the tiles...</p>
			</div>
		</div>
	);
	const leftCircularProgress = (
		<div className="circular-progressbar wrapper left">
			<CircularProgress size={100} />
			<div className="circular-progressbar text">
				{" "}
				<p>we are loading the tiles...</p>
			</div>
		</div>
	);
	const rightCircularProgress = (
		<div className="circular-progressbar wrapper right">
			<CircularProgress size={100} />
			<div className="circular-progressbar text">
				{" "}
				<p>we are loading the tiles...</p>
			</div>
		</div>
	);
	return (
		<div className="circular-progressbar">
			{single && centralCircularProgress}
			{left && leftCircularProgress}
			{right && rightCircularProgress}
		</div>
	);
}

export default MapCircularProgressBar;
