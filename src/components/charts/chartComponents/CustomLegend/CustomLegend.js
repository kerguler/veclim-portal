import "./CustomLegend.css";

const CustomLegend = ({ payload, parameters }) => {
	const payload1 = Array.from(
		new Map(payload.map((item) => [item.value, item])).values()
	);

	
	if (parameters.labels) {
		return (
			<>
				<div className="horizontal-legend">
					{payload1.map((entry, index) => (
						<li className="legend-list" key={index}>
							<span style={{ color: entry.color, paddingRight: "2px" }}>●</span>
							<span style={{ paddingRight: "8px" }}>
								{" "}
								{parameters.labels[index]}{" "}
							</span>
						</li>
					))}
				</div>
			</>
		);
	} else {
		return (
			<ul>
				{payload1.map((entry, index) => (
					<li key={index}>
						<span style={{ color: entry.color, paddingRight: "8px" }}>●</span>
						{entry.value}
					</li>
				))}
			</ul>
		);
	}
};
export default CustomLegend;
