import "./GenericPage.css";
import "styles/Theme1.css";
import NavBarContainer from "components/NavBar/NavBarContainer";
import LeftPanel from "components/LeftPanel/LeftPanel";
import DesktopContentWrapper from "./DesktopContentWrapper";
function GenericPage() {
	return (
		<>
			<NavBarContainer />
			<LeftPanel page="home" displayContent displayNews />
			<DesktopContentWrapper />
		</>
	);
}

export default GenericPage;
