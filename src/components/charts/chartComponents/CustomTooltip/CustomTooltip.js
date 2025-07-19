import './CustomTooltip.css';

function CustomTooltip({ active, payload, label, parameters }) {
  const payload1 = Array.from(new Map(payload.map((item) => [item.value, item])).values());
  let preparedKeys = Object.keys(parameters.sliceInfo).flatMap((item) => {
    let tempArray = Object.keys(parameters.sliceInfo[item].sliceLabels).map((element) => {
      return parameters.sliceInfo[item].sliceLabels[element];
    });
    return tempArray;
  });
  if (active && payload1 && payload1.length) {
    //TODO:: fix the dodgy code coming up
    //hard coded test based on variable names slice1 slice 2 and slice 3
    // console.log({ parameters });
    // console.log({ payload1, preparedKeys });
    const RenderedTooltipElement = ({ entry, index }) => {
      let keyArray = entry.dataKey.split('.');
      console.log({ keyArray });
      let primaryKey, secondaryKey;
      if (keyArray.length > 1) {
        primaryKey = keyArray[0];
        secondaryKey = keyArray[1];
      } else {
        primaryKey = keyArray[0];
        secondaryKey = null;
      }
      let value;
      if (secondaryKey === null) {
        console.error('shouldnt be here');
        value = parameters.sliceInfo[primaryKey].sliceLabels;
      } else {
        value = parameters.sliceInfo[primaryKey].sliceLabels[secondaryKey];
      }
      console.log({ value });
      return (
        <span key={`${entry.value.toFixed(2)} - ${index}`}>
          {' '}
          {`${value}: ${entry.value.toFixed(2)}`}
        </span>
      );
    };

    let renderedTooltipvalues = payload1.map((entry, index) => {
      if (parameters.labels) {
        return (
          <p key={`${entry.dataKey}-${index}`} style={{ color: entry.color }}>
            <RenderedTooltipElement index={index} entry={entry} />
          </p>
        );
      } else {
        return (
          <p key={`${entry.dataKey}-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toFixed(2)}`}
          </p>
        );
      }
    });
    return (
      <div className="custom-tooltip">
        <h3>{`${label}`}</h3>
        {renderedTooltipvalues}
      </div>
    );
  } else {
    return null;
  }
}
export default CustomTooltip;
