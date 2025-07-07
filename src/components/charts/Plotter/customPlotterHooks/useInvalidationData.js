import { useEffect } from 'react';
import useDirectorFun from 'customHooks/useDirectorFun';
function useInvalidationData({ dataTs, isFetching }) {
	const {
		invalidateTsData,
		invalidateSimData,
		dispatch,
		setMessengerDir,
		messenger,
		mapPagePositionLeft,
	} = useDirectorFun('left');

	// useEffect(() => {
	// 	dataTs &&
	// 		dispatch(
	// 			setMessengerDir({
	// 				id: 12,
	// 				message: `There is no data available for the position chosen lat:${mapPagePositionLeft.lat.toFixed(
	// 					2
	// 				)} lng: ${mapPagePositionLeft.lng.toFixed(2)}`,
	// 				isError: true,
	// 			})
	// 		);
	// }, [
	// 	dataTs,
	// 	dispatch,
	// 	mapPagePositionLeft.lat,
	// 	mapPagePositionLeft.lng,
	// 	setMessengerDir,
	// ]);

	useEffect(() => {
		// dispatch(
		// 	setMessengerDir({
		// 		id: 0,
		// 		message: `New time-series data has arrived for lat:${mapPagePositionLeft.lat.toFixed(
		// 			2
		// 		)} lng:${mapPagePositionLeft.lng.toFixed(
		// 			2
		// 		)}  click confirm to receive results for the new coordinates`,
		// 		isError: false,
		// 	})
		// );
		// if (dataTs?.presence?.albopictus && dataTs.presence.albopictus.length > 0) {
		// 	dispatch(
		// 		setMessengerDir({
		// 			isError: false,
		// 			id: 1,
		// 			message: "no time series data are available for these coordintes",
		// 		})
		// 	);
		// }
	}, [dataTs, dispatch, setMessengerDir]);
}

export default useInvalidationData;

// useEffect(() => {
// 	// invalidateSimData &&
// 	// 	dispatch(
// 	// 		setMessengerDir({
// 	// 			...messenger,
// 	// 			id: 10,
// 	// 			message: "new ts data is being fetched",
// 	// 		})
// 	// 	);

// 	// dataTs &&
// 	// 	invalidateSimData &&
// 	// 	dispatch(
// 	// 		setMessengerDir({
// 	// 			id: 11,
// 	// 			message: `Ts data has arrived for lat:${mapPagePositionLeft.lat.toFixed(
// 	// 				2
// 	// 			)} lng:${mapPagePositionLeft.lng.toFixed(
// 	// 				2
// 	// 			)}, click submit to receive results for the new coordinates`,
// 	// 		})
// 	// 	);
// }, [
// 	invalidateSimData,
// 	isFetching,
// 	dataTs,
// 	mapPagePositionLeft.lat,
// 	mapPagePositionLeft.lng,
// ]);
