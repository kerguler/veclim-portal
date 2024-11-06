import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
import { setBrushData } from "store";
import "./RechartsPlot.css";
import "./rechart.css";

import CustomXAxisTick from "../chartComponents/CustomXAxisTick/CustomXAxisTick";
import CustomLegend from "../chartComponents/CustomLegend/CustomLegend";
import CustomTooltip from "../chartComponents/CustomTooltip/CustomTooltip";
import useYsliderPositioning from "customHooks/useYsliderPositioning";
import ChartCalculatorService from "../services/ChartCalculatorService";
import { setBrushDatay } from "store";
function RechartsPlot({ plotMat }) {
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
	const xBrushRange = useSelector(
		(state) => state.fetcher.fetcherStates.brushRange
	);
	const parameters = useSelector((state) => state.panel.chartParameters);
	const brushData = useSelector((state) => state.panel.brushData);
	const brushDatay = useSelector((state) => state.panel.brushDatay);

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
	useEffect(() => {
		dispatch(setBrushData(plotMat));
	}, [plotMat, dispatch]);

	
	const formatYAxisTick = (value) => {
		if (typeof value === "number") {
			return value.toFixed(2);
		}
		return value; // If not a number, return it as is
	};


	ChartCalculatorService.decideBrushRange(
		parameters,
		plotMat,
		dispatch,
		d,
		xBrushRange
	);


	const handleBrushChange = (range) => {
		console.log("range", range);
		ChartCalculatorService.handleBrushChange(range, dispatch, plotMat);
	};

	useEffect(() => {
		s.minmax = { min: 0, max: 0 };
		plotMat &&
			plotMat.forEach((d) => {
				parameters.plottedKeys.forEach((k) => {
					if (d[k] < s.minmax.min) s.minmax.min = d[k];
					if (d[k] > s.minmax.max) s.minmax.max = d[k];
				});
			});
		s.brushDataY = { min: s.minmax.min, max: s.minmax.max };
		dispatch(setBrushDatay(s.brushDataY));
	}, [
		plotMat,
		parameters.plottedKeys,
		dispatch,
		s.minmax.min,
		s.minmax.max,
		s,
	]);

	const handleBrushChangeY = (range) => {
		ChartCalculatorService.handleBrushChangeY(range, scrlRef, dispatch);
	};
	

	let renderedLines = parameters.plottedKeys.map((key, index) => {
		let uniqueKey = `${key}-${index}`;
		keyRef.current.push(uniqueKey);
		return (
			<Line
				id={uniqueKey}
				key={uniqueKey}
				type="monotone"
				dataKey={key}
				stroke={parameters.colors[index]}
				strokeWidth="1.5"
				dot={false}
			>
				{" "}
			</Line>
		);
	});
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
					content={<CustomTooltip parameters={parameters} />}
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
						<CustomLegend key={"customLegend"} parameters={parameters} />
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
