import MyMap from "./MyMap/MyMap";
import DateDisplay from "./DateDisplay/DateDisplay";
const MapWithDate = () => {
	return (
		<div className="map-container">
			<MyMap maxZoom={7} />

			<DateDisplay />
		</div>
	);
};

export default MapWithDate;
