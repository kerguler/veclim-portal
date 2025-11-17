import worldPic from 'assets/images/digital-world-sm.webp';
import emiliaSurv from 'assets/images/methods-Emilia-Romagna-surv.webp';
import emiliaTSobs from 'assets/images/methods-Emilia-Romagna-TS-obs.webp';
import emiliaERA from 'assets/images/methods-Emilia-Romagna-ERA5.webp';
import emiliaTSsim from 'assets/images/methods-Emilia-Romagna-TS-sim.webp';
import emiliaTSchikv from 'assets/images/methods-Emilia-Romagna-TS-chikv.webp';
import graphPic from 'assets/images/sample-activity-profile.webp';
import emiliaTSrisk from 'assets/images/methods-Emilia-Romagna-TS-risk.webp';
import methodsForecast from 'assets/images/methods-forecast-ecmwf.webp';
import methodsForecastActivity from 'assets/images/methods-forecast-ecmwf-colegg.webp';
import methodsFutureActivity from 'assets/images/methods-future-nasa-colegg.webp';
import { Link } from 'react-router-dom';
import XLink from 'components/xlink';
import MapLink from 'components/MapLink';

export const methodsPage = {
  id: 1,
  page: 'MethodsPage',
  topper: {
    topperTitle: null,
    topperContent: (
      <>
        <p>
          "Only model organisms in the laboratory <br />
          live in a world of endless summer."
        </p>
      </>
    ),
    topperWriter: <p>William E. Bradshaw and peers</p>,
    topperReference: <p>(Evolution, 2004)</p>,
  },
  rows: [
    {
      rowno: 1,
      title: <h4>How do we do what we do, and how can you?</h4>,
      content: (
        <>
          <p>
            We mix maths, coding, and lots of reading with hard work, great
            friends, and lots of guidance. We work on the interface of climate
            science, vector biology, and infectious disease epidemiology, and
            aim at understanding the impact of climate change on vector
            populations and vector-borne diseases. One important vector species
            we study is called the Asian tiger mosquito, or{' '}
            <span className="emph">Aedes albopictus</span> in Latin.
          </p>
        </>
      ),
      image: worldPic,
      wide: true,
      rotate: false,
      reverse: false,
      newsStyle: false,
    },
    {
      rowno: 2,
      newsStyle: true,
      title: <h5>Collecting Mosquitoes in Italy</h5>,
      content: (
        <>
          {' '}
          <p>
            <strong>
              The Asian tiger mosquito is an invasive species that originated
              from Southeast Asia and invaded all continents but Antarctica.
              Upon its arrival in Europe by the late 70s, the tiger mosquito
              managed to establish populations in almost all the southern half
              of the continent, and there are strong signs that it's headed
              towards north.
            </strong>
          </p>
          <p>
            The first outbreak in Europe, caused by this little menace, was of
            chikungunya fever, which took place in Emilia-Romagna, Italy, in
            2007. Right after this, an extensive mosquito surveillance program
            was established in the region. Italian authorities have been
            collecting mosquito eggs every two weeks, from May to October, using
            special traps, called ovitraps. This extensive surveillance program
            is still operational, and the data are available at{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.zanzaratigreonline.it/"
            >
              ZANZARATIGREONLINE
            </a>
            .{' '}
          </p>
        </>
      ),
      image: emiliaSurv,
      wide: false,
      rotate: false,
      reverse: true,
    },
    {
      rowno: 3,
      title: null,
      content: (
        <>
          <p>
            {' '}
            <strong>
              Mosquitoes depend heavily on external factors, such as water
              availability, shade, and humidity, in addition to temperature.
              They cannot control their body temperature. Rainfall and canopy,
              among many other ecological features, can play a role in
              determining the suitability of an area to a vector population.
              These features (drivers) are invaluable assets for developing a
              structured mathematical reasoning (a model) that can be tested and
              validated.
            </strong>{' '}
          </p>
          <p>
            Our first attempt at modelling the dynamics of mosquito populations
            in Italy was in 2015, which was published the year after in{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://doi.org/10.1371/journal.pone.0149282"
            >
              PLOS ONE
            </a>
            . We adopted a new kind of{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://f1000research.com/articles/7-1220/v3"
            >
              modelling
            </a>{' '}
            for this task, which involves keeping track of all life stages at
            different ages developing, surviving, and growing in response to the
            environment. The current version of the model, as we keep improving
            it, requires 48 parameters to describe these processes. The code is
            available as <code>Vector08c</code> in the{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://pypi.org/project/albopictus/"
            >
              <code>albopictus</code>
            </a>{' '}
            package of the Python programming language. We also included 100
            slightly different versions of the parameters in the package,
            labelled as <code>Q4.a100+1</code>, which we inferred using the
            Emilia-Romagna data.
          </p>
        </>
      ),
      image: emiliaTSobs,
      wide: true,
      rotate: false,
      caption: (
        <p>
          The average number of eggs collected during high seasons for every two
          weeks in Parma. The vertical lines indicate the standard error (the
          standard deviation divided by the square root of the number of traps).
        </p>
      ),
    },
    {
      rowno: 4,
      newsStyle: true,
      reverse: true,
      title: <h5>Model Performance</h5>,
      caption: (
        <p>The grid cell for the environmental data we used for Parma.</p>
      ),
      wide: false,
      image: emiliaERA,
      content: (
        <p>
          We would like to show here how the model performs against the actual
          observations. To run a simulation, we pick a grid cell from our
          environmental datasets (0.25&deg; regular grid of the{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels"
          >
            ERA5
          </a>
          ) and obtain the daily average air temperature (at 2 m above ground),
          total precipitation (no distinction of rainfall or snow), the length
          of the day (depends on latitude), and the number of people living in a
          square kilometer. We run the model with each of the 100 parameter
          configurations and calculate the average prediction (the average
          number of eggs laid in two weeks).
        </p>
      ),
    },
    {
      rowno: 5,
      wide: true,
      reverse: false,
      image: emiliaTSsim,
      title: null,
      caption: (
        <p>
          Plotting model predictions together with the observed number of eggs
          in Parma. We normalised both of them with respect to the sampling
          intensity in the region.
        </p>
      ),
      content: (
        <p>
          This dataset represents the observations made in the entire province,
          and the grid cell we chose seems to represent the area well. In our{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://doi.org/10.1371/journal.pone.0174293"
          >
            original study
          </a>
          , we involved more grid points and a slightly different set of
          environmental variables to calibrate the model; therefore, the output
          we show here may differ from one grid cell to another. What's
          reassuring is that the habitat suitability predicted by the model
          overlapped with more than 95% of the range of the tiger mosquito in
          Europe at the time of our analysis.
        </p>
      ),
    },
    {
      rowno: 5.5,
      wide: false,
      title: '',
      content: (
        <h5 className="quote">
          We have yet to achieve a reliable forecast on the dynamics of vector
          populations and the risk of vector-borne disease transmission.
        </h5>
      ),
    },
    {
      rowno: 6,
      wide: false,
      large: true,
      newsStyle: true,
      title: <h5>Forecasts and Proxies</h5>,
      image: graphPic,
      content: (
        <>
          <p>
            Although we have taken a few good steps towards producing a reliable
            forecast for mosquito-borne diseases, we have a long way to reach
            our destination. It took more than a day or two for accurate weather
            forecast to become a reality. Even after centuries of mathematical
            advances, technological innovations, endless inflow of funds, and
            massive global data collection and sharing, we finally get it right
            most of the times for three to four days in advance.
          </p>
          <p>
            <strong>
              On the way to the forecast, we have what we call proxies, not
              quite like the real thing, but as good as one can hope for. The
              number of bites you scratch on your ankles can be a proxy for
              outbreak risk, and the number of vectors caught in specialised
              traps can be a proxy for the number of bites. We can predict the
              number of vectors or the number of bites, and validate this
              prediction by simply counting - by making observations.
            </strong>
          </p>
        </>
      ),
    },
    {
      rowno: 7,
      title: <h5>Relative to Italy</h5>,
      content: (
        <>
          {' '}
          <p>
            In this version of VEClim, we employed two proxies as indicators of
            risk: (i) The expected number of larvae in a typical breeding site,
            and (ii) the adult female activity within the sampling range of a
            single ovitrap. Please note that we normalise all predictions with
            respect to the sampling intensity in Emilia-Romagna.
          </p>
          <p>
            <strong>
              Larva abundance comes directly from the model (larva is one of the
              four major stages of mosquito development), however, adult female
              activity is a proxy, which is given in terms of the number of eggs
              laid. In <code>Vector08c</code>, we assumed that females lay eggs
              every day and that adult female activity is proportional to the
              number of eggs. Mosquito activity will then become visible in the
              form of bites on nearby people.
            </strong>
          </p>
          <p>
            To evaluate larva counts and biting activity outside of Italy, we
            employed special cut-off values. For biting activity, we let 10 and
            50 (normalised bi-weekly egg numbers) delineate the beginning and
            end of the mosquito high season (that's 0.7 and 3.6 daily), and for
            larva counts, we let 1 and 50 (again, normalised bi-weekly numbers
            for Italy - 0.07 and 3.6 daily) capture the early rise of the
            population (intended as a trigger for mosquito control).
          </p>
        </>
      ),
      image: emiliaTSrisk,
      caption: (
        <p>
          The number of eggs laid per trap per adult female mosquito as a proxy
          for biting activity.
        </p>
      ),
      wide: true,
      reverse: true,
      newsStyle: true,
    },
    {
      rowno: 8,
      content: (
        <>
          {' '}
          <p>
            <strong>
              Although these numbers may not indicate the mosquito high season
              elsewhere, what we display is a relative measure of the tiger
              mosquito population abundance and activity predicted in your
              region as compared to Italy. For a more detailed comparison,
              please visit <Link to="/MapPage">The Map</Link>, and check out
              some time-series graphs.
            </strong>
          </p>
        </>
      ),
      title: null,
      image: null,
      wide: true,
    },
    {
      rowno: 9,
      title: <h5>Transmission risk</h5>,
      content: (
        <>
          {' '}
          <p>
            After publishing our model for the tiger mosquito, we worked on
            disease transmission using a similar age-structured population
            model. We studied the 2007 chikungunya outbreak in Emilia-Romagna,
            and published our findings in{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://doi.org/10.1371/journal.pone.0174293"
            >
              PLOS ONE
            </a>
            . The model is available as <code>chikv</code> in the{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://pypi.org/project/albopictus/"
            >
              <code>albopictus</code>
            </a>{' '}
            Python package with 31 (additional) transmission-related parameters
            and 1000 variations of them, labelled as <code>QI</code>.
          </p>
          <p>
            <strong>
              To come up with a proxy for disease risk, we simulated the first
              60 days after importing an infectious case into a hypothetical
              population of 4000 people. This is about the size of the two
              villages (Castiglione di Cervia and Castiglione di Ravenna)
              initially affected by the outbreak in the region.
            </strong>
          </p>
          <p>
            Below, you see average daily vector activity and two independent
            outbreak simulations to demonstrate our risk estimation process. For
            each simulation, we introduced an infectious person (an importation)
            and followed the dynamics for 60 days. We recorded any autochthonous
            transmission (local transmission due to local conditions) if any.
          </p>
        </>
      ),
    },
    {
      rowno: 10,
      image: emiliaTSchikv,
      wide: true,
      reverse: false,
      newsStyle: true,
      content: (
        <>
          {' '}
          <p>
            <strong>
              As you see, the first simulation ended up with an average of 7.51
              additional infections per 1 imported case. However, only 20 out of
              100 repetitions ended up with infections other than the one
              introduced. Importations resulted in no infections 80% of the
              time. The second simulation ended up with a similar{' '}
              <span className="quote">impact</span> (10.35 cases per
              importation), but this time more repetitions turned up with
              additional cases (47 out of 100). We marked the second importation
              with a higher <span className="quote">outbreak risk</span>.
            </strong>
          </p>
          <p>
            We simulated imported cases day after day and marked the resulting
            impact and outbreak risk on each day of importation. We derived two
            risk indicators using a pair of cut-off values for each. First, we
            marked an outbreak risk larger than 50% as <strong>high</strong> and
            lower than 1% as <strong>low</strong>. Then, we marked an impact of
            more than 500 cases as <strong>high</strong> and less than 10 cases
            as <strong>low</strong>.
          </p>
        </>
      ),
    },
    {
      rowno: 11,
      title: <h5>Medium-range predictions</h5>,
      content: (
        <>
          {' '}
          <p>
            <strong>
              Every month, the ECMWF publishes{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://cds-beta.climate.copernicus.eu/datasets/seasonal-original-single-levels"
              >
                seasonal forecasts
              </a>{' '}
              for temperature and precipitation at 6-hour intervals, with a
              7-month lead time. Although these forecasts come at a considerably
              lower spatial resolution (1&deg; regular grid), they are useful in
              identifying trends in seasonal averages.
            </strong>
          </p>
        </>
      ),
      image: methodsForecast,
      wide: true,
      reverse: true,
      newsStyle: true,
    },
    {
      rowno: 12,
      image: methodsForecastActivity,
      wide: true,
      reverse: true,
      newsStyle: true,
      content: (
        <>
          {' '}
          <p>
            Each forecast consists of an ensemble of 51 members, forecasts from
            the same model with alternative configurations. We combine each
            alternative with the latest ERA5 counterpart and average over the
            overlapping time period. Then, we run population dynamics and
            transmission risk simulations on each, label the average as a
            "forecast", and present a comparison with decadal averages. Above,
            you see each of the 51 alternative forecasts of air temperature, and
            below, you see the average vector activity simulated using these
            seasonal forecasts.
          </p>
        </>
      ),
    },
    {
      rowno: 13,
      title: <h5>Long-range predictions</h5>,
      image: methodsFutureActivity,
      wide: true,
      reverse: true,
      newsStyle: true,
      content: (
        <>
          {' '}
          <p>
            <strong>
              Long-range predictions concern the end of century (2090-2100),
              employing the NASA Earth Exchange daily downscaled climate
              projections (
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6"
              >
                NEX-GDDP-CMIP6
              </a>
              ), available at a 0.25&deg; resolution. We employed 3 models
              (ACCESS-CM2, ACCESS-ESM1-5, and EC-Earth3) from the ensemble under
              the optimistic (SSP 2-4.5) and pessimistic (SSP 5-8.5) scenarios,
              and simulated the decadal averages of mosquito activity and
              outbreak risk/impact. Below, you see the temperature projections
              of the three climate models (under SSP 5-8.5) together with the
              simulated average daily vector activity.
            </strong>
          </p>
        </>
      ),
    },
    {
      rowno: 14,
      title: <h5>Surveillance datasets</h5>,
      wide: true,
      reverse: true,
      newsStyle: true,
      content: (
        <>
          {' '}
          <p>
            As of June 2025, VEClim now displays seasonal averages of observed
            vector population dynamics on the{' '}
            <MapLink session="albopictus" tile="presence">
              MapPage
            </MapLink>
            {/* <Link
              onClick={() => {
                PackageMapServices.handleToMapPageTransition(
                  dispatch,
                  mapVector,
                  mapVector
                );
                dispatch(setReadyToView(false));
              }}
              to="/MapPage?session=albopictus&tile=presence"
            >
              MapPage
            </Link> */}
            . These profiles are derived from three key surveillance datasets:
          </p>
          <ul>
            <li>
              <XLink href="https://doi.org/10.5281/zenodo.11486198">
                VectAbundance (2010-2022)
              </XLink>
            </li>
            <li>
              <XLink href="https://www.gbif.org/dataset/03269e13-84ae-430f-990e-f11069413e36">
                AIMsurv (2020)
              </XLink>
            </li>
            <li>
              <XLink href="https://vectorbase.org/vectorbase/app/">
                VectorBase (2010-2024)
              </XLink>
            </li>
          </ul>
          <p>
            We present weekly averages smoothed using a two-week sliding window
            to highlight typical seasonal trends. For access to raw data or
            further inspection, please consult the original data sources.
          </p>
        </>
      ),
    },
  ],
};
