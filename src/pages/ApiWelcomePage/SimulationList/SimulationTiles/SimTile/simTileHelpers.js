import { setOpenItems } from "store";
import { setDisplaySimulationPanel } from "store";
import { setShimmered } from "store";
import { setPanelLevel } from "store";
import { setDataArrived } from "store";
import { setInvalidateSimData } from "store";

class simTileHelpers {
	static handleDownload = async (fetchWithResults) => {
		try {
			const result = await fetchWithResults().unwrap();

			const fileContent = JSON.stringify(result, null, 2);
			const blob = new Blob([fileContent], { type: "text/plain" });
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `${result.id}_download.txt`;
			link.click();
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error downloading file:", error);
		}
	};

	static handleDeleteSimulation = async (deleteSimulation, id) => {
		console.log("delete", id);
		try {
			const response = deleteSimulation({ id: id });
			// console.log("DELETE RESPONSE", response);
		} catch (err) {
			console.log(err);
		}
	};

	static handleViewSimulationResults = async (
		fetchWithResults,
		setSimResult,
		setDataSim,
		dispatch,
		direction,
	) => {
		const result = await fetchWithResults().unwrap();
		setSimResult(result.results);
		setDataSim(result.results);
		console.log("RESULTS", result.results);
		dispatch(setInvalidateSimData(false));
		dispatch(setDataArrived({ direction: direction, value: true }));
		dispatch(
			setDisplaySimulationPanel({
				direction: direction,
				value: "activity_forecast",
			}),
		);
	};
}
export default simTileHelpers;
