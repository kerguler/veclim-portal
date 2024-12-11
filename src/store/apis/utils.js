import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserPosition } from "../../store";
import { useCookies } from "react-cookie";
import { setLocationRequested, setGlobalPosition } from "../../store";

export function dateToString(today, sep = "") {
	let d_raw = today.getDate();
	let m_raw = today.getMonth() + 1;
	let y = today.getFullYear();

	var d, m;

	if (d_raw < 10) {
		d = "0" + d_raw.toString();
	} else {
		d = d_raw.toString();
	}
	if (m_raw < 10) {
		m = "0" + m_raw.toString();
	} else {
		m = m_raw.toString();
	}

	return y.toString() + sep + m.toString() + sep + d.toString();
}

export function getCurrentDate(sep = "") {
	let today = new Date();
	return dateToString(today, (sep = sep));
}

export function getDateRange(sep = ":") {
	let today = new Date();
	let tomorrow = new Date();
	today.setDate(today.getDate() - 7 * 30);
	tomorrow.setDate(tomorrow.getDate() + 7 * 30);
	return dateToString(today, "-") + sep + dateToString(tomorrow, "-");
}

export function useUserLocation() {
	const [cookies] = useCookies(["cookieConsent"]);
	const locationRequested = useSelector(
		(state) => state.location.locationRequested
	);
	const dispatch = useDispatch();

	const handleLocationFound = useCallback(
		(position) => {
			const { latitude, longitude } = position.coords;
			const updatedPosition = { lat: latitude, lng: longitude };

			// dispatch(setUserPosition(updatedPosition));
			dispatch(setGlobalPosition(updatedPosition));
		},
		[dispatch]
	);

	const handleLocationError = (error) => {
		dispatch(setGlobalPosition({ lat: 35.1966527, lng: 33.3217152 }));
		// console.log(error);
	};

	const handleRequestLocation = useCallback(() => {
		navigator.geolocation.getCurrentPosition(
			handleLocationFound,
			handleLocationError
		);
	}, [handleLocationFound]);
	// useEffect(() => {
	//   cookies.cookieConsent && setConsentGiven(true);
	// });

	useEffect(() => {
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			if (result.state === "denied" && locationRequested) {
				// window.confirm("Location Permission is required for this action");
				dispatch(setGlobalPosition({ lat: 35.1966527, lng: 33.3217152 }));
				dispatch(setUserPosition({ lat: 35.1966527, lng: 33.3217152 }));
				dispatch(setLocationRequested(false));
			}
		});

		if (navigator.geolocation && locationRequested) {
			handleRequestLocation();
		} else {
			// window.prompt("we couldnt get your location");
		}
	}, [
		handleRequestLocation,
		locationRequested,
		dispatch,
		cookies.cookieConsent,
	]);

	return;
}
