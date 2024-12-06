import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Brush,
	BrushY,
} from "@kerguler/recharts";
import { useRef } from "react";
import "./RechartsPlot.css";
import "./rechart.css";

import CustomXAxisTick from "../chartComponents/CustomXAxisTick/CustomXAxisTick";
import CustomLegend from "../chartComponents/CustomLegend/CustomLegend";
import CustomTooltip from "../chartComponents/CustomTooltip/CustomTooltip";
import useYsliderPositioning from "customHooks/useYsliderPositioning";
import ChartCalculatorService from "../services/ChartCalculatorService";
import useDirectorFun from "customHooks/useDirectorFun";

function RechartsPlot({ direction, plotMat }) {
	if (direction === "right") {
		console.log("rerendering right ");
	}
	const args = {
		years: { firstYear: null, lastYear: null },
		date: null,
	};
	const dateRef = useRef({
		currentDate: null,
		dStart: null,
		dEnd: null,
		finalStart: null,
		finalEnd: null,
		index: [],
	});
	const argRef = useRef(args);
	const dispatch = useDispatch();

	const {
		chartParameters,
		brushData,
		vectorName,
		setBrushRangeDir,
		setBrushDatayDir,
		setBrushDataDir,
		brushDatay,
		xBrushRange,
		plotReady,
	} = useDirectorFun(direction);

	useEffect(() => {
		dispatch(setBrushDataDir(plotMat));
	}, [plotMat, dispatch, vectorName]);

	useEffect(() => {
		plotMat &&
			dispatch(
				setBrushRangeDir({ startIndex: 0, endIndex: plotMat.length - 1 })
			);
	}, [vectorName, dispatch, plotMat]);

	const [transform, setTransform] = useState([0, 0]);

	useYsliderPositioning(setTransform);
	const scrlPars = {
		minmaxId: { min: 0, max: 100 },
		minmax: { min: 0, max: 0 },
		scrollScl: 4.0,
		brushDataY: { min: 0, max: 0 },
	};
	const scrlRef = useRef(scrlPars);
	let s = scrlRef.current;

	let d = dateRef.current && dateRef.current;
	const keyRef = useRef([]);

	const formatYAxisTick = (value) => {
		if (typeof value === "number") {
			return value.toFixed(2);
		}
		return value; // If not a number, return it as is
	};
	if (direction === "left") {
		ChartCalculatorService.decideBrushRange(
			chartParameters,
			plotMat,
			dispatch,
			d,
			xBrushRange
		);
	} else {
		ChartCalculatorService.decideBrushRangeAlbo(
			chartParameters,
			plotMat,
			dispatch,
			d,
			xBrushRange
		);
	}
	const handleBrushChange = (range) => {
		ChartCalculatorService.handleBrushChange(
			range,
			dispatch,
			plotMat,
			setBrushRangeDir
		);
	};

	useEffect(() => {
		s.minmax = { min: 0, max: 0 };
		plotMat &&
			plotMat.forEach((d) => {
				chartParameters.plottedKeys.forEach((k) => {
					if (d[k] < s.minmax.min) s.minmax.min = d[k];
					if (d[k] > s.minmax.max) s.minmax.max = d[k];
				});
			});
		s.brushDataY = { min: s.minmax.min, max: s.minmax.max };
		dispatch(setBrushDatayDir(s.brushDataY));
	}, [
		plotMat,
		chartParameters.plottedKeys,
		dispatch,
		s,
		s.minmax.min,
		s.minmax.max,
	]);

	const handleBrushChangeY = (range) => {
		ChartCalculatorService.handleBrushChangeY(
			range,
			scrlRef,
			dispatch,
			setBrushDatayDir
		);
	};

	let renderedLines = chartParameters.plottedKeys.map((key, index) => {
		let uniqueKey = `${key}-${index}`;
		keyRef.current.push(uniqueKey);
		console.log({ key, chartParameters });
		return 			<Line
				id={uniqueKey}
				key={uniqueKey}
				type="monotone"
				dataKey={key}
				stroke={chartParameters.colors[index]}
				strokeWidth="1.5"
				dot={false}
			>
				{" "}
			</Line>
		
		
	});

	if (!plotMat || plotMat.length === 0) {
		return <div>Loading data...</div>;
	}

	return (
		<ResponsiveContainer maxHeight={400} maxWidth={600}>
			<LineChart
				id="line-chart"
				key={"line-chart"}
				className="chart"
				width={500}
				height={400}
				data={plotMat}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				{renderedLines}
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis
					dataKey="date"
					tick={<CustomXAxisTick brushData={brushData} argRef={argRef} />}
				/>
				<YAxis
					domain={[brushDatay.min, brushDatay.max]}
					allowDataOverflow={true}
					tickFormatter={formatYAxisTick}
				/>
				<Brush
					key={"brushx"}
					className="myBrush"
					dataKey="date"
					height={15}
					data={plotMat}
					onChange={handleBrushChange}
					startIndex={d.index[0]}
					endIndex={d.index[1]}
					//  startIndex={brushRange.startIndex}
					//  endIndex={brushRange.endIndex}
				/>

				<Tooltip
					contentStyle={{ margin: "20px" }}
					content={<CustomTooltip parameters={chartParameters} />}
				/>
				<Legend
					key={"legend"}
					wrapperStyle={{
						top: "10px",
						right: 0,
						border: "1px solid black",
						borderRadius: "0.5rem",
						background: "white",
						padding: "0rem",
					}}
					className="myLegend"
					layout="box"
					align="top"
					margin={10}
					content={
						<CustomLegend key={"customLegend"} parameters={chartParameters} />
					}
				/>
				<g
					className="brushY-wrapper"
					style={{
						transform: `translate(${transform[0]}px, ${transform[1]}px)`,
					}}
				>
					<BrushY
						key={"brushy"}
						className="myBrushY"
						dataKey=""
						height={150}
						width={15}
						data={plotMat}
						onChange={handleBrushChangeY}
					/>
				</g>
			</LineChart>
		</ResponsiveContainer>
	);
}

export default RechartsPlot;
