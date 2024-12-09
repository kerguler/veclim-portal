import TsRequest from "./TsRequest";
import AlboRequest from "./AlboRequest";

function UnifiedRechartPlotter({ dateArray, direction }) {
	

	if (direction === "left") {
		return <TsRequest />;
	} else {
		return <AlboRequest />;
	}
}

export default UnifiedRechartPlotter;
