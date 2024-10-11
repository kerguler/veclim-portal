import "./imageWithCaptions.css";
import classNames from "classnames";
function ImageWithCaptions({
	rotateMe,
	wide,
	large,
	wrap,
	imagePath,
	caption,
}) {
	const internalClassName = classNames(
		"image-with-caption",
		rotateMe && "rotate",
		wide && "wide",
		wrap && "wrap",
		large && "large"
	);
	const internalCaptionClassName = classNames(
		"image-with-caption caption",
		wide && "wide",
		wrap && "wrap"
	);
	return (
		<div className={internalClassName}>
			{imagePath && <img alt="map" src={imagePath} />}
			{caption && <div className={internalCaptionClassName}>{caption}</div>}
		</div>
	);
}

export default ImageWithCaptions;
