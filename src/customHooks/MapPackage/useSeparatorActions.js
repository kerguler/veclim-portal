import { useEffect } from "react";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { useDispatch, useSelector } from "react-redux";
import { setDividerPosition } from "store";
function useSeparatorActions(mapParRef) {
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const tileArray = useSelector(
		(state) => state.fetcher.fetcherStates.tileArray
	);
	const dispatch = useDispatch();
	useEffect(() => {
		const handleMarkers = () => {
			PackageMapServices.markerHandler(mapParRef, 4, vectorName, dispatch);
		};
		const handleSepClick = (e) => {
			console.log("clicked on separator");
			
			handleMarkers();
			e.stopPropagation();
		};
		const handleDividerInput = (e) => {
			const sliderValue = e.target.value; 
dispatch(setDividerPosition(sliderValue));			
		
		  };
		const sliderElement = document.querySelector(".leaflet-sbs-range");

		// 2) Attach the event listener
		if (sliderElement) {
		  // 'input' fires continuously while the user drags,
		  // 'change' fires only after releasing the slider
		  sliderElement.addEventListener("input", handleDividerInput);
		}
	
		let circularHandle = document.querySelector(".leaflet-sbs-range ");
		circularHandle && circularHandle.addEventListener("click", handleSepClick);
		return () => {
			circularHandle &&
				circularHandle.removeEventListener("click", handleSepClick);
                circularHandle=null
				if (sliderElement) {
					sliderElement.removeEventListener("input", handleDividerInput);
				  }
			};

	}, );
}

export default useSeparatorActions;
