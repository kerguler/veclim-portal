import './ChartIndicators.css';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchTimeSeriesDataQuery } from 'store';
import ChartLoadingSkeleton from '../skeleton/Skeleton';
import { dateToString } from 'store/apis/utils';
import useDirectorFun from 'customHooks/useDirectorFun';
function ChartIndicators() {
  // const position = useSelector((state) => {
  // 	return state.fetcher.fetcherStates.map.mapPagePosition;
  // });
  // const vectorName = useSelector((state) => {
  // 	return state.fetcher.fetcherStates.vectorName;
  // });
  const { mapPagePosition, vectorName,mapVector } = useDirectorFun('left');
  const { data, error, isFetching } = useFetchTimeSeriesDataQuery({
    position: JSON.stringify(mapPagePosition),
    vectorName: mapVector,
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

  // if (data) {
  // 	dispatch(setIsTsDataSet(true));
  // }
if (data.date && "fcast-ts" in data) {
		var fromdate = new Date(data.date.date0)
		var todate = new Date(data.date.date1);
		fdate = (
			<>
				<div className="chart-indicators-row">
					<p>
						<strong>Forecast range</strong>
					</p>
					<div>
						<p>
							{dateToString(fromdate, "-")} <span className="note">from</span>
						</p>
						<p>
							{dateToString(todate, "-")} <span className="note">to</span>
						</p>
					</div>
				</div>
			</>
		);
	}

//   if (data && 'fcast-ts' in data) {
 
//     var todate = new Date(data.date.date0);
//     todate.setDate(todate.getDate() + data['fcast-ts'].ecmwf.colegg.length);
//     fdate = (
//       <>
//         <p>
//           {data['fcast-ts'].ecmwf.overlap[0]} <span className="note">from</span>
//         </p>
//         <p>
//           {dateToString(todate, '-')} <span className="note">to</span>
//         </p>
//       </>
//     );
//   }

  var coord = '';
  if (data) {
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
  if (data) {
    if ('presence' in data && 'albopictus' in data.presence && data.presence.albopictus[0]) {
      mosquito = (
        <>
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
        </>
      );
    } else if ('presence' in data) {
      mosquito = (
        <p>
          <strong>No</strong> reports of the tiger mosquito
        </p>
      );
    }
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
        <div className="chart-indicators-row">
          <p>
            <strong>Forecast range</strong>
          </p>
          <div>{fdate}</div>
        </div>
        <div className="chart-indicators-vector">{mosquito}</div>
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

  return vectorName === 'albopictus' ? indicators : indicatorsSand; // indicatorsSand;
}

export { ChartIndicators };
