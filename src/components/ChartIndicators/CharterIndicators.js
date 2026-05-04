import './ChartIndicators.css';
import { useFetchTimeSeriesDataQuery } from 'store';
import ChartLoadingSkeleton from '../skeleton/Skeleton';
import { parseDate, dateToString } from 'store/apis/utils';
import useDirectorFun from 'customHooks/useDirectorFun';
import { getVector } from 'vectors/registry';

function ChartIndicators() {
  const { mapPagePosition, vectorName, mapVector } = useDirectorFun('left');

  const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
    position: JSON.stringify(mapPagePosition),
    vectorName: mapVector, // use registry id for backend coherence
  });

  if (isFetching) {
    return (
      <div className="chart-indicators">
        <ChartLoadingSkeleton times={6} noBorder />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // ----- Registry metadata -----
  const vec = getVector(mapVector);
  const indicatorsCfg = vec?.indicators || {};

  const resolutionText = indicatorsCfg.resolution || '0.25° x 0.25°';

  const modelLabel = indicatorsCfg.model?.label || null;
  const modelUrl = indicatorsCfg.model?.url || null;
  const modelDescription = indicatorsCfg.model?.description || null;

  const covariates = indicatorsCfg.covariates || [];
  const showForecastRange =
    indicatorsCfg.showForecastRange && data.date && 'fcast-ts' in data;

  // ----- Forecast range -----
  let forecastRangeBlock = null;
  if (showForecastRange) {
    const fromdate = parseDate('date0' in data.date ? data.date.date0 : data.date[0]);
    const todate = parseDate('date1' in data.date ? data.date.date1 : data.date[data.date.length-1]);

    forecastRangeBlock = (
      <div className="chart-indicators-row">
        <p>
          <strong>Forecast range</strong>
        </p>
        <div>
          <p>
            {dateToString(fromdate, '-')} <span className="note">from</span>
          </p>
          <p>
            {dateToString(todate, '-')} <span className="note">to</span>
          </p>
        </div>
      </div>
    );
  }

  // ----- Coordinates -----
  let coord = null;
  if (data.location) {
    coord = (
      <>
        <p>
          {data.location.lat.toFixed(2)} <span className="note">latitude</span>
        </p>
        <p>
          {(data.location.lon > 180
            ? data.location.lon - 360.0
            : data.location.lon
          ).toFixed(2)}{' '}
          <span className="note">longitude</span>
        </p>
      </>
    );
  }

  // ----- Presence / tiger mosquito reports (only for albopictus-type vectors) -----
  let mosquito = null;
  const isTigerMosquitoVector = mapVector === 'albopictus';

  if (isTigerMosquitoVector && data.presence) {
    if ('albopictus' in data.presence && data.presence.albopictus[0]) {
      mosquito = (
        <>
          <p>
            Reports of the <strong>tiger mosquito</strong>
          </p>
          <ul>
            {data.presence.albopictus.map((elm, i) => (
              <li key={i}>
                <a target="_blank" rel="noreferrer" href={elm.citation.url}>
                  {elm.dataset}
                </a>
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      mosquito = (
        <p>
          <strong>No</strong> reports of the tiger mosquito
        </p>
      );
    }
  }

  // ----- Model block -----
  const modelBlock = (
    <div className="chart-indicators-row">
      <p>
        <strong>Model</strong>
      </p>
      <div>
        {modelDescription ? (
          <p>
            {modelDescription.includes('V2511A') ? (
              <>
                Model of <i>Phlebotomus papatasi</i>, version{' '}
                <strong style={{ fontFamily: "'Inter-Bold', sans-serif" }}>
                  V2511A
                </strong>
                , developed as part of ISMED-CLIM&apos;s early warning system
                against zoonotic diseases
              </>
            ) : (
              modelDescription
            )}
          </p>
        ) : modelUrl ? (
          <p>
            <a target="_blank" rel="noreferrer" href={modelUrl}>
              {modelLabel}
            </a>
          </p>
        ) : (
          <p>{modelLabel}</p>
        )}
      </div>
    </div>
  );

  // ----- Covariates block -----
  const covariatesBlock = covariates.length ? (
    <div className="chart-indicators-row">
      <p>
        <strong>Covariates</strong>
      </p>
      <div>
        {covariates.map((c, idx) => (
          <p key={idx}>
            {c.url ? (
              <a target="_blank" rel="noreferrer" href={c.url}>
                {c.label}
              </a>
            ) : (
              c.label
            )}{' '}
            {c.note && <span className="note">{c.note}</span>}
          </p>
        ))}
      </div>
    </div>
  ) : null;

  // ----- Final render -----
  return (
    <div className="chart-indicators">
      <div className="chart-indicators-row">
        <p>
          <strong>Coordinates</strong>
        </p>
        <div>{coord}</div>
      </div>

      <div className="chart-indicators-row">
        <p>
          <strong>Resolution</strong>
        </p>
        <div>
          <p>{resolutionText}</p>
        </div>
      </div>

      {modelBlock}
      {covariatesBlock}
      {forecastRangeBlock}

      {mosquito && <div className="chart-indicators-vector">{mosquito}</div>}
    </div>
  );
}

export default ChartIndicators;
