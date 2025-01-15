import "./CustomTooltip.css";

function CustomTooltip({ active, payload, label, parameters, keys }) {
	const payload1 = Array.from(
		new Map(payload.map((item) => [item.value, item])).values()
	);

	if (active && payload1 && payload1.length) {
	

		const RenderedTooltipElement = ({ entry, index, keys }) => {
			return payload1.map((parts) => {
				let key = parts.dataKey;
				let primaryKey = key.split(".")[0];
				let secondaryKey = null;
				if (key.split(".").length > 1) {
					secondaryKey = key.split(".")[1];
				}
				let label = null;
				if (primaryKey in parameters.sliceInfo) {
					if (secondaryKey in parameters.sliceInfo[primaryKey].sliceLabels) {
						label = parameters.sliceInfo[primaryKey].sliceLabels[secondaryKey];
					}
				}
				if (key === entry.dataKey) {
					return (
						<span key={`${entry.value.toFixed(2)} - ${index}`}>
							{" "}
							{`${label}: ${entry.value.toFixed(2)}`}
						</span>
					);
				}
			});
		};
		
		let labels=[]
		Object.keys(parameters.sliceInfo).forEach((key)=>{
			if(parameters.sliceInfo[key].sliceLabels){
				Object.keys(parameters.sliceInfo[key].sliceLabels).forEach((label)=>{
					labels.push(parameters.sliceInfo[key].sliceLabels[label])
				})
			}
			
		
		})

		let renderedTooltipvalues = payload1.map((entry, index) => {
			if (labels) {
				return (
					<p key={`${entry.dataKey}-${index}`} style={{ color: entry.color }}>
						<RenderedTooltipElement keys={keys} index={index} entry={entry} />
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
