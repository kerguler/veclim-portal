import "./mapMenuV2.css";
import classNames from "classnames";
import useDirectorFun from "customHooks/useDirectorFun";

function MapMenuV2({ menuDirection, direction, children, level }) {
	const { panelDataDir: panelData, openItems } = useDirectorFun(direction);

	let className = classNames("icon-column", `level${level}`);

	Object.keys(openItems).forEach((item) => {
		let icon = panelData.filter((i) => i.key === item)[0];

		if (icon?.subMenuOpenDirection) {
			className = classNames(
				className,
				`direction-${icon.subMenuOpenDirection}`
			);
		}
	});

	return (
		<div>
			<div className={className}>
				{<div className="vertical-menu">{children}</div>}
			</div>
		</div>
	);
}

export default MapMenuV2;
