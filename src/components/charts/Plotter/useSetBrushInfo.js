import { useEffect } from "react";
import { setBrushData } from "store";
import { setBrushRange } from "store";
import { useDispatch, useSelector } from "react-redux";
function useSetBrushInfo(plotMat, direction) {
	const dispatch = useDispatch();
	const brushData = useSelector(
		(state) => state.mapMenu.left.chart.brush.brushData,
	);
	useEffect(() => {
		if (plotMat) {
			plotMat && dispatch(setBrushData({ direction, value: plotMat }));
			dispatch(
				setBrushRange({
					direction,
					value: { startIndex: 0, endIndex: plotMat.length - 1 },
				}),
			);
		} else {
			dispatch(
				setBrushData({
					direction,
					value: { direction, value: { startIndex: 0, endIndex: 0 } },
				}),
			);
		}
	}, [dispatch, plotMat, brushData, setBrushRange, setBrushData]);
}

export default useSetBrushInfo;
