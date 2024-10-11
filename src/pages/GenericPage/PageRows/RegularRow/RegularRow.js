import ImageWithCaptions from "../ImageWithCaptions/ImageWithCaptions";
import "./regularRow.css";
import classNames from "classnames";
function RegularRow({
	rotateMe,
	wide,
	image,
	large,
	caption,
	title,
	children,
	reverse,
	wrap,
}) {
	const parentClassName = classNames("regular-row", reverse && "reverse");
	return (
		<div className={parentClassName}>
			<ImageWithCaptions
				wide={wide}
				rotateMe={rotateMe}
				imagePath={image}
				caption={caption}
				large={large}
			/>

			<div className="regular-row content">
				{title}
				{children}
			</div>
		</div>
	);
}

export default RegularRow;
