import useDirectorFun from "customHooks/useDirectorFun";
import { set, useFetchTimeSeriesDataQuery } from "store";
import { useEffect, useRef } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import ChartCalculatorService from "../services/ChartCalculatorService";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CustomTooltip from "../chartComponents/CustomTooltip/CustomTooltip";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { setTsData } from "store";
function useTsRequest(rawData, direction) {
	const dispatch = useDispatch();

	const {
		appendToColorsChartParametersDir,
		appendToLabelsChartParametersDir,
		appendToPlottedKeysChartParametersDir,
		spliceChartParametersForSlicesDir,
		mapPagePosition,
		vectorName,
		dateArray,
		setPlotReadyDir,
		chartParameters,
		plotReady,
		setMapPagePositionDir,
	} = useDirectorFun("left");

	const { data, error, isFetching } = useFetchTimeSeriesDataQuery(
		direction === "left"
			? { position: JSON.stringify(mapPagePosition), vectorName, dateArray }
			: skipToken
	);

	const [customError, setCustomError] = useState(null);

	useEffect(() => {
		console.log("USE TS useEffect 1");

		if (direction === "left") {
			if (!mapPagePosition.lat) {
				if (vectorName === "albopictus") {
					dispatch(
						setMapPagePositionDir(PackageMapServices.defaultWorldCenter)
					);
				} else {
					dispatch(setMapPagePositionDir(PackageMapServices.defaultCypCenter));
				}
			}
		}
	}, [vectorName, dispatch, mapPagePosition]);
	useEffect(() => {
		console.log("USE TS useEffect 2");

		if (direction === "left") {
			console.log({ data, chartParameters });

			if (data && vectorName === "papatasi" && !data["sim-ts"]) {
				customError || setCustomError(true);
			} else if (
				data &&
				vectorName === "albopictus" &&
				!data[chartParameters.initialSetting]
			) {
				customError || setCustomError(true);
				console.log("NO DATA FOR ALBO");
			} else {
				let r = rawData.current;

				if (
					data &&
					data[chartParameters.initialSetting] &&
					Object.keys(data[chartParameters.initialSetting]).length > 0
				) {
					r.data = data;
					console.log("TS DATA IS HERE", { chartParameters });
					ChartCalculatorService.createDateArray(rawData, chartParameters);
					ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
					ChartCalculatorService.handleSlices(chartParameters, rawData);

					dispatch(setPlotReadyDir(true));
					customError && setCustomError(false);
				}
			}
		}
	}, [data, direction, vectorName]);

	useEffect(() => {
		if (data && vectorName === "albopictus") {
			dispatch(setTsData(data));
		}
	}, [data, vectorName, dispatch]);

	if (direction === "left") {
		if (
			chartParameters.lineSlice &&
			chartParameters.lineSlice.length > 0 &&
			!chartParameters.plottedKeys.includes("slice1")
		) {
			console.log("USE TS unconditional dispatcher");

			dispatch(appendToPlottedKeysChartParametersDir("slice1"));
			dispatch(appendToPlottedKeysChartParametersDir("slice2"));
			dispatch(appendToPlottedKeysChartParametersDir("slice3"));
			dispatch(appendToLabelsChartParametersDir(chartParameters.sliceLabels));
			dispatch(appendToColorsChartParametersDir(chartParameters.sliceColors));
			dispatch(spliceChartParametersForSlicesDir(0));
		} else if (direction === "left" && customError) {
			// dispatch(setPlotReadyDir(false));
		}
	}

	return {
		dataTs: customError ? null : data,
		errorTs: error || customError,
		isFetchingTs: isFetching,
	};
}

export default useTsRequest;
