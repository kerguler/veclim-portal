import { useState } from "react";
import { useGetSimulationListQuery } from "store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function useSimTileFunctions(sim) {
	const dispatch = useDispatch();
	const [isAlboChik, setIsAlboChik] = useState(false);
	const [displayViewIcon, setDisplayViewIcon] = useState(false);
	const [pollingActive, setPollingActive] = useState(false);
	const {
		data: simRecord,
		isFetching: isSimListFetching,
		error: simListError,
		refetch,
	} = useGetSimulationListQuery({ id: sim.id, return_results: false });
	useEffect(() => {
		if (!pollingActive) return;
		const interval = setInterval(() => {
			refetch();
		}, 3000);
		return () => clearInterval(interval);
	}, [pollingActive, refetch]);

	useEffect(() => {
		if (!simRecord) return;

		const isPendingSim =
			simRecord.status === "PENDING" || simRecord.status === "STARTED";
		setPollingActive(isPendingSim);
	}, [simRecord, dispatch]);

	useEffect(() => {
		if (sim.model_type === "model_albochik") {
			setIsAlboChik(true);
		}
	}, [sim.model_type]);

	useEffect(() => {
		if (simRecord) {
			if (
				simRecord.status === "PENDING" ||
				simRecord.status === "STARTED"
			) {
				setDisplayViewIcon(false);
			} else if (simRecord.status === "SUCCESS") {
				setDisplayViewIcon(true);
			}
		}
	}, [sim.status, simRecord]);

	return {
		simRecord,
		isSimListFetching,
		simListError,
		refetch,
		isAlboChik,
		displayViewIcon,
	};
}
export default useSimTileFunctions;
