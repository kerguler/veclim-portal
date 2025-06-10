import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
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
} from "@kerguler/recharts";
import { useRef } from "react";
import { setBrushData,setBrusDataY } from "store";
import "./RechartsPlot.css";
import "./rechart.css";

import CustomXAxisTick from '../chartComponents/CustomXAxisTick/CustomXAxisTick';
import CustomLegend from '../chartComponents/CustomLegend/CustomLegend';
import CustomTooltip from '../chartComponents/CustomTooltip/CustomTooltip';
import useYsliderPositioning from 'customHooks/useYsliderPositioning';
import ChartCalculatorService from '../services/ChartCalculatorService';
import useDirectorFun from 'customHooks/useDirectorFun';
import { setBrushRange } from 'store';
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
		brushDatay,
		brushRange,
		plotReady,
		mapVector,
		chartParameters:parameters,
	} = useDirectorFun(direction);
	const brushDataYL = useSelector(
	(state) => state.fetcher.fetcherStates.menu.left.chart.brush.brushDatayL)
	const brushDataYR = useSelector(
	(state) => state.fetcher.fetcherStates.menu.left.chart.brush.brushDatayR)
	useEffect(() => {
		if (plotReady && plotMat && plotMat.length > 0) {
			const { date, ...restObj } = plotMat[0];

			argRef.current.keys = plotReady && Object.keys(restObj);
		}
	}, [plotMat, plotReady, vectorName]);

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

	const [transform, setTransform] = useState([0, 0]);

	useYsliderPositioning(setTransform);
	const scrlPars = {
		minmaxId: { min: 0, max: 100 },
		minmaxL: { min: 0, max: -1 },
		minmaxR: { min: 0, max: -1 },
		scrollScl: 4.0,
		brushDataYL: { min: 0, max: -1 },
		brushDataYR: { min: 0, max: -1 },
		pars: {
			plottedKeys: parameters.plottedKeys.map((k) => k),
			labels: parameters.labels.map((k) => k),
			colors: parameters.colors.map((k) => k)
		},
	};
	const scrlRef = useRef(scrlPars);
	let s = scrlRef.current;

	let d = dateRef.current && dateRef.current;
	const keyRef = useRef([]);

	const formatYAxisTick = (value) => {
		if (typeof value === 'number') {
			return value.toFixed(2);
		}
		return value; // If not a number, return it as is
	};
	useEffect(() => {
	
			plotMat &&
				ChartCalculatorService.decideBrushRangeAlbo(
					parameters,
					plotMat,
					dispatch,
					d,
					brushRange,
				);
	
	}, [plotMat, vectorName]);

	
	const handleBrushChange = (range) => {
		ChartCalculatorService.handleBrushChange(
			range,
			dispatch,
			plotMat,
			setBrushRange,
			direction,
		);
	};

	useEffect(() => {
		s.pars = {
			plottedKeys: parameters.plottedKeys.map((k) => k),
			labels: parameters.labels.map((k) => k),
			colors: parameters.colors.map((k) => k)
		};
		s.minmaxL = { min: 0, max: -1 };
		s.minmaxR = { min: 0, max: -1 };
		let s2 = {};
		parameters.plottedKeys.forEach((k, i) => {
			s2[i] = { min: 0, max: -1 };
			plotMat &&
				plotMat.forEach((d) => {
					if (d[k] < s2[i].min) s2[i].min = d[k];
					if (d[k] > s2[i].max) s2[i].max = d[k];
					if ( ("orientation" in parameters) && (k in parameters.orientation) && (parameters.orientation[k] == "right")) {
						if (d[k] < s.minmaxR.min) s.minmaxR.min = d[k];
						if (d[k] > s.minmaxR.max) s.minmaxR.max = d[k];
					} else {
						if (d[k] < s.minmaxL.min) s.minmaxL.min = d[k];
						if (d[k] > s.minmaxL.max) s.minmaxL.max = d[k];
					}
				});
		});
		//
		for (let i in s2) {
			if ( (s2[i].min == 0) && (s2[i].max == -1) ) {
				s.pars.plottedKeys.splice(i,1);
				s.pars.labels.splice(i,1);
				s.pars.colors.splice(i,1);
			}
		}
		//
		s.brushDataYL = { min: s.minmaxL.min, max: s.minmaxL.max };
		s.brushDataYR = { min: s.minmaxR.min, max: s.minmaxR.max };
	}, [
		plotMat,
		dispatch,
		s,
		s.minmax.min,
		s.minmax.max,
		vectorName,
	]);

	// const handleBrushChangeY = (range) => {
	// 	ChartCalculatorService.handleBrushChangeY(
	// 		range,
	// 		scrlRef,
	// 		dispatch,
	// 		setBrushDatay,
	// 		direction,
	// 	);
	// };

		let renderedLines = s.pars.plottedKeys.map((key, index) => {
		let uniqueKey = `${key}-${index}`;
		keyRef.current.push(uniqueKey);
		if ( ("lineStyle" in parameters) && 
			 (key in parameters.lineStyle) && 
			 (parameters.lineStyle[key] === "dots") ) {
				return (
					<Line
						id={uniqueKey}
						key={uniqueKey}
						yAxisId={ ("orientation" in parameters) && 
								  (key in parameters.orientation) && 
								  (parameters.orientation[key] === "right") ? "right": "left" }
						type="linear"
						dataKey={key}
						stroke={s.pars.colors[index]}
						strokeDasharray="5 5"
						strokeWidth="2.5"
						dot={false}
						>
						{" "}
					</Line>
		) }
		return (
			<Line
				id={uniqueKey}
				key={uniqueKey}
				yAxisId={ ("orientation" in parameters) && 
						  (key in parameters.orientation) && 
						  (parameters.orientation[key] === "right") ? "right": "left" }
				type="monotone"
				dataKey={key}
				stroke={s.pars.colors[index]}
				strokeWidth="1.5"
				dot={false}
				>
				{" "}
			</Line>
		);
	});

	let renderedAxes = [];
	let col = s.pars.colors[0];
	if (! ((brushDataYL.min == 0) && (brushDataYL.max == -1)) ) {
		if ( "orientation" in parameters ) {
			for (let i=0; i<s.pars.colors.length; i++) {
				col = s.pars.colors[i];
				if ( !(s.pars.plottedKeys[i] in parameters.orientation) || (parameters.orientation[s.pars.plottedKeys[i]] == "left") ) {
					break;
				}
			}
		}
	}
	renderedAxes.push( (
			<YAxis
			display={(brushDataYL.min == 0) && (brushDataYL.max == -1) ? "none" : "true"}
			yAxisId="left"
			key="left-0"
			domain={[brushDataYL.min, brushDataYL.max]}
			allowDataOverflow={true}
			tickFormatter={formatYAxisTick}
			stroke={col}
			/>
		) 
	);
	col = s.pars.colors[0];
	if (! ((brushDataYR.min == 0) && (brushDataYR.max == -1)) ) {
		if ( "orientation" in parameters ) {
			for (let i=0; i<s.pars.colors.length; i++) {
				col = s.pars.colors[i];
				if ( (s.pars.plottedKeys[i] in parameters.orientation) && (parameters.orientation[s.pars.plottedKeys[i]] == "right") ) {
					break;
				}
			}
		}
	}
	renderedAxes.push( (
			<YAxis
			display={(brushDataYR.min == 0) && (brushDataYR.max == -1) ? "none" : "true"}
			yAxisId="right"
			key="right-0"
			domain={[brushDataYR.min, brushDataYR.max]}
			allowDataOverflow={true}
			tickFormatter={formatYAxisTick}
			stroke={col}
			orientation="right"
			/>
		) 
	);

	if (!plotMat || plotMat.length === 0) {
		return <div>Loading data...</div>;
	}
	// console.log({ brushData, xBrushRange, d });

	return (
		<ResponsiveContainer
			key={`${direction}`}
			maxHeight={400}
			maxWidth={600}
		>
			<LineChart
				id='line-chart'
				key={`line-chart-${direction}`}
				className='chart'
				width={500}
				height={400}
				data={plotMat}
				margin={{ top: 5, right: -25, left: 20, bottom: 5 }}
			>
				{renderedLines}
				<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
				<XAxis
					key={`xaxis${direction}`}
					dataKey='date'
					tick={
						<CustomXAxisTick
							key={`${direction}`}
							direction={direction}
							brushData={brushData}
							argRef={argRef}
						/>
					}
				/>
				{renderedAxes}
				<Brush
					key={`brushx${direction}`}
					className='myBrush'
					dataKey='date'
					height={15}
					data={plotMat}
					onChange={handleBrushChange}
					startIndex={d.index[0]}
					endIndex={d.index[1]}
					//  startIndex={brushRange.startIndex}
					//  endIndex={brushRange.endIndex}
				/>
				<Tooltip
					contentStyle={{ margin: '20px' }}
					content={
						<CustomTooltip
							keys={argRef.current.keys}
							parameters={parameters}
						/>
					}
				/>
				<Legend
					key={'legend'}
					wrapperStyle={{
						top: "-10px",
						right: 0,
						border: '1px solid black',
						borderRadius: '0.5rem',
						background: 'white',
						padding: '0rem',
					}}
					className='myLegend'
					layout='box'
					align='top'
					margin={10}
					content={
						<CustomLegend key={"customLegend"} parameters={s.pars} />
					}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

export default RechartsPlot;
