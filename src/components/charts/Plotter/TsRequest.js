import useDirectorFun from "customHooks/useDirectorFun";
import { useFetchTimeSeriesDataQuery } from "store";
import { useEffect, useRef } from "react";
import ChartCalculatorService from "../services/ChartCalculatorService";
import { useDispatch } from "react-redux";
import RechartsPlot from "./RechartsPlot";
import useSetDefaultCoordinates from "./customPlotterHooks/useSetDefaultCoordinates";
import ErrorComponent from "./errorComponent/ErrorComponent";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import ChartLoadingSkeleton from "components/skeleton/Skeleton";
import { useSelector } from "react-redux";
function TsRequest() {
	const dispatch = useDispatch();

	const rawData = useRef({
		rawDataToPlot: {},
		data: null,
		dataToPlot: null,
	});
	let r = rawData.current;
	// This side effect arrangtes the map centers to default values
	// in case the vectorName changes
	useSetDefaultCoordinates();

	const {
		mapPagePosition,
		vectorName,
		dateArray,
		setPlotReadyDir,
		chartParameters,
		plotReady,
		setBrushRangeDir,
		messenger,
		setMessengerDir,
	} = useDirectorFun("left");

	const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePosition),
		vectorName,
		dateArray,
	});

	useEffect(() => {
		plotReady && dispatch(setPlotReadyDir(false));
	}, [vectorName, dispatch, setPlotReadyDir]);

	useEffect(() => {
		let r = rawData.current;
		// console.log("in TsRequest useEffect", {
		// 	data,
		// 	isFetching,
		// 	error,
		// });
		try {
			if (!isFetching && data && Object.keys(chartParameters).length > 0) {
				const { errorMessage, isError } =
					ChartCalculatorService.checkDataForMixedKeys(
						chartParameters,
						data,
						dispatch,
						setPlotReadyDir,
						mapPagePosition
					);
				if (isError) {
					console.log("shouldnt have come here");
					dispatch(setMessengerDir({ id: 0, message: errorMessage }));
					throw new Error(errorMessage);
				}
				r.data = data;
				r.dataToPlot = {};
				r.rawDataToPlot = {};
				ChartCalculatorService.createDateArray(rawData, chartParameters);
				ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
				ChartCalculatorService.handleSlices(rawData, chartParameters);
				dispatch(setPlotReadyDir(true));
				dispatch(setMessengerDir({ id: null, message: null, isError: false }));
				dispatch(
					setBrushRangeDir({
						startIndex: 0,
						endIndex: r.dataToPlot.length - 1,
					})
				);
			} else {
				console.log("no data or no chartparameters");
				dispatch(setPlotReadyDir(false));
				mapPagePosition.lat &&
					dispatch(
						setMessengerDir({
							...messenger,
							message: "Data is not available yet. Please click on the Map",
						})
					);
			}
		} catch (err) {
			console.log("in catch block", err);
			dispatch(
				setMessengerDir({
					...messenger,
					message: err.message,
				})
			);
		}
	}, [
		chartParameters,
		data,
		dispatch,
		error,
		isFetching,
		mapPagePosition.lat,

		setMessengerDir,
		setPlotReadyDir,
	]);

	!chartParameters &&
		Object.keys(chartParameters).length === 0 &&
		dispatch(
			setMessengerDir({
				...messenger,
				message: "chart parameters are not available",
			})
		);

	if (isFetching) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Fetching Time Series Data</p>
			</ChartLoadingSkeleton>
		);
	}

	if (messenger.message) {
		return <ErrorComponent text={messenger.message}></ErrorComponent>;
	}

	if (r.dataToPlot) {
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
