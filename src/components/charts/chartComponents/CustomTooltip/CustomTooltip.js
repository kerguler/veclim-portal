import "./CustomTooltip.css";

function CustomTooltip({ active, payload, label, parameters }) {
	const payload1 = Array.from(
		new Map(payload.map((item) => [item.value, item])).values()
	);
	if (active && payload1 && payload1.length) {
		//TODO:: fix the dodgy code coming up
		//hard coded test based on variable names slice1 slice 2 and slice 3

		const RenderedTooltipElement = ({ entry, index }) => {
			if (entry.name === "slice1" && parameters.sliceLabels !== null) {
				return (
					<span key={`${entry.value.toFixed(2)} - ${index}`}>
						{" "}
						{`${parameters.sliceLabels[0]}: ${entry.value.toFixed(2)}`}
					</span>
				);
			} else if (entry.name === "slice2" && parameters.sliceLabels !== null) {
				return (
					<span key={`${entry.value.toFixed(2)} - ${index}`}>{`${
						parameters.sliceLabels[1]
					}: ${entry.value.toFixed(2)}`}</span>
				);
			} else if (entry.name === "slice3" && parameters.sliceLabels !== null) {
				return (
					<span key={`${entry.value.toFixed(2)} - ${index}`}>{`${
						parameters.sliceLabels[2]
					}: ${entry.value.toFixed(2)}`}</span>
				);
			} else {
				return (
					<span key={`${entry.value.toFixed(2)} - ${index}`}>{`${
						parameters.labels[index]
					}: ${entry.value.toFixed(2)}`}</span>
				);
			}
		};

		let renderedTooltipvalues = payload1.map((entry, index) => {
			if (parameters.labels) {
				return (
					<p key={`${entry.dataKey}-${index}`} style={{ color: entry.color }}>
						<RenderedTooltipElement index={index} entry={entry} />
					</p>
				);
			} else {
				return (
					<p key={`${entry.dataKey}-${index}`} style={{ color: entry.color }}>
						{`${entry.name}: ${entry.value.toFixed(2)}`}
					</p>
				);
			}
		});
		return (
			<div className="custom-tooltip">
				<h3>{`${label}`}</h3>
				{renderedTooltipvalues}
			</div>
		);
	} else {
		return null;
	}
}
export default CustomTooltip;
