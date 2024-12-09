import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { set, useSubmitAlboDataMutation } from "store";
import { setAlboRequestPlot } from "store";
import ChartCalculatorService from "components/charts/services/ChartCalculatorService";
import useDirectorFun from "customHooks/useDirectorFun";
import { setSlider1EnabledRight } from "store";
import { useState } from "react";
import ChartLoadingSkeleton from "components/skeleton/Skeleton";
import ErrorComponent from "./errorComponent/ErrorComponent";
import { useRef } from "react";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import { useFetchTimeSeriesDataQuery } from "store";
import RechartsPlot from "./RechartsPlot";
function AlboRequest() {
	const dispatch = useDispatch();
	const alboSlider1Value = useSelector(
		(state) =>
			state.fetcher.fetcherStates.menu.right.chart.sliders.slider1.value
	);
	const alboRequest = useSelector(
		(state) => state.fetcher.fetcherStates.menu.right.chart.requestPlot
	);
	const {
		dateArray,
		mapPagePosition,
		setPlotReadyDir,
		chartParameters,
		vectorName,
		plotReady,
	} = useDirectorFun("right");

	const [submitAlboData, { isLoading, data: dataAlbo, error: errorAlbo }] =
		useSubmitAlboDataMutation();
	const {
		data: dataTs,
		error: errorTs,
		isFetching,
	} = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePosition),
		vectorName,
		dateArray,
	});
	console.log({ errorTs, isFetching, dataTs });
	console.log({ errorAlbo, isLoading, dataAlbo });

	const [customError, setCustomError] = useState(0);

	const mapPagePositionLeft = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapPagePosition
	);

	const rawData = useRef({
		rawDataToPlot: {},
		data: null,
		dataToPlot: null,
	});

	useEffect(() => {
		if (dataTs) {
			if (!dataAlbo) {
				setCustomError({
					id: 3,
					message: `Ts data has arrived for lat:${mapPagePositionLeft.lat.toFixed(
						2
					)} lng:${mapPagePositionLeft.lng.toFixed(
						2
					)}, click submit to receive results for the new coordinates`,
				});
			}
		} else {
			setCustomError({
				id: 3,
				message: `Ts Data is not set`,
			});
		}

		if (isFetching) {
			setCustomError({ id: 9, message: "Fetching Ts Data" });
		}
	}, [dataTs, isFetching, mapPagePositionLeft]);
	useEffect(() => {
		if (mapPagePositionLeft) {
			setCustomError({
				id: 3,
				message: `Map Page Position Left has changed to lat:${mapPagePositionLeft.lat.toFixed(
					2
				)} lng:${mapPagePositionLeft.lng.toFixed(2)} Please press submit`,
			});
		}
	}, [mapPagePositionLeft]);

	const [alboDataArrived, setAlboDataArrived] = useState(false);
	useEffect(() => {
		const handleConfirm = async () => {
			try {
				console.log("submnittint sim ");
				const response = await submitAlboData(alboSlider1Value / 100).unwrap();
				response && setAlboDataArrived(true);
				dispatch(setAlboRequestPlot(false));
			} catch (err) {
				console.log(err);
				setAlboDataArrived(false);
				setCustomError({
					id: 4,
					message: "the response from the server had an error",
				});
			}
		};

		if (alboRequest) {
			handleConfirm();
			setCustomError(false);
		} else {
			setAlboDataArrived(false);
		}
	}, [alboSlider1Value, alboRequest, submitAlboData, dispatch]);
	console.log({ alboRequest });

	useEffect(() => {
		let r = rawData.current;
		try {
			if (vectorName === "albopictus") {
				if (
					Object.keys(dataTs).length > 0 &&
					Object.keys(chartParameters).length > 0
				) {
					if (dataAlbo) {
						r.data = { ...dataAlbo };
						r.data["ts"] = dataTs;
						ChartCalculatorService.createDateArray(rawData, chartParameters);
						ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
						ChartCalculatorService.handleSlices( rawData,chartParameters);
						dispatch(setPlotReadyDir(true));
						dispatch(setAlboRequestPlot(false));
						dispatch(setSlider1EnabledRight(true));
						setCustomError(null);
						setAlboDataArrived(false);
					}
				} else {
					console.log({ dataTs, chartParameters });
					dispatch(setPlotReadyDir(false));
					setCustomError({
						id: 2,
						message: "Either Ts data is empty, or it is not set",
					});
				}
			} else {
				setCustomError({
					id: 3,
					message: "The panel doesnt work for this vector",
				});
			}
		} catch (err) {
			console.log(err);
			setCustomError({
				id: 5,
				message: "something went wrong when dealing with data in simulation",
			});
		}
	}, [
		chartParameters,
		dataAlbo,
		dispatch,
		alboDataArrived,
		rawData,
		vectorName,
		dataTs,

		setPlotReadyDir,
	]);
	useEffect(() => {
		!chartParameters &&
			!Object.keys(chartParameters).length > 0 &&
			setCustomError({ message: "chart parameters are not available" });
	}, [chartParameters]);

	useEffect(() => {
		if (errorAlbo) {
			setCustomError({ id: 0, message: "server responded with an error" });
		}
	}, [errorAlbo]);

	let r = rawData.current;
	if (isLoading) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Fetching Sumlation Data</p>
			</ChartLoadingSkeleton>
		);
	} else if (customError) {
		return <ErrorComponent text={customError.message}></ErrorComponent>;
	} else if (Object.keys(chartParameters).length === 0) {
	} else {
		if (!dataAlbo) {
			return (
				<div>
					<p>Click on the map to choose a location and adjust the parameters</p>
				</div>
			);
		}

		if (dataAlbo) {
			return (
				plotReady && (
					<ErrorBoundary>
						<RechartsPlot
							direction="right"
							plotMat={r.dataToPlot}
						></RechartsPlot>
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
}

export default AlboRequest;
// useEffect(() => {
// 	let r = rawData.current;
// 	if (
// 		direction === "right" &&
// 		alboDataArrived &&
// 		r.dataToPlot &&
// 		chartParameters.lineSlice &&
// 		chartParameters.lineSlice.length > 0 &&
// 		!chartParameters.plottedKeys.includes("slice1") &&
// 		vectorName === "albopictus"
// 	) {
// 		Object.keys(r.rawDataToPlot).forEach((element, index) => {
// 			if (element !== "key") {
// 				if (
// 					r.rawDataToPlot[element] &&
// 					r.rawDataToPlot[element].slices &&
// 					Object.keys(r.rawDataToPlot[element].slices).length > 0
// 				) {
// 					Object.keys(r.rawDataToPlot[element].slices).forEach(
// 						(slice, index) => {
// 							dispatch(
// 								appendToPlottedKeysChartParametersDir(
// 									`${element}.slice${index}`
// 								)
// 							);
// 						}
// 					);
// 				}
// 			}
// 		});
// 		setAlboDataArrived(false);
// 	}
// }, [plotReady, alboDataArrived]);
