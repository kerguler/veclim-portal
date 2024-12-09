import useDirectorFun from "customHooks/useDirectorFun";
import { useFetchTimeSeriesDataQuery } from "store";
import { useEffect, useRef } from "react";
import ChartCalculatorService from "../services/ChartCalculatorService";
import { useDispatch } from "react-redux";
import { useState } from "react";
import RechartsPlot from "./RechartsPlot";

import useSetDefaultCoordinates from "./useSetDefaultCoordinates";
import ErrorComponent from "./errorComponent/ErrorComponent";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import ChartLoadingSkeleton from "components/skeleton/Skeleton";
function TsRequest() {
	const dispatch = useDispatch();

	const rawData = useRef({
		rawDataToPlot: {},
		data: null,
		dataToPlot: null,
	});
	let r = rawData.current;
	const {
		mapPagePosition,
		vectorName,
		dateArray,
		setPlotReadyDir,
		chartParameters,
		plotReady,
		setBrushRangeDir,
	} = useDirectorFun("left");

	const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePosition),
		vectorName,
		dateArray,
	});

	useEffect(() => {
		dispatch(setPlotReadyDir(false));
	}, [vectorName]);
	const [customError, setCustomError] = useState(null);
	// This side effect arrangtes the map centers to default values
	// in case the vectorName changes
	useSetDefaultCoordinates();

	useEffect(() => {
		let r = rawData.current;
		try {
			if (data && Object.keys(chartParameters).length > 0) {
				console.log("did we gt here");
				r.data = data;
				r.dataToPlot = {};
				r.rawDataToPlot = {};
				ChartCalculatorService.createDateArray(rawData, chartParameters);
				ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
				ChartCalculatorService.handleSlices(rawData, chartParameters);
				dispatch(setPlotReadyDir(true));
				setCustomError(null);
				dispatch(
					setBrushRangeDir({ startIndex: 0, endIndex: r.dataToPlot.length - 1 })
				);
			} else {
				dispatch(setPlotReadyDir(false));
				mapPagePosition &&
					setCustomError({
						message: `There is no data available for the position chosen lat:
				${mapPagePosition.lat.toFixed(2)} lng: ${mapPagePosition.lng.toFixed(2)}`,
					});
			}
		} catch (err) {
			console.log(err);
			setCustomError({
				message: "something went wrong when dealing with data in simulation",
			});
		}
	}, [
		chartParameters,
		vectorName,
		data,
		dispatch,
		rawData,
		setPlotReadyDir,
		mapPagePosition.lat,
		mapPagePosition.lng,
		mapPagePosition,
	]);

	!chartParameters &&
		Object.keys(chartParameters).length === 0 &&
		setCustomError({ message: "chart parameters are not available" });

	error && setCustomError({ id: 0, message: "server responded with an error" });

	if (isFetching) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Fetching Time Series Data</p>
			</ChartLoadingSkeleton>
		);
	}
	if (customError) {
		return <ErrorComponent text={customError.message}></ErrorComponent>;
	}

	if (r.dataToPlot) {
		console.log({ dataToPlot: r.dataToPlot, plotReady });
		return (
			plotReady && (
				<ErrorBoundary>
					<RechartsPlot direction="left" plotMat={r.dataToPlot}></RechartsPlot>
				</ErrorBoundary>
			)
		);
	} else {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>trying yo figure things out</p>
			</ChartLoadingSkeleton>
		);
	}
}

export default TsRequest;
