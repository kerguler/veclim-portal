import useWindowSize from "customHooks/useWindowSize";
import TemplatePage from "pages/TemplatePage/TemplatePage";
import Footer from "components/Footer/Footer";
import "./DesktopContentWrapper.css";
function DesktopContentWrapper() {
	const { webApp } = useWindowSize();
	return (
		<div className="page-wrapper">
			{!webApp && <TemplatePage />}

			<Footer />
		</div>
	);
}

export default DesktopContentWrapper;
