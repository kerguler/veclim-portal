import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSubmitAlboDataMutation } from "store";
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
import { store } from "store";
import { alboApi } from "store/apis/alboApi";
import { setIsTsDataSet } from "store";
import { setInvalidateSimData } from "store";
import { useAlboData } from "context/AlboDataContext";

function AlboRequest() {
	console.log("AlboRequest");
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

		setPlotReadyDir,
		chartParameters,
		vectorName,
		plotReady,
		messenger,
		setMessengerDir,
		mapPagePositionLeft,
	} = useDirectorFun("right");

	const [submitAlboData, { isLoading, data: dataAlbo, error: errorAlbo }] =
		useSubmitAlboDataMutation();

	const {
		data: dataTs,
		error: errorTs,
		isFetching,
	} = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePositionLeft),
		vectorName,
		dateArray,
	});
	const [alboDataArrived, setAlboDataArrived] = useState(false);
	const invalidateSimData = useSelector(
		(state) => state.fetcher.fetcherStates.invalidateSimData
	);

	const rawData = useRef({
		rawDataToPlot: {},
		data: null,
		dataToPlot: null,
	});

	useEffect(() => {
		invalidateSimData &&
			dispatch(
				setMessengerDir({
					...messenger,
					id: 10,
					message: "new ts data is being fetched",
				})
			);

		dataTs &&
			invalidateSimData &&
			dispatch(
				setMessengerDir({
					id: 11,
					message: `Ts data has arrived for lat:${mapPagePositionLeft.lat.toFixed(
						2
					)} lng:${mapPagePositionLeft.lng.toFixed(
						2
					)}, click submit to receive results for the new coordinates`,
				})
			);
	}, [
		invalidateSimData,
		isFetching,
		dataTs,
		mapPagePositionLeft.lat,
		mapPagePositionLeft.lng,
	]);

	useEffect(() => {
		const handleConfirm = async () => {
			try {
				const response = await submitAlboData(alboSlider1Value / 100).unwrap();
				response && setAlboDataArrived(true);
				dispatch(setAlboRequestPlot(false));
				dispatch(setInvalidateSimData(false));
			} catch (err) {
				setAlboDataArrived(false);
				dispatch(
					setMessengerDir({
						...messenger,
						id: 4,
						message: "the response from the server had an error",
					})
				);
			}
		};

		if (alboRequest) {
			handleConfirm();
			dispatch(
				setMessengerDir({ ...messenger, message: null, isError: false })
			);
		} else {
			setAlboDataArrived(false);
		}
	}, [alboSlider1Value, alboRequest, submitAlboData, dispatch]);
	// useEffect(() => {
	// 	if (errorTs) {
	// 		dispatch(
	// 			setMessengerDir({
	// 				...messenger,
	// 				id: 0,
	// 				message: "server responded with an error",
	// 			})
	// 		);
	// 	}
	// }, [errorTs]);
	const invalidateTsData = useSelector(
		(state) => state.fetcher.fetcherStates.invalidateTsData
	);
	useEffect(() => {
		dataTs &&
			invalidateTsData &&
			invalidateSimData &&
			dispatch(
				setMessengerDir({
					id: 12,
					message: `There is no data available for the position chosen lat:${mapPagePositionLeft.lat.toFixed(
						2
					)} lng: ${mapPagePositionLeft.lng.toFixed(2)}`,
					isError: true,
				})
			);
	}, [
		invalidateTsData,
		dataTs,
		mapPagePositionLeft.lat,
		mapPagePositionLeft.lng,
	]);

	useEffect(() => {
		let r = rawData.current;
		try {
			if (vectorName === "albopictus") {
				if (
					!invalidateSimData &&
					dataTs &&
					chartParameters &&
					// dataTs.presence.albopictus.length > 0 &&
					Object.keys(chartParameters).length > 0
				) {
					if (dataAlbo) {
						r.data = { ...dataAlbo };
						r.data["ts"] = dataTs;

						const { errorMessage, isError } =
							ChartCalculatorService.checkDataForMixedKeys(
								chartParameters,
								r.data,
								dispatch,
								setPlotReadyDir,
								mapPagePositionLeft
							);

						if (isError) {
							throw new Error(errorMessage);
						}
						ChartCalculatorService.createDateArray(rawData, chartParameters);
						ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
						ChartCalculatorService.handleSlices(rawData, chartParameters);
						dispatch(setPlotReadyDir(true));
						dispatch(setAlboRequestPlot(false));
						dispatch(setSlider1EnabledRight(true));
						dispatch(
							setMessengerDir({ ...messenger, message: null, isError: false })
						);
						setAlboDataArrived(false);
					}
				} else {
					dispatch(setPlotReadyDir(false));
					if (invalidateSimData) {
						dispatch(
							setMessengerDir({
								id: 10,
								message: `the coordinates have changed to lat:${mapPagePositionLeft.lat.toFixed(
									2
								)} lng:${mapPagePositionLeft.lng.toFixed(2)}`,
								isError: false,
							})
						);
					} else {
						dispatch(
							setMessengerDir({
								id: 2,
								message: "Either Ts data is empty, or it is not set",
								isError: true,
							})
						);
					}
				}
			} else {
				dispatch(
					setMessengerDir({
						id: 3,
						isError: true,
						message: "The panel doesnt work for this vector",
					})
				);
			}
		} catch (err) {
			dispatch(
				setMessengerDir({
					id: 5,

					message: "something went wrong when dealing with data in simulation",
				})
			);
		}
	}, [
		invalidateSimData,
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
			dispatch(
				setMessengerDir({
					...messenger,
					isError: true,
					message: "chart parameters are not available",
				})
			);
	}, [chartParameters]);

	useEffect(() => {
		if (errorAlbo) {
			dispatch(
				setMessengerDir({
					isError: true,
					id: 0,
					message: "server responded with an error",
				})
			);
		}
	}, [errorAlbo]);
	useEffect(() => {
		dispatch(
			setMessengerDir({
				id: 0,
				message: `New time-series data has arrived for lat:${mapPagePositionLeft.lat.toFixed(
					2
				)} lng:${mapPagePositionLeft.lng.toFixed(
					2
				)}  click confirm to receive results for the new coordinates`,
				isError: false,
			})
		);
		if (dataTs?.presence?.albopictus && dataTs.presence.albopictus.length > 0) {
			dispatch(
				setMessengerDir({
					isError: false,
					id: 1,
					message: "no time series data are available for these coordintes",
				})
			);
		}
	}, [dataTs]);
	let r = rawData.current;
	if (isLoading) {
		return (
			<ChartLoadingSkeleton times={4}>
				<p>Fetching Sumlation Data</p>
			</ChartLoadingSkeleton>
		);
	} else if (messenger.message) {
		return <ErrorComponent text={messenger.message}></ErrorComponent>;
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
