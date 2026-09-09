import { lazy, Suspense } from "react";
import DateDisplay from "./DateDisplay/DateDisplay";

const MyMap = lazy(() => import("./MyMap/MyMap"));

// Inline styles here (not the MyMap.css classes) since that stylesheet
// ships inside the lazy chunk and won't be loaded yet while this shows.
const MapFallback = () => (
	<div style={{ position: "relative", width: "100%" }}>
		<div
			style={{
				height: "180px",
				width: "100%",
				background: "#ddd",
				borderRadius: "0.7rem",
			}}
		></div>
	</div>
);

const MapWithDate = () => {
	return (
		<div className="map-container">
			<Suspense fallback={<MapFallback />}>
				<MyMap maxZoom={7} />
			</Suspense>

			<DateDisplay />
		</div>
	);
};

export default MapWithDate;
