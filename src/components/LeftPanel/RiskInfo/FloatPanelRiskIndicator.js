import "./RiskIndicator.css";

import ToolTip from "components/Tooltip/ToolTip";

function RiskIndicator({ props }) {
	return (
		<div className="risk-indicator-container">
			<h1>{props.name}</h1>
			<div className="risk-indicator-item">
				<div className={"risk-indicator-" + props.value}></div>
				<ToolTip>{props.text}</ToolTip>
			</div>
		</div>
	);
}

function AccuracyIndicator({ props }) {
	var labels = [
		"?", //"Unknown",
		"~", //"Pending",
		"✔", //"Valid"
	];
	return (
		<div className="risk-indicator-container">
			<h1>{props.name}</h1>
			<div className="risk-indicator-item">
				<div className={"risk-indicator-acc risk-indicator-acc-" + props.value}>
					{labels[props.value]}
				</div>
				<ToolTip>{props.text}</ToolTip>
			</div>
		</div>
	);
}

export { RiskIndicator, AccuracyIndicator };
