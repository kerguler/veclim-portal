import useDirectorFun from "customHooks/useDirectorFun";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";
function useSetDefaultCoordinates(direction) {
	const dispatch = useDispatch();
	const { mapPagePosition, vectorName, setMapPagePositionDir } =
		useDirectorFun(direction);
	useEffect(() => {
		if (direction === "left") {
			if (!mapPagePosition.lat) {
				if (vectorName === "albopictus") {
					dispatch(
						setMapPagePositionDir(PackageMapServices.defaultWorldCenter)
					);
				} else {
					dispatch(setMapPagePositionDir(PackageMapServices.defaultCypCenter));
				}
			}
		}
	}, [vectorName, dispatch, mapPagePosition, direction, setMapPagePositionDir]);
}

export default useSetDefaultCoordinates;
