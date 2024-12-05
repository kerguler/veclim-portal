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
import { useSelector } from "react-redux";
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

	const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePosition),
		vectorName,
		dateArray,
	});

	const [customError, setCustomError] = useState(null);

	useEffect(() => {
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
		if (direction === "left") {
			if (data && vectorName === "papatasi" && !data["sim-ts"]) {
				customError || setCustomError(true);
			} else if (
				data &&
				vectorName === "albopictus" &&
				!data[chartParameters.initialSetting]
			) {
				customError || setCustomError(true);
			} else {
				let r = rawData.current;

				if (
					data &&
					data[chartParameters.initialSetting] &&
					Object.keys(data[chartParameters.initialSetting]).length > 0
				) {
					r.data = data;
					ChartCalculatorService.createDateArray(rawData, chartParameters);
					ChartCalculatorService.handleMixedKeys(rawData, chartParameters);
					ChartCalculatorService.handleSlices(chartParameters, rawData);

					dispatch(setPlotReadyDir(true));
					customError && setCustomError(false);
				}
			}
		}
	}, [data, direction, vectorName]);
	const tsData = useSelector((state) => state.fetcher.fetcherStates.data);
	useEffect(() => {
		if (data && vectorName === "albopictus") {
			dispatch(setTsData(data));
		} else {
			dispatch(setTsData(null));
		}
	}, [data, vectorName, dispatch]);

	if (direction === "left") {
		if (
			chartParameters.lineSlice &&
			chartParameters.lineSlice.length > 0 &&
			!chartParameters.plottedKeys.includes("slice1")
		) {
			
			dispatch(appendToPlottedKeysChartParametersDir("slice1"));
			dispatch(appendToPlottedKeysChartParametersDir("slice2"));
			dispatch(appendToPlottedKeysChartParametersDir("slice3"));
			dispatch(appendToLabelsChartParametersDir(chartParameters.sliceLabels));
			dispatch(appendToColorsChartParametersDir(chartParameters.sliceColors));
			dispatch(spliceChartParametersForSlicesDir(0));
		} else if (direction === "left" && customError) {
		}
	}

	return {
		dataTs: customError ? null : data,
		errorTs: error || customError,
		isFetchingTs: isFetching,
	};
}

export default useTsRequest;
