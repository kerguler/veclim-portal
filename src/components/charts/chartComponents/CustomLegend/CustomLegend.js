import './CustomLegend.css';
import useDirectorFun from 'customHooks/useDirectorFun';
const CustomLegend = ({ payload, keys, direction }) => {
  const { chartParameters } = useDirectorFun(direction);
  const payload1 = Array.from(new Map(payload.map((item) => [item.value, item])).values());

  let preparedKeys = Object.keys(chartParameters.sliceInfo).flatMap((item) => {
    let tempArray = Object.keys(chartParameters.sliceInfo[item].sliceLabels).map((element) => {
      return chartParameters.sliceInfo[item].sliceLabels[element];
    });
    return tempArray;
    // if (temp.length === 1) {
    // 	return chartParameters.sliceInfo[temp[0]].sliceLabels["slice0"];
    // } else {
    // 	return chartParameters.sliceInfo[temp[0]].sliceLabels[temp[1]];
    // }
  });
  if (preparedKeys.length > 0) {
    return (
      <>
        <div className="horizontal-legend">
          {payload1.map((entry, index) => {
            if (entry.dataKey.split('.')[0] in chartParameters.sliceInfo) {
              return (
                <li className="legend-list" key={index}>
                  <span
                    style={{
                      color: entry.color,
                      paddingRight: '2px',
                    }}
                  >
                    ●
                  </span>
                  <span style={{ paddingRight: '8px' }}>{preparedKeys[index]}</span>
                </li>
              );
            }
            return null;
          })}
        </div>
      </>
    );
  } else {
    return (
      <ul>
        {payload1.map((entry, index) => (
          <li key={index}>
            <span style={{ color: entry.color, paddingRight: '8px' }}>●</span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  }
};
export default CustomLegend;
