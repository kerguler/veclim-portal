import { useDispatch } from 'react-redux';
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
} from '@kerguler/recharts';
import { useRef } from 'react';
import './RechartsPlot.css';
import './rechart.css';
import CustomXAxisTick from '../chartComponents/CustomXAxisTick/CustomXAxisTick';
import CustomLegend from '../chartComponents/CustomLegend/CustomLegend';
import CustomTooltip from '../chartComponents/CustomTooltip/CustomTooltip';
import ChartCalculatorService from '../services/ChartCalculatorService';
import useDirectorFun from 'customHooks/useDirectorFun';
import { setBrushRange } from 'store';
import useSetBrushInfo from './useSetBrushInfo';
import { useMemo } from 'react';
import handleAxisAdjustments from './handleAxisAdjustments';
import { useState } from 'react';
function RechartsPlot({ direction, plotMat }) {
  const args = {
    years: { firstYear: null, lastYear: null },
    date: null,
    keys: null,
  };

  const s3Ref = useRef({});
  let s3 = s3Ref.current;
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
    chartParameters,
    yaxisInfo,
    openItems,
  } = useDirectorFun(direction);
  const [activeKeys, setActiveKeys] = useState(() => {
    // start with everything active
    return Object.keys(chartParameters.sliceInfo).flatMap((gid) =>
      Object.keys(chartParameters.sliceInfo[gid].sliceLabels).map(
        (sliceKey) => `${gid}.${sliceKey}`
      )
    );
  });

  const legendHostRef = useRef(null);
  const [legendOpen, setLegendOpen] = useState(false);

  let d = dateRef.current && dateRef.current;
  const brushDataYL = brushDatay.left;
  const brushDataYR = brushDatay.right;

  // const { date, ...restObj } = plotMat[0];
  // const keys = Object.keys(restObj);
  // argRef.current.keys = keys;
  const argKeys = useMemo(() => {
    if (plotMat && plotMat.length > 0) {
      const { date, ...restObj } = plotMat[0];
      return Object.keys(restObj);
    }

    return [];
  }, [plotMat]);

  useEffect(() => {
    if (argKeys.length > 0) {
      argRef.current.keys = argKeys;
      // Optionally: fire some side effect here
    }
  }, [argKeys]);
  argKeys.forEach((key) => {
    s3 = { ...s3, [key]: { min: Infinity, max: -Infinity } };
  });

  useMemo(() => {
    handleAxisAdjustments(
      plotMat,
      chartParameters,
      vectorName,
      argKeys,
      s3Ref,
      dispatch
    );
  }, [plotMat, chartParameters, vectorName, argKeys, s3Ref, dispatch]);

  // useAdjustAxes(plotMat, chartParameters, vectorName, argKeys);
  useSetBrushInfo(plotMat, direction);

  let sliceLabel = [];

  useEffect(() => {
    plotMat &&
      ChartCalculatorService.decideBrushRange(
        chartParameters,
        plotMat,
        dispatch,
        d,
        brushRange
      );
  }, [plotMat, vectorName]);
  const handleBrushChange = (range) => {
    ChartCalculatorService.handleBrushChange(
      range,
      dispatch,
      plotMat,
      setBrushRange,
      direction
    );
  };
  if (!plotMat || plotMat.length === 0) {
    return <div>Loading data...</div>;
  }

  const formatYAxisTick = (value) => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value; // If not a number, return it as is
  };
  const renderedAxes = buildAxes(
    plotMat,
    chartParameters,
    brushDatay,
    yaxisInfo
  );

  const handleLegendToggle = (key) => {
    const sliceInfo = chartParameters.sliceInfo;
    console.log(key.split('.')[0]);
    // find group of clicked label
    console.log({ ObjectKeys: Object.keys(sliceInfo) });
    const groupId = key?.split('.')[0];
    console.log({ groupId });
    if (!groupId) return;

    const groupKeys = Object.keys(sliceInfo[groupId].sliceLabels).map(
      (sliceKey) => `${groupId}.${sliceKey}`
    );

    setActiveKeys((prev) => {
      const isActive = groupKeys.every((k) => prev.includes(k));

      if (isActive) {
        // deactivate entire group
        return prev.filter((k) => !groupKeys.includes(k));
      } else {
        // activate entire group
        return [...new Set([...prev, ...groupKeys])];
      }
    });

    console.log('WITHIN LEGEND TOGGLE', { activeKeys });
  };

  const renderedLines = buildLines(
    activeKeys,
    chartParameters,
    plotMat,
    direction,
    yaxisInfo
  );

  return (
    <>
      <div
        ref={legendHostRef}
        className="legend-host"
        style={{ width: '100%', margin: '6px 0 10px' }}
      />

      <ResponsiveContainer>
        <LineChart
          id="line-chart"
          key={`line-chart`}
          className="chart"
          width={500}
          height={400}
          data={plotMat}
          //  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}

          margin={{ top: 5, right: 0, left: 20, bottom: 5 }}
        >
          {renderedLines}
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            tick={
              <CustomXAxisTick
                // key={`${direction}`}
                direction={direction}
                brushData={brushData}
                argRef={argRef}
              />
            }
          />

          {renderedAxes}
          <Brush
            key={`brushx`}
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
            contentStyle={{ margin: '20px' }}
            content={
              <CustomTooltip
                keys={argRef.current.keys}
                parameters={chartParameters}
              />
            }
          />

          <Legend
            key={'legend'}
            wrapperStyle={{
              display: 'none',
            }}
            className="myLegend"
            layout="box"
            align="top"
            margin={10}
            content={
              <CustomLegend
                keys={argRef.current.keys}
                key={'customLegend'}
                direction={direction}
                legendButtonClick={handleLegendToggle}
                activeKeys={activeKeys}
                portalTargetRef={legendHostRef}
                isOpen={legendOpen}
                onToggle={() => setLegendOpen((prev) => !prev)}
              />
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default RechartsPlot;

function buildAxes(plotMat, chartParameters, brushDatay, yaxisInfo) {
  const brushDataYL = brushDatay.left;
  const brushDataYR = brushDatay.right;
  const formatYAxisTick = (value) => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value; // If not a number, return it as is
  };

  let renderedAxes = [];
  let leftCount = 0;
  let rightCount = 0;
  renderedAxes = Object.keys(yaxisInfo).map((key) => {
    if (yaxisInfo[key].orientation === 'right' && rightCount === 0) {
      rightCount = rightCount + 1;
      return (
        <YAxis
          display={
            yaxisInfo[key].min === Infinity && yaxisInfo[key].max === -Infinity
              ? 'none'
              : 'true'
          }
          yAxisId="right"
          key="right-0"
          domain={[brushDataYR.min, brushDataYR.max]}
          allowDataOverflow={true}
          tickFormatter={formatYAxisTick}
          stroke={
            chartParameters.sliceInfo[key.split('.')[0]]?.sliceColors?.slice0 ||
            'black'
          }
          orientation="right"
        />
      );
    } else if (yaxisInfo[key].orientation === 'left' && leftCount === 0) {
      leftCount++;
      if (yaxisInfo[key].min === Infinity || yaxisInfo[key].max === -Infinity) {
        return null;
      }
      return (
        <YAxis
          display={
            yaxisInfo[key].min === Infinity && yaxisInfo[key].max === -Infinity
              ? 'none'
              : 'true'
          }
          yAxisId="left"
          key="left-0"
          domain={[brushDataYL.min, brushDataYL.max]}
          allowDataOverflow={true}
          tickFormatter={formatYAxisTick}
          stroke={
            chartParameters.sliceInfo[key.split('.')[0]]?.sliceColors?.slice0 ||
            'black'
          }
        />
      );
    }
  });

  return renderedAxes;
}

function buildLines(
  activeKeys,
  chartParameters,
  plotMat,
  direction,
  yaxisInfo
) {
  if (yaxisInfo === undefined) {
    return null;
  }
  return (
    plotMat &&
    Object.keys(chartParameters).length > 0 &&
    plotMat[0] &&
    Object.keys(plotMat[0]).length > 1 &&
    Object.keys(plotMat[0]).map((key, index) => {
      if (key === 'date') return null;
      let uniqueKey = `${key}-${index}`;
      // deterimine color of the line
      let primaryKey = null;
      let secondaryKey = null;
      let color;
      if (key.split('.').length > 1) {
        primaryKey = key.split('.')[0];
        secondaryKey = key.split('.')[1];

        if (primaryKey in chartParameters.sliceInfo) {
          if (
            secondaryKey in chartParameters.sliceInfo[primaryKey].sliceColors
          ) {
            color =
              chartParameters.sliceInfo[primaryKey].sliceColors[secondaryKey] ||
              'black';
          }
        }
      } else {
        primaryKey = key;
        color = chartParameters.sliceInfo[primaryKey].sliceColors['slice0'];
      }
      let dotted =
        'lineStyle' in chartParameters &&
        primaryKey in chartParameters.lineStyle &&
        chartParameters.lineStyle[primaryKey] === 'dots';

      if (
        !yaxisInfo[key] ||
        yaxisInfo[key].min === Infinity ||
        yaxisInfo[key].max === -Infinity
      ) {
        return null;
      }
      let yDirection = yaxisInfo[key].orientation || 'left';
      return (
        <Line
          hide={!activeKeys.includes(key)}
          id={uniqueKey}
          key={uniqueKey}
          yAxisId={yDirection}
          type={dotted ? 'linear' : 'monotone'}
          dataKey={key}
          stroke={color}
          strokeWidth={dotted ? '2.5' : '1.5'}
          strokeDasharray={dotted ? '5 5' : '0'}
          dot={false}
          connectNulls={false}
        >
          {' '}
        </Line>
      );
    })
  );
}
