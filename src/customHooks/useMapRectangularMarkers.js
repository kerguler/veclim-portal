import { useSelector } from "react-redux";
import L from "leaflet";
function useMapRectangularMarkers() {
	const vectorName = useSelector((state) => {
		return state.vector.vectorName;
	});

	function roundPositionMosq(lat, lng) {
		let roundedLat = 0.0 + Math.round(lat / 0.25) * 0.25;
		let roundedLng = 0.0 + Math.round(lng / 0.25) * 0.25;
		return {
			lat: roundedLat,
			lng: roundedLng,
			res: [0.125, 0.125],
		};
	}
	function roundPositionSand(lat, lng) {
		let roundedLat = 0.009 + Math.round((lat - 0.009) / 0.0215) * 0.0215;
		let roundedLng = 0.0033 + Math.round((lng - 0.0033) / 0.0215) * 0.0215;
		return {
			lat: roundedLat,
			lng: roundedLng,
			res: [0.0215 / 2.0, 0.0215 / 2.0],
		};
	}
	let roundPosition;
	if (vectorName === "albopictus") {
		roundPosition = roundPositionMosq;
	} else {
		roundPosition = roundPositionSand;
	}
	const highlightMarkerFunc = (lat, lng, map, className, color) => {
		const newPosition = roundPosition(lat, lng);
		const highlightMarker = L.rectangle(
			[
				[
					newPosition.lat + newPosition.res[1],
					newPosition.lng - newPosition.res[0],
				],
				[
					newPosition.lat - newPosition.res[1],
					newPosition.lng + newPosition.res[0],
				],
			],
			{ className: className, color: color }
		).addTo(map);
		return highlightMarker;
	};

	return { roundPosition, highlightMarkerFunc };
}

export default useMapRectangularMarkers;
