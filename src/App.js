import React from "react";

import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "styles/Theme1.css";
import "styles/App.css";
import CookieHandler from "./components/cookieConsent/CookieHandler";
import { useUserLocation } from "./store/apis/utils";

const GenericPage = lazy(() => import("pages/GenericPage/GenericPage"));
const NoPage = lazy(() => import("pages/NoPage"));
const MapPackageLanding = lazy(() => import("pages/MapPackageLanding"));
function App() {
	useUserLocation();
	return (
		<div className="app">
			<div className="page-container">
				<CookieHandler></CookieHandler>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path="/" element={<GenericPage />} />
						<Route path="/Project" element={<GenericPage />} />
						<Route path="/Policy" element={<GenericPage />} />
						<Route path="/Methods/TigerMosquito" element={<GenericPage />} />
						<Route path="/Methods/SandFly" element={<GenericPage />} />
						<Route path="/404" element={<NoPage />} />
						<Route path="/MapPage" element={<MapPackageLanding />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	);
}

export default App;
