import useDirectorFun from "customHooks/useDirectorFun";
import { useEffect } from "react";
import ChartCalculatorService from "components/charts/services/ChartCalculatorService";
import { setAlboRequestPlot, setSimSlider1Enabled } from "store";
import { useAlboData } from "context/AlboDataContext";
import { setPlotReady } from "store";
import { setMessenger } from "store";

function useArrangeDataSim({
	rawData,
	dataTs,

	setAlboDataArrived,
	alboDataArrived,
	direction,
}) {
	const { simResult } = useAlboData();

	const {
		vectorName,
		chartParameters,
		invalidateSimData,
		dispatch,
		mapPagePosition,
		messenger,
	} = useDirectorFun(direction);

	useEffect(() => {
		console.log("useArrangeDataSim");
		let r = rawData.current;
		try {
			if (vectorName === "albopictus") {
				if (
					simResult &&
					dataTs &&
					chartParameters &&
					Object.keys(chartParameters).length > 0
				) {
					if (simResult) {
						console.log("simResult", simResult);
						r.data = { ...simResult };
						r.data["ts"] = dataTs;

						const { errorMessage, isError } =
							ChartCalculatorService.checkDataForMixedKeys(
								chartParameters,
								r.data,
								dispatch,
								setPlotReady,
								mapPagePosition,
								direction,
							);

						if (isError) {
							throw new Error(errorMessage);
						}
						ChartCalculatorService.createDateArray(
							rawData,
							chartParameters,
						);
						ChartCalculatorService.handleMixedKeys(
							rawData,
							chartParameters,
						);
						ChartCalculatorService.handleSlices(
							rawData,
							chartParameters,
						);
						dispatch(setPlotReady({ direction, value: true }));
						dispatch(setAlboRequestPlot(false));
						dispatch(
							setSimSlider1Enabled({ direction, value: true }),
						);
						setPlotReady({ direction, value: true });
					}
				} else {
					console.log({ dataTs, simResult });
					console.log("shouldnt have come here");
					dispatch(setPlotReady({ direction, value: false }));
				}
			} else {
				dispatch(
					setMessenger({
						direction,
						value: {
							id: 3,
							isError: true,
							message: "The panel doesnt work for this vector",
						},
					}),
				);
			}
		} catch (err) {
			dispatch(
				setMessenger({
					direction,
					value: {
						id: 5,

						message:
							"something went wrong when dealing with data in simulation",
					},
				}),
			);
		}
	}, [
		invalidateSimData,
		chartParameters,
		simResult,
		dispatch,
		alboDataArrived,
		rawData,
		vectorName,
		dataTs,
		setPlotReady,
		mapPagePosition,
		setMessenger,
		messenger,
		setAlboDataArrived,
	]);
}

export default useArrangeDataSim;
