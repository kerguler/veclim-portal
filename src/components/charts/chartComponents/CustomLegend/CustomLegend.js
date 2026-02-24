import './CustomLegend.css';
import useDirectorFun from 'customHooks/useDirectorFun';
const CustomLegend = ({
  payload,
  keys,
  direction,
  legendButtonClick,
  activeKeys,
}) => {
  const { chartParameters } = useDirectorFun(direction);

  const labelByDataKey = Object.entries(chartParameters.sliceInfo).reduce(
    (acc, [gid, info]) => {
      Object.entries(info.sliceLabels).forEach(([sliceKey, label]) => {
        acc[`${gid}.${sliceKey}`] = label; // "g1.slice0" -> "This year"
      });
      return acc;
    },
    {}
  );

  const payload1 = Array.from(
    new Map(payload.map((item) => [item.dataKey, item])).values()
  );

  let preparedKeys = Object.keys(chartParameters.sliceInfo).flatMap((item) => {
    let tempArray = Object.keys(
      chartParameters.sliceInfo[item].sliceLabels
    ).map((element) => {
      return chartParameters.sliceInfo[item].sliceLabels[element];
    });
    return tempArray;
    // if (temp.length === 1) {
    // 	return chartParameters.sliceInfo[temp[0]].sliceLabels["slice0"];
    // } else {
    // 	return chartParameters.sliceInfo[temp[0]].sliceLabels[temp[1]];
    // }
  });
  const handleLegendButtonClick = (key) => {
    console.log(key);
    legendButtonClick(key);
  };
  {
    return (
      <div className="horizontal-legend">
        {payload1.map((entry) => (
          <li
            className="legend-list"
            key={entry.dataKey}
            style={{
              listStyle: 'none',
              padding: '1px 2px',
              marginRight: '2px',
              marginBottom: '2px',
              borderRadius: '5px',
              background: '#f0f0f0',
              transition: 'all 0.2s ease',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              ...(activeKeys.includes(entry.dataKey)
                ? {
                    // 🟢 Elevated
                    boxShadow:
                      '4px 4px 8px rgba(0,0,0,0.25), -2px -2px 6px rgba(255,255,255,0.7)',
                    transform: 'translateY(0px)',
                  }
                : {
                    // 🔴 Pressed / sunk
                    boxShadow:
                      'inset 3px 3px 6px rgba(0,0,0,0.25), inset -2px -2px 6px rgba(255,255,255,0.7)',
                    transform: 'translateY(1px)',
                  }),
            }}
          >
            <span
              onClick={() => legendButtonClick(entry.dataKey)}
              style={{
                color: entry.color,
                paddingRight: '2px',
                paddingLeft: '2px',
                opacity: activeKeys.includes(entry.dataKey) ? 1 : 0.5,
                cursor: 'pointer',
              }}
            >
              ●
            </span>

            <span
              style={{ paddingRight: '8px', cursor: 'pointer' }}
              onClick={() => legendButtonClick(entry.dataKey)}
            >
              {labelByDataKey[entry.dataKey] ?? entry.value}
            </span>
          </li>
        ))}
      </div>
    );
  }
};
export default CustomLegend;
