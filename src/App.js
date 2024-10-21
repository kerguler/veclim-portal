import React from "react";

import { Route, Routes } from "react-router-dom";

import "styles/Theme1.css";
import "styles/App.css";
import CookieHandler from "./components/cookieConsent/CookieHandler";
import { useUserLocation } from "./store/apis/utils";
import GenericPage from "pages/GenericPage/GenericPage";
import NoPage from "./pages/NoPage";
// import MapPage from "./pages/MapPage";
import MapPageSandFly from "./pages/MapPageSandFly";
import LoginPage from "pages/LoginRegister/LoginPage/LoginPage";
import RegistrationPage from "pages/LoginRegister/RegistrationPage/RegistrationPage";
import { AvQueuePlayNext } from "material-ui/svg-icons";
import ApiWelcomePage from "pages/ApiWelcomePage/ApiWelcomePage";
import MapPackageLanding from "pages/MapPackageLanding";
import GenericMapPage from "pages/GenericMapPage";
function App() {
	useUserLocation();
	return (
		<div className="app">
			<div className="page-container">
				<CookieHandler></CookieHandler>

				<Routes>
					<Route path="/" element={<GenericPage />} />
					<Route path="/Project" element={<GenericPage />} />
					<Route path="/Policy" element={<GenericPage />} />
					<Route path="/Methods/TigerMosquito" element={<GenericPage />} />
					<Route path="/Methods/SandFly" element={<GenericPage />} />
					{/* <Route path="/MapPage" element={<MapPage />} />{" "} */}
					{/* <Route path="/MapPage/SandFly" element={<MapPageSandFly />} />{" "} */}
					<Route path="/404" element={<NoPage />} />
					<Route path="/MapPage" element={<MapPackageLanding />} />
					{/* <Route path="/login" element={<LoginPage />} />
					<Route path="/RegistrationPage" element={<RegistrationPage />} />
					<Route path="/ApiWelcome" element={<ApiWelcomePage />} /> */}
					{/* <Route path="/CustomMaps" element={<Fetcher/>} /> */}
				</Routes>
			</div>
		</div>
	);
}

export default App;
