import "./wrapText.css";
import classNames from "classnames";
import ImageWithCaptions from "../ImageWithCaptions/ImageWithCaptions";
function WrapText({
	title,
	wide,
	reverse,
	rotateMe,
	caption,
	displayedImage,
	children,
	large,
}) {
	const internalClassName = classNames(
		wide && "wide",
		reverse && "reverse",
		rotateMe && "rotate",
		large && "large",
		"wrap"
	);

	const contentClassName = classNames(internalClassName, "content");
	const imageClassName = classNames(internalClassName, "image ");

	const renderedImage = (
		<ImageWithCaptions
			wrap
			large={large}
			imagePath={displayedImage}
			caption={caption}
		></ImageWithCaptions>
	);

	// const regularContent = (
	// 	<div className={internalClassName}>
	// 		<div className={contentClassName}>{title}</div>
	// 		<div className={imageClassName}>{renderedImage}</div>
	// 		<div className={contentClassName}> {children}</div>
	// 	</div>
	// );
	const content = (
		<div className={internalClassName}>
			<div className={contentClassName}>{title}</div>
			<div className={imageClassName}>{renderedImage}</div>
			<div className={contentClassName}> {children}</div>
		</div>
	);
	// const renderedContent = caption ? captionContent : regularContent;
	return content;
}

export default WrapText;
