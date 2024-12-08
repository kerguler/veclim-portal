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
import { setIsTsDataSet } from "store";
import useSetDefaultCoordinates from "./useSetDefaultCoordinates";

function useTsRequest(rawData, direction, plotReady) {
	const dispatch = useDispatch();

	const {
		mapPagePosition,
		vectorName,
		dateArray,
		setPlotReadyDir,
		chartParameters,
		setMapPagePositionDir,
		displayedPanelID,
	} = useDirectorFun("left");

	// I decided to take the chartParameters from the rawData object
	// as there are timing issues in syncronization when we receive plotmat, and when we receive chartParameters

	// everytime UnifiedRechartsPlotter rerenders, we want to make sue we get TS data.
	// redux RTK is smart enough to not re fetch for the same parameters.
	// In order to make sure this data is avilable always and everywhere,
	//we are storing the received data in redux so we can use it in albo request

	const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
		position: JSON.stringify(mapPagePosition),
		vectorName,
		dateArray,
	});

	const tsData = useSelector((state) => state.fetcher.fetcherStates.data);

	const [customError, setCustomError] = useState(null);
	// This side effect arrangtes the map centers to default values
	// in case the vectorName changes

	useSetDefaultCoordinates();
	useEffect(() => {
		let r = rawData.current;
		if (data && Object.keys(chartParameters).length > 0) {
			r.data = data;
			r.dataToPlot = {};

			ChartCalculatorService.createDateArrayAlbo(rawData, chartParameters);
			ChartCalculatorService.handleMixedKeysAlbo(rawData, chartParameters);
			ChartCalculatorService.handleSlicesAlbo(chartParameters, rawData);
			dispatch(setPlotReadyDir(true));
			setCustomError(null);
		} else {
			dispatch(setPlotReadyDir(false));
		}
	}, [
		chartParameters,
		data,
		dispatch,
		rawData,
		setPlotReadyDir,
		displayedPanelID,
	]);

	useEffect(() => {
		dispatch(setIsTsDataSet(true));
		if (data && vectorName === "albopictus") {
			dispatch(setTsData(data));
		} else {
			dispatch(setTsData(null));
		}
	}, [data, vectorName, dispatch]);

	return {
		dataTs: customError ? null : data,
		errorTs: error || customError,
		isFetchingTs: isFetching,
	};
}

export default useTsRequest;
