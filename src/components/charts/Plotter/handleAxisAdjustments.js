import { setYaxisInfo } from 'store';
import { setBrushDatay } from 'store';
function getMinMaxForKey(data, keyName) {
  const values = data
    .map((obj) => {
      // Clone primitive to prevent read-only reference
      const val = obj[keyName];
      return typeof val === 'number' ? val : null;
    })
    .filter((val) => val !== null);

  const min = Math.min(...values);
  const max = Math.max(...values);

  return { min, max };
}
function handleAxisAdjustments(plotMat, chartParameters, vectorName, argKeys, s3Ref, dispatch) {
  let s3 = s3Ref.current;
  if (!argKeys || argKeys.length === 0 || !plotMat || plotMat.length === 0) return;

  let brushDataYL = { min: Infinity, max: -Infinity };
  let brushDataYR = { min: Infinity, max: -Infinity };
  let minmaxL = { min: Infinity, max: -Infinity };
  let minmaxR = { min: Infinity, max: -Infinity };
  argKeys.forEach((key) => {
    const { min, max } = getMinMaxForKey(plotMat, key);
    s3 = { ...s3, [key]: { min, max } };
  });
  'orientation' in chartParameters &&
    Object.keys(chartParameters.orientation).map((key) => {
      if (chartParameters.orientation[key] === 'right') {
        Object.keys(s3)
          .filter((k) => k.includes(key))
          .forEach((key) => {
            s3[key]['orientation'] = 'right';
          });
      }
    });
  Object.keys(s3).forEach((key) => {
    s3[key]?.orientation || (s3[key]['orientation'] = 'left');
  });
  Object.keys(s3).forEach((key) => {
    const val = s3[key];
    if (val.min === Infinity || val.max === -Infinity) {
      delete s3[key];
    }
  });

  Object.keys(s3)
    .filter((key) => s3[key].orientation === 'left')
    .forEach((key) => {
      if (s3[key].min < minmaxL.min) minmaxL.min = s3[key].min;
      if (s3[key].max > minmaxL.max) minmaxL.max = s3[key].max;
    });

  Object.keys(s3)
    .filter((key) => s3[key].orientation === 'right')
    .forEach((key) => {
      if (s3[key].min < minmaxR.min) minmaxR.min = s3[key].min;
      if (s3[key].max > minmaxR.max) minmaxR.max = s3[key].max;
    });
  brushDataYL = { min: minmaxL.min, max: minmaxL.max };
  brushDataYR = { min: minmaxR.min, max: minmaxR.max };
  dispatch(setYaxisInfo({ direction: 'left', value: s3 }));
  plotMat &&
    dispatch(
      setBrushDatay({
        direction: 'left',
        value: { left: brushDataYL, right: brushDataYR },
      })
    );
}

export default handleAxisAdjustments;
