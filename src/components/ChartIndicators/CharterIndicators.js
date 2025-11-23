import './ChartIndicators.css';
import { useSelector } from 'react-redux';
import { useFetchTimeSeriesDataQuery } from 'store';
import ChartLoadingSkeleton from '../skeleton/Skeleton';
import { dateToString } from 'store/apis/utils';
function ChartIndicators() {
  const position = useSelector((state) => {
    return state.fetcher.fetcherStates.map.mapPagePosition;
  });
  const vectorName = useSelector((state) => {
    return state.fetcher.fetcherStates.vectorName;
  });
  const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
    position: position,
    vectorName: vectorName,
  });

  if (isFetching) {
    return (
      <>
        <div className="chart-indicators">
          <ChartLoadingSkeleton times={6} noBorder />
        </div>
      </>
    );
  }

  if (data === undefined) {
    return null;
  }

  var fdate = '';
  if (data?.date && 'fcast-ts' in data) {
    var fromdate = new Date(data.date.date0);
    var todate = new Date(data.date.date1);
    fdate = (
      <>
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
      </>
    );
  }

  var coord = '';
  if (data?.location) {
    coord = (
      <>
        <p>
          {data.location.lat.toFixed(2)} <span className="note">latitude</span>
        </p>
        <p>
          {(data.location.lon > 180 ? data.location.lon - 360.0 : data.location.lon).toFixed(2)}{' '}
          <span className="note">longitude</span>
        </p>
      </>
    );
  }

  var mosquito = '';
  if ('presence' in data && 'albopictus' in data.presence && data.presence.albopictus[0]) {
    mosquito = (
      <>
        <div className="chart-indicators-vector">
          <p>
            Reports of the <strong>tiger mosquito</strong>
          </p>
          <ul>
            {data.presence.albopictus.map((elm, i) => {
              return (
                <li key={i}>
                  <a target="_blank" rel="noreferrer" href={elm.citation.url}>
                    {elm.dataset}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  } else if ('presence' in data) {
    mosquito = (
      <div className="chart-indicators-vector">
        <p>
          <strong>No</strong> reports of the tiger mosquito
        </p>
      </div>
    );
  }

  var londat = '';
  if (
    'surv-ts' in data &&
    Object.values(data['surv-ts']).some((val) => Array.isArray(val) && val.length > 0)
  ) {
    let trans = {
      vabun: { label: 'VectAbundance', href: 'https://doi.org/10.5281/zenodo.11486198' },
      aimsurv: {
        label: 'AIMSurv',
        href: 'https://www.gbif.org/dataset/03269e13-84ae-430f-990e-f11069413e36',
      },
      vbase: { label: 'VectorBase', href: 'https://vectorbase.org/vectorbase/app/' },
    };
    londat = (
      <>
        <div className="chart-indicators-vector">
          <p>
            Long-term observations of the <strong>tiger mosquito</strong> from the area
          </p>
          <ul>
            {Object.entries(data['surv-ts'])
              .filter(([key, val]) => Array.isArray(val) && val.length > 0)
              .map(([key, val], i) => {
                return (
                  <li key={i}>
                    <a target="_blank" rel="noreferrer" href={trans[key]['href']}>
                      {trans[key]['label']}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </>
    );
  }

  const indicators = (
    <>
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
            <p>0.25° x 0.25°</p>
          </div>
        </div>
        <div className="chart-indicators-row">
          <p>
            <strong>Model</strong>
          </p>
          <div>
            <p>
              <a target="_blank" rel="noreferrer" href="https://pypi.org/project/albopictus/">
                Vector08c + CHIKV
              </a>
            </p>
          </div>
        </div>
        <div className="chart-indicators-row">
          <p>
            <strong>Covariates</strong>
          </p>
          <div>
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels"
              >
                ERA5
              </a>{' '}
              <span className="note">historical</span>
            </p>
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/seasonal-original-single-levels"
              >
                ECMWF-SEAS5
              </a>{' '}
              <span className="note">forecast</span>
            </p>
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6"
              >
                NEX-GDDP-CMIP6
              </a>{' '}
              <span className="note">future</span>
            </p>
          </div>
        </div>
        {fdate}
        {mosquito}
        {londat}
      </div>
    </>
  );

  const indicatorsSand = (
    <>
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
            <p>0.0215° x 0.0215°</p>
          </div>
        </div>
        <div className="chart-indicators-row">
          <p>
            <strong>Model</strong>
          </p>
          <div>
            <p>
              <a target="_blank" rel="noreferrer" href="https://pypi.org/project/albopictus/">
                Sand
              </a>
            </p>
          </div>
        </div>
        <div className="chart-indicators-row">
          <p>
            <strong>Covariates</strong>
          </p>
          <div>
            <p>
              <a target="_blank" rel="noreferrer" href="https://doi.org/10.5281/zenodo.8413232">
                WRF-ARW
              </a>{' '}
              <span className="note">2015</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );

    const indicatorsISMED_CLIM = (
    <>
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
            <p>5.5 km x 5.5 km</p>
          </div>
        </div>
        <div className="chart-indicators-row">
          <p>
            <strong>Model</strong>
          </p>
          <div>
            <p>
              Model of <i>Phlebotomus papatasi</i>, version <strong style={{fontFamily:"'Inter-Bold', sens-serif"}}>V2511A</strong>, developed as part of ISMED-CLIM's early warning system against zoonotic diseases
            </p>
          </div>
        </div>
        <div className="chart-indicators-row">
          <p>
            <strong>Covariates</strong>
          </p>
          <div>
            <ul>
				<li>
              <a target="_blank" rel="noreferrer" href="https://cds.climate.copernicus.eu/datasets/reanalysis-cerra-single-levels">
                CERRA
              </a></li>
			  <li>
              <a target="_blank" rel="noreferrer" href="https://cds.climate.copernicus.eu/datasets/reanalysis-cerra-land">
                CERRA-Land
              </a>
			  </li>
			  <li>
              <a target="_blank" rel="noreferrer" href="https://land.copernicus.eu/en/products/corine-land-cover">
                CORINE land cover
              </a>
			  </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  if (vectorName === 'albopictus') {
    return indicators;
  } else if (vectorName === 'papatasi') {
    return indicatorsSand;
  } else if (vectorName === 'ISMED-CLIM') {
    return indicatorsISMED_CLIM;
  }
}

export { ChartIndicators };
