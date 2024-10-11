import "./TemplatePage.css";
import usePageTexts from "customHooks/usePageTexts";
function TemplatePage() {
	const renderedContent = usePageTexts();
	return (
		<div className="template-container">
			<div className="template-content">
				{renderedContent.topper}
				<div className="bottom-container">
					<div className="bottom-container spacer"></div>
					{renderedContent.content}
				</div>
			</div>{" "}
		</div>
	);
}

export default TemplatePage;
