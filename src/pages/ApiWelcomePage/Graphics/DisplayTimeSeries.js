import UnifiedRechartPlotter from "components/charts/Plotter/UnifiedRechartPlotter";
import { useDispatch, useSelector } from "react-redux";
import { setChartParameters } from "store";
import { setVectorName } from "store";
import { setMapPagePosition } from "store";
import "./DisplayTimeSeries.css";
import { useRef } from "react";
import { setTimeSeriesDates } from "store";
import { setTileArray } from "store";
import { setCurrentMapZoom } from "store";
import { setCurrentMapBounds } from "store";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { setBlinkers } from "store";
function DisplayTimeSeries() {
	const dispatch = useDispatch();

	const timeSeriesDates = useSelector(
		(state) => state.dashboard.timeSeriesDates
	);
	const dateRange = {
		date0: timeSeriesDates.date0,
		date1: timeSeriesDates.date1,
		position: { lat: 22.0, lng: 32.2 },
		vectorName: "albopictus",
	};
	console.log({ timeSeriesDates });
	const chartRef = useRef({
		chartType: "rechart",
		initialSetting: "meteo-ts",
		years: "2010-2019",
		date0: timeSeriesDates.date0,
		date1: timeSeriesDates.date1,
		plottedKeys: ["atemp", "rehum", "precp"],
		colors: ["#F15A48", "#50C0AD", "#1B3958"],
		horizontalAxis: "date",
		labels: ["Temperature (°C)", "Rel. humidity (%)", "Precipitation (mm)"],
		lineSlice: [],
	});
	let chartParameters = chartRef.current;
	dispatch(setChartParameters(chartParameters));

	chartParameters.date0 = timeSeriesDates.date0;
	chartParameters.date1 = timeSeriesDates.date1;

	dispatch(setVectorName("albopictus"));
	dispatch(setMapPagePosition(dateRange.position));

	const handleChangeDate = (e, startEndDate) => {
		console.log({ date: e.target.value });
		if (startEndDate === 1) {
			dispatch(
				setTimeSeriesDates({ ...timeSeriesDates, date0: e.target.value })
			);
		} else {
			dispatch(
				setTimeSeriesDates({ ...timeSeriesDates, date1: e.target.value })
			);
		}
	};
	const blinkers = useSelector((state) => state.dashboard.blinkers);
	const handleProceedToCoordinates = () => {
		dispatch(
			setBlinkers({
				...blinkers,
				displayMap: true,
				disableDate0: true,
				disableDate1: true,
				displayProceed: false,
			})
		);
		dispatch(setTileArray([]));
		dispatch(setCurrentMapZoom(1));
		dispatch(setCurrentMapBounds(PackageMapServices.worldBounds));
	};
	return (
		<div className="dashboard ">
			<div className="title-simulations">
				{" "}
				<h3>Fetch Time Series With dates</h3>
			</div>

			<div className="flex-row ">
				<div className="flex-column">
					<p className="meteo-text"> Start</p>
					<input
						type="date"
						placeholder="date1"
						value={timeSeriesDates.date0}
						onChange={(e) => handleChangeDate(e, 1)}
						disabled={blinkers.disableDate0}
					/>
				</div>
				<div className="flex-column">
					<p className="meteo-text"> End</p>
					<input
						type="date"
						placeholder="date2"
						value={timeSeriesDates.date1}
						onChange={(e) => handleChangeDate(e, 2)}
						disabled={blinkers.disableDate1}
					/>
				</div>
				{/* <button onClick={handleSubmitDates} className=" date-submit border-r5 ">
					{" "}
					GO
				</button> */}
			</div>
			<div className="chart-area">
				{" "}
				<UnifiedRechartPlotter dateArray={dateRange} />{" "}
			</div>
			{blinkers.displayProceed && (
				<div className="flex-row center-v center-rh">
					{" "}
					<button
						onClick={handleProceedToCoordinates}
						className="button login-submit-button secondary1"
					>
						{" "}
						Proceed{" "}
					</button>
				</div>
			)}
		</div>
	);
}
export default DisplayTimeSeries;
