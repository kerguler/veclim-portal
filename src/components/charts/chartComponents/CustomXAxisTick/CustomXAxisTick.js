import React, { useRef } from 'react';
import { useEffect } from 'react';
const CustomXAxisTick = ({ x, y, payload, argRef, brushData }) => {
  const date = new Date(payload.value);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.toLocaleString('en-US', { year: 'numeric' });
  const day = date.getDate();
  let a = argRef.current && argRef.current;
  useEffect(() => {
    const firstDate = new Date(brushData[0].date);
    const firstYear = firstDate.getFullYear();

    const lastDate = new Date(brushData[brushData.length - 1].date);

    const lastYear = lastDate.getFullYear();
    a.years = [firstYear, lastYear];
    const year = date.getFullYear();
    a.date = { month, year };
  }, []);
  if (!a.date || a.years[0] !== a.years[1]) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={8} textAnchor="end" fill="#666">
          {day} {month}
        </text>
        <text x={0} y={0} dy={18} textAnchor="end" fill="#666">
          {year}
        </text>
      </g>
    );
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-3} y={0} dy={8} textAnchor="end" fill="#666">
        {day}
      </text>
      <text x={-3} y={0} dy={18} textAnchor="end" fill="#666">
        {month}
      </text>
    </g>
  );
};

export default CustomXAxisTick;
