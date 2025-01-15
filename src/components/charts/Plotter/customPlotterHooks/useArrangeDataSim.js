import useDirectorFun from "customHooks/useDirectorFun";
import { useEffect } from "react";
import ChartCalculatorService from "components/charts/services/ChartCalculatorService";
import { setAlboRequestPlot } from "store";
import { setSlider1EnabledRight } from "store";

function useArrangeDataSim({
	rawData,
	dataTs,
	dataSim,
	setAlboDataArrived,
	alboDataArrived,
}) {
	const {
		vectorName,
		chartParameters,
		invalidateSimData,
		dispatch,
		setPlotReadyDir,
		mapPagePositionLeft,
		setMessengerDir,
		messenger,
	} = useDirectorFun("left");

	useEffect(() => {
		let r = rawData.current;
		try {
			if (vectorName === "albopictus") {
				if (
				
					dataSim &&
					dataTs &&
					chartParameters &&
					Object.keys(chartParameters).length > 0
				) {
					if (dataSim) {
						r.data = { ...dataSim };
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
						setPlotReadyDir(true);
					}
				} else {
					console.log("shouldnt have come here");
					dispatch(setPlotReadyDir(false));

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
		dataSim,
		dispatch,
		alboDataArrived,
		rawData,
		vectorName,
		dataTs,
		setPlotReadyDir,
		mapPagePositionLeft,
		setMessengerDir,
		messenger,
		setAlboDataArrived,
	]);
}

export default useArrangeDataSim;
