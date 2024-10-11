import caps from "assets/capitals.json";
import SearchBar from "./SearchBar/SearchBar";
import "./LiveSearchCaps.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setUserPosition,
	setGlobalPosition,
	setShowInstructions,
	setLocationRequested,
} from "store";
import { setShowSearchBar } from "store";
import { useUserLocation } from "store/apis/utils";

function LiveSearchCaps({ showInstructions }) {
	const dispatch = useDispatch();
	useUserLocation();
	const [showList, setShowList] = useState(false);
	const [selectedTerm, setSelectedTerm] = useState(null);
	const [myRenderedList, setMyRenderedList] = useState([]);
	const searchBarState = useSelector((state) => state.searchBar.showSearchBar);
	const userLocationData = useSelector((state) => state.location.userPosition);

	const currentLocationName = useSelector(
		(state) => state.location.locationName
	);

	useEffect(() => {
		const myRenderedList = caps.filter((cap) => {
			return cap.CapitalName.toLowerCase().includes(
				currentLocationName.toLowerCase()
			);
		});
		setMyRenderedList(myRenderedList);
	}, [currentLocationName, dispatch]);

	const handleSearchTermSubmit = (value) => {
		setShowList(false);
		dispatch(setShowSearchBar(false));
		let submittedLocation = caps.filter((item) => {
			return item.CapitalName.toLowerCase().includes(value.toLowerCase());
		});
		if (!submittedLocation || submittedLocation.length === 0) {
			dispatch(setUserPosition(userLocationData));
		} else {
			if (submittedLocation[0].CountryName === "YourCountry") {
				navigator.permissions.query({ name: "geolocation" }).then((result) => {
					if (result.state === "granted") {
						dispatch(setShowInstructions(false));
						dispatch(setLocationRequested(true));
					} else {
						dispatch(setShowInstructions(true));
						dispatch(setLocationRequested(true));
					}
				});
			} else {
				let pos = {
					lat: parseFloat(submittedLocation[0].CapitalLatitude),
					lng: parseFloat(submittedLocation[0].CapitalLongitude),
				};
				dispatch(setGlobalPosition(pos));
				dispatch(setUserPosition(pos));
			}
		}
	};
	const handleListClick = (item) => {
		handleSearchTermSubmit(item.CapitalName);
		setSelectedTerm(item.CapitalName);
		setShowList(false);
		dispatch(setShowSearchBar(false));
	};
	let content = myRenderedList.map((item) => {
		return (
			<div
				value={item.CapitalName}
				key={item.CountryName}
				onClick={() => handleListClick(item)}
				className="city-list-item"
			>
				{item.CapitalName}
			</div>
		);
	});
	const handleShowList = (value) => {
		setShowList(value);
	};
	// TODO: ON MOUSE LEAVE BURADA OLMALI BIR TANESI
	return (
		<div className="search-bar-master-container">
			<div className="search-bar-container">
				<SearchBar
					selectedTerm={selectedTerm}
					onSubmit={handleSearchTermSubmit}
					showTheList={handleShowList}
				></SearchBar>
			</div>

			{showList && <div className="city-list">{content}</div>}
		</div>
	);
}

export default LiveSearchCaps;
