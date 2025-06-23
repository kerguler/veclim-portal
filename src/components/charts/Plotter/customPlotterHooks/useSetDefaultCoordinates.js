import useDirectorFun from "customHooks/useDirectorFun";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
import { setMapPagePosition } from "store";
function useSetDefaultCoordinates(direction) {
	const dispatch = useDispatch();
	const { mapPagePosition, vectorName } = useDirectorFun(direction);
	useEffect(() => {
		if (direction === "left") {
			if (!mapPagePosition.lat) {
				if (vectorName === "albopictus") {
					dispatch(
						setMapPagePosition(
							PackageMapServices.defaultWorldCenter,
						),
					);
				} else {
					dispatch(
						setMapPagePosition(PackageMapServices.defaultCypCenter),
					);
				}
			}
		}
	}, [vectorName, dispatch, mapPagePosition, direction, setMapPagePosition]);
}

export default useSetDefaultCoordinates;
