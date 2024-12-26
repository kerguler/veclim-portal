import { useEffect } from "react";
import useDirectorFun from "customHooks/useDirectorFun";
function useCheckChartParameters() {
	const { chartParameters, dispatch, messenger, setMessengerDir } =
		useDirectorFun("left");
	useEffect(() => {
		!chartParameters &&
			!Object.keys(chartParameters).length > 0 &&
			dispatch(
				setMessengerDir({
					...messenger,
					isError: true,
					message: "chart parameters are not available",
				})
			);
	}, [chartParameters, dispatch, messenger, setMessengerDir]);
}

export default useCheckChartParameters;
