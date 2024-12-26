import { useDispatch, useSelector } from "react-redux";
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
	const args = {
		years: { firstYear: null, lastYear: null },
		date: null,
		keys: null,
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
		brushData,
		vectorName,
		setBrushRangeDir,
		setBrushDatayDir,
		setBrushDataDir,
		brushDatay,
		xBrushRange,
		plotReady,
		mapVector,
		chartParameters,
	} = useDirectorFun(direction);

	useEffect(() => {
		if (plotReady && plotMat && plotMat.length > 0) {
			const { date, ...restObj } = plotMat[0];

			argRef.current.keys = plotReady && Object.keys(restObj);
		}
	}, [plotMat, plotReady, vectorName]);

	useEffect(() => {
		if (plotMat) {
			plotMat && dispatch(setBrushDataDir(plotMat));
			dispatch(
				setBrushRangeDir({ startIndex: 0, endIndex: plotMat.length - 1 })
			);
		} else {
			dispatch(setBrushDataDir({ startIndex: 0, endIndex: 0 }));
		}
	}, [dispatch, plotMat, brushData, setBrushRangeDir, setBrushDataDir]);

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
	useEffect(() => {
		if (direction === "left") {
			plotMat &&
				ChartCalculatorService.decideBrushRangeAlbo(
					chartParameters,
					plotMat,
					dispatch,
					d,
					xBrushRange
				);
		} else {
			plotMat &&
				ChartCalculatorService.decideBrushRangeAlbo(
					chartParameters,
					plotMat,
					dispatch,
					d,
					xBrushRange
				);
		}
	}, [plotMat, vectorName]);
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
			plotMat.length > 0 &&
			plotMat.forEach((d) => {
				argRef.current.keys.forEach((k) => {
					if (d[k] < s.minmax.min) s.minmax.min = d[k];
					if (d[k] > s.minmax.max) s.minmax.max = d[k];
				});
			});
		s.brushDataY = { min: s.minmax.min, max: s.minmax.max };
		plotMat && dispatch(setBrushDatayDir(s.brushDataY));
	}, [
		plotMat,
		dispatch,
		s,
		s.minmax.min,
		s.minmax.max,
		vectorName,
		setBrushDatayDir,
	]);

	const handleBrushChangeY = (range) => {
		ChartCalculatorService.handleBrushChangeY(
			range,
			scrlRef,
			dispatch,
			setBrushDatayDir
		);
	};

	const renderedLines =
		plotMat &&
		Object.keys(chartParameters).length > 0 &&
		plotMat[0] &&
		Object.keys(plotMat[0]).length > 1 &&
		Object.keys(plotMat[0]).map((key, index) => {
			if (key === "date") return null;
			let uniqueKey = `${key}-${index}`;
			keyRef.current.push(uniqueKey);
			// deterimine color of the line
			let primaryKey = null;
			let secondaryKey = null;
			let color;
			if (key.split(".").length > 1) {
				primaryKey = key.split(".")[0];
				secondaryKey = key.split(".")[1];

				if (primaryKey in chartParameters.sliceInfo) {
					if (
						secondaryKey in chartParameters.sliceInfo[primaryKey].sliceColors
					) {
						color =
							chartParameters.sliceInfo[primaryKey].sliceColors[secondaryKey] ||
							"black";
					}
				}
			} else {
				primaryKey = key;
				color = chartParameters.sliceInfo[primaryKey].sliceColors["slice0"];
			}

			return (
				<Line
					id={uniqueKey}
					key={`${uniqueKey}${direction}`}
					type="monotone"
					dataKey={key}
					stroke={color}
					strokeWidth="1.5"
					dot={false}
				>
					{" "}
				</Line>
			);
		});

	if (!plotMat || plotMat.length === 0) {
		return <div>Loading data...</div>;
	}
	return (
		<ResponsiveContainer key={`${direction}`} maxHeight={400} maxWidth={600}>
			<LineChart
				id="line-chart"
				key={`line-chart-${direction}`}
				className="chart"
				width={500}
				height={400}
				data={plotMat}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				{renderedLines}
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis
					key={`xaxis${direction}`}
					dataKey="date"
					tick={
						<CustomXAxisTick
							key={`${direction}`}
							direction={direction}
							brushData={brushData}
							argRef={argRef}
						/>
					}
				/>
				<YAxis
					key={`yaxis${direction}`}
					domain={[brushDatay.min, brushDatay.max]}
					allowDataOverflow={true}
					tickFormatter={formatYAxisTick}
				/>
				<Brush
					key={`brushx${direction}`}
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
					content={
						<CustomTooltip
							keys={argRef.current.keys}
							parameters={chartParameters}
						/>
					}
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
						<CustomLegend
							keys={argRef.current.keys}
							key={"customLegend"}
							direction={direction}
						/>
					}
				/>
				<g
					className="brushY-wrapper"
					style={{
						transform: `translate(${transform[0]}px, ${transform[1]}px)`,
					}}
				>
					<BrushY
						key={`brushy${direction}`}
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
