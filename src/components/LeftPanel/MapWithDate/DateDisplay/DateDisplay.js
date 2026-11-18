import { useSelector } from "react-redux";
import { useFetchCoordinateDataQuery } from "store";
import { useContext } from "react";
import { parseDate } from "store/apis/utils";
import { getVector } from "vectors/registry";
import TextContext from "context/appText";
import "./DateDisplay.css";
const DateDisplay = () => {
	const position = useSelector((state) => {
		return state.fetcher.fetcherStates.map.globalPosition;
	});
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	// vectors without risk indicators (module.js) do not call the risk endpoint
	const hasRisk = getVector(vectorName)?.hasRiskIndicators === true;
	const { data } = useFetchCoordinateDataQuery(JSON.stringify(position), {
		skip: !hasRisk,
	});
	const { months } = useContext(TextContext);
	let date = null;
	if (hasRisk && data) {
		date = parseDate('date0' in data.date ? data.date.date0 : data.date[0]);
	} else if (!hasRisk) {
		date = new Date();
	}
	const today = date
		? (date.getDate() < 10 ? "0" : "") +
		  date.getDate() +
		  " " +
		  months[date.getMonth()]
		: "";
	return <div className="date-picker-row">{today}</div>;
};
export default DateDisplay;
