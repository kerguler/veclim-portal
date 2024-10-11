import React from "react";
import "./Skeleton.css";
import classNames from "classnames";
const Skeleton = ({ times, className, noBorder }) => {
	const outerClassNames = classNames("loading-line", className);
	const innerClassNames = classNames("gradient-loading-line");
	const wrapperClassName = classNames(
		"chart-loading-skeleton",
		noBorder ? "" : "border"
	);
	let renderedRectangles = [];
	for (let i = 1; i <= times; i++) {
		renderedRectangles.push(
			<div key={i} className={outerClassNames}>
				<div className={innerClassNames}></div>
			</div>
		);
	}

	return <div className={wrapperClassName}>{renderedRectangles}</div>;
};

export default Skeleton;
