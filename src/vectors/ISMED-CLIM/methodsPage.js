import sandflyOverview from 'assets/images/methods-ISMED-sandfly-overview.webp';
import sandflyLaboratory from 'assets/images/methods-ISMED-sandfly-laboratory.webp';
import sandflyTemperature from 'assets/images/methods-ISMED-sandfly-temperature.webp';
import sandflyMoisture from 'assets/images/methods-ISMED-sandfly-moisture.webp';
import sandflyField from 'assets/images/methods-ISMED-sandfly-field.webp';
import sandflySimulation from 'assets/images/methods-ISMED-sandfly-simulation.webp';
import sandflyCurrent from 'assets/images/methods-ISMED-sandfly-maps-current.webp';
import sandflyFuture from 'assets/images/methods-ISMED-sandfly-maps-future.webp';
import sandflyWarning from 'assets/images/methods-ISMED-sandfly-early-warning.webp';
import sandflyPlatform from 'assets/images/methods-ISMED-sandfly-platform.webp';
import XLink from 'components/xlink';

// Companion page to VEClim's existing Tiger Mosquito and Sand Fly Methods pages.
// Figures are cropped from Erguler, ESOVE 2026 Valencia presentation.
// Choose an unused id and register the desired /Methods route in the app.
export const methodsPage = {
  id: 4,
  page: 'MethodsPage',
  topper: {
    topperTitle: null,
    topperContent: (
      <p>
        A weather forecast tells us what happens above the ground.
        But what do sand flies experience in the places where they live?
      </p>
    ),
    topperWriter: <p>VEClim | Climate-sensitive sand fly modelling</p>,
    topperReference: <p>Based on the ESOVE 2026 presentation and supporting research</p>,
  },
  rows: [
    {
      rowno: 1,
      title: <h4>Following sand flies from climate to seasonal activity</h4>,
      content: (
        <>
          <p>
            Sand flies are tiny insects, but some species have a major public health
            importance. They transmit <span className="emph">Leishmania</span>
            {' '}parasites among animal hosts, including dogs, and sometimes to people.
            The time of year when sand flies are active therefore matters for
            surveillance and prevention.
          </p>
          <p>
            <strong>
              We have developed a mechanistic model that connects climate and local
              environmental conditions to the survival, development, reproduction,
              and seasonal activity of sand fly populations.
            </strong>
          </p>
          <p>
            Rather than describing a mosquito or sand fly season using temperature
            alone, we combine laboratory observations, field surveillance, and
            information about land cover to estimate the conditions sand flies
            actually experience. The model produces daily estimates of population
            activity that can support seasonal monitoring and early warning.
          </p>
        </>
      ),
      image: sandflyOverview,
      wide: true,
      reverse: false,
      newsStyle: false,
      caption: <p>Overview of environmental inputs, sand fly life stages, and activity indicators.</p>,
    },
    {
      rowno: 2,
      title: <h5>A population model, not just a temperature curve</h5>,
      content: (
        <>
          <p>
            Sand flies pass through four major life stages: eggs, larvae, pupae,
            and adults. At each stage, individuals may survive, develop, or die;
            adults reproduce, and larvae may enter dormancy. The rates of these
            processes depend on environmental conditions.
          </p>
          <p>
            <strong>
              Our model follows the progression of these life stages through time,
              allowing favourable and unfavourable periods to leave lasting effects
              on the population.
            </strong>
          </p>
          <p>
            We represent temperature-dependent survival and development,
            reproduction and egg laying, density-dependent processes, and dormancy.
            These processes together generate a daily pattern of activity, rather
            than assuming that sand flies are active whenever a temperature
            threshold is crossed.
          </p>
        </>
      ),
      image: null,
      wide: true,
      reverse: false,
    },
    {
      rowno: 3,
      title: <h5>Starting with evidence from the laboratory</h5>,
      content: (
        <>
          <p>
            We begin with laboratory studies of the sand fly life cycle. In these
            experiments, temperature can be controlled while the duration of
            development, survival, and egg production are recorded.
          </p>
          <p>
            Our initial parameterisation focuses on
            {' '}<span className="emph">Phlebotomus papatasi</span>, for which
            temperature-dependent life-history observations are available.
            We used observations reported by Guzman and Tesh (2000) and Kasap
            and Alten (2005, 2006) to reproduce the responses of different
            stages to changing temperatures.
          </p>
          <p>
            <strong>
              Laboratory experiments tell us how an insect responds under
              controlled conditions. They do not necessarily tell us which
              temperatures it experiences outdoors.
            </strong>
          </p>
        </>
      ),
      image: sandflyLaboratory,
      wide: true,
      reverse: true,
      newsStyle: true,
      caption: <p>Examples of temperature-dependent life-history responses of <em>Ph. papatasi</em> represented by the model. Source: ESOVE 2026 presentation, slide 3.</p>,
    },
    {
      rowno: 4,
      title: <h5>Air temperature is not the whole story</h5>,
      content: (
        <>
          <p>
            Weather and climate datasets describe conditions at a relatively
            large scale. Sand flies, however, spend much of their lives in local
            environments where exposure can be quite different from measured
            air or soil temperature.
          </p>
          <p>
            Sand flies may regulate their exposure through habitat selection
            and avoidance of unfavourable conditions. We therefore distinguish
            two processes: <strong>environmental buffering</strong>, which
            reduces rapid fluctuations in the local temperature, and
            {' '}<strong>avoidance</strong>, which reduces exposure to extreme
            conditions when suitable refuges are available.
          </p>
          <p>
            The model estimates buffered air and soil temperature and applies
            an additional temperature-avoidance response. The extent of
            protection depends on local habitat conditions, so this should
            not be interpreted as precise behavioural control by individual
            sand flies.
          </p>
        </>
      ),
      image: sandflyTemperature,
      wide: true,
      reverse: false,
      newsStyle: true,
      caption: <p>Illustration of temperature buffering and avoidance of extreme environmental exposure. Source: ESOVE 2026 presentation, slide 4.</p>,
    },
    {
      rowno: 5,
      title: <h5>Moisture emerges from several environmental drivers</h5>,
      content: (
        <>
          <p>
            Moisture availability is critical for immature sand flies, but it
            cannot be inferred from rainfall alone. Water accumulates after
            precipitation and is lost through processes affected by humidity,
            solar radiation, wind, and local ground conditions.
          </p>
          <p>
            We use these interacting drivers to estimate a
            {' '}<strong>soil moisture index</strong>, rather than treating any
            single weather variable as a complete description of breeding-site
            moisture. Land cover also modifies the local balance by influencing
            exposure and shelter.
          </p>
          <p>
            In this way, the same rainfall event can lead to different local
            conditions depending on drying and habitat characteristics. These
            estimated conditions then influence the demographic processes
            represented by the population model.
          </p>
        </>
      ),
      image: sandflyMoisture,
      wide: true,
      reverse: true,
      newsStyle: true,
      caption: <p>Conceptual moisture balance and the modelled soil moisture index. Source: ESOVE 2026 presentation, slide 5.</p>,
    },
    {
      rowno: 6,
      title: <h5>Checking laboratory biology against field observations</h5>,
      content: (
        <>
          <p>
            The model's next challenge is to explain what happens in nature.
            Sand flies observed in the field may remain active through weather
            extremes that would appear unsuitable according to laboratory
            measurements alone. This suggests that local environmental exposure
            must be considered alongside physiological responses.
          </p>
          <p>
            We used surveillance observations collected through the
            {' '}<strong>EDENext project</strong> to calibrate the model and
            adapt laboratory-derived responses to field conditions. The
            presentation illustrates observations from 20 sites at approximately
            5.5 km resolution, representing five species:
          </p>
          <ul>
            <li><em>Phlebotomus papatasi</em></li>
            <li><em>Phlebotomus ariasi</em></li>
            <li><em>Phlebotomus sergenti</em></li>
            <li><em>Phlebotomus tobbi</em></li>
            <li><em>Phlebotomus perniciosus</em></li>
          </ul>
          <p>
            We used a Bayesian updating framework to account for uncertainty
            while adapting the laboratory-informed model to the field data.
            This supports the estimation of plausible parameter configurations,
            rather than presenting a single parameter set as an exact account
            of nature.
          </p>
        </>
      ),
      image: sandflyField,
      wide: true,
      reverse: false,
      newsStyle: true,
      caption: <p>Field observation sites and example seasonal profiles from the EDENext dataset. Source: ESOVE 2026 presentation, slide 6.</p>,
    },
    {
      rowno: 7,
      title: <h5>From climate and land cover to sand fly activity</h5>,
      content: (
        <>
          <p>
            To simulate a location, we combine six environmental drivers:
            air temperature, relative humidity, surface solar radiation
            downwards, precipitation, wind speed, and land cover. The model
            uses these inputs to estimate local moisture availability and
            buffered temperatures before calculating stage-specific
            population dynamics.
          </p>
          <p>
            Land cover matters because a coniferous forest, a cultivated
            field, and a built-up area do not provide the same shelter or
            breeding opportunities. We use land cover suitability to represent
            these differences, drawing on the
            {' '}<XLink href="https://land.copernicus.eu/en/products/corine-land-cover/clc2018">
              CORINE Land Cover 2018
            </XLink>{' '}dataset.
          </p>
          <p>
            The model follows changes in each life stage, from dormant larvae
            to newly laid eggs. Daily egg laying is one of the outputs used
            to summarise the timing of seasonal activity.
          </p>
        </>
      ),
      image: sandflySimulation,
      wide: true,
      reverse: true,
      newsStyle: true,
      caption: <p>Example environmental drivers, land cover suitability, estimated microclimate and simulated population dynamics. Source: ESOVE 2026 presentation, slide 7.</p>,
    },
    {
      rowno: 8,
      title: <h5>Mapping seasonal activity</h5>,
      content: (
        <>
          <p>
            Once the model can simulate a single location, we can apply it to
            many climate grid cells to explore patterns across a region.
            We use <XLink href="https://cds.climate.copernicus.eu/datasets/reanalysis-cerra-single-levels">
              CERRA
            </XLink>{' '}regional reanalysis, at approximately 5.5 km
            resolution, for higher-resolution applications, and
            {' '}<XLink href="https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels">
              ERA5
            </XLink>{' '}for broader-scale assessments.
          </p>
          <p>
            The maps shown here summarise modelled egg-laying activity over
            2011–2013, illustrating both regional differences within Portugal
            and broader spatial patterns across Europe. These maps represent
            <strong> model outputs</strong>, not direct counts of sand flies
            or observed infections.
          </p>
        </>
      ),
      image: sandflyCurrent,
      wide: true,
      reverse: false,
      newsStyle: true,
      caption: <p>Illustrative average annual modelled egg-laying activity for Portugal (CERRA, approximately 5.5 km) and Europe (ERA5, approximately 25 km), 2011–2013. Source: ESOVE 2026 presentation, slide 8.</p>,
    },
    {
      rowno: 9,
      title: <h5>Exploring future climate scenarios</h5>,
      content: (
        <>
          <p>
            The same model can be run using projected climate conditions to
            explore how the timing and spatial distribution of suitable
            seasonal activity might change. We use the
            {' '}<XLink href="https://www.nccs.nasa.gov/services/data-collections/land-based-products/nex-gddp-cmip6">
              NEX-GDDP-CMIP6
            </XLink>{' '}downscaled climate projections for this purpose.
          </p>
          <p>
            The example shown compares a historical period with an
            end-of-century scenario using ACCESS-ESM1-5 under SSP5-8.5.
            It demonstrates a <strong>scenario-based projection</strong>, not
            a prediction of the exact sand fly population that will exist
            in a particular future year.
          </p>
          <p>
            Such applications should be interpreted alongside uncertainty
            in future climate, local habitat conditions, and the biological
            model itself.
          </p>
        </>
      ),
      image: sandflyFuture,
      wide: true,
      reverse: true,
      newsStyle: true,
      caption: <p>Example historical and future projections of annual egg-laying activity. Future climate: ACCESS-ESM1-5, SSP5-8.5, 2091–2093. Source: ESOVE 2026 presentation, slide 9.</p>,
    },
    {
      rowno: 10,
      title: <h5>Turning seasonal patterns into early warning</h5>,
      content: (
        <>
          <p>
            For prevention, the question is often not simply how many sand
            flies a model predicts. It is <strong>when activity is likely to
            begin, become intense, decline, and end</strong>.
          </p>
          <p>
            In the Zoonotic Living Lab of
            {' '}<XLink href="https://ismed-clim.eu/">ISMED-CLIM</XLink>,
            initially applied in Portugal, we use thresholds on daily model
            output to identify periods of low, medium, and high seasonal
            activity. These periods inform a sequence of early warning
            notifications for dog owners:
          </p>
          <ul>
            <li>Before the expected activity season</li>
            <li>At the start of the season</li>
            <li>During peak activity</li>
            <li>When activity is declining</li>
            <li>At the end of the season</li>
          </ul>
          <p>
            Predicted sand fly activity provides an indicator of potential
            exposure to vectors. It is <strong>not a direct estimate of
            Leishmania transmission or human disease incidence</strong>,
            which also depend on infection and contact with reservoir hosts.
          </p>
        </>
      ),
      image: sandflyWarning,
      wide: true,
      reverse: false,
      newsStyle: true,
      caption: <p>Conceptual seasonal thresholds and the early warning approach used in the ISMED-CLIM Zoonotic Living Lab. Source: ESOVE 2026 presentation, slide 11.</p>,
    },
    {
      rowno: 11,
      title: <h5>Explore the model on VEClim</h5>,
      content: (
        <>
          <p>
            The sand fly model is being integrated into
            {' '}<XLink href="https://veclim.com">VEClim</XLink>'s open model
            repository alongside environmental datasets and surveillance
            observations. An earlier version is accessible through the
            {' '}<XLink href="https://veclim.com/api">VEClim API</XLink>.
          </p>
          <p>
            Our aim is to make the modelling workflow reproducible and the
            results useful, so that researchers can inspect the environmental
            inputs and simulated activity, while public health stakeholders
            can explore where and when prevention may be most relevant.
          </p>
          <p>
            <strong>
              Reliable early warning depends on both sound biological models
              and sustained field monitoring. Predictions can complement
              surveillance, but do not replace it.
            </strong>
          </p>
        </>
      ),
      image: sandflyPlatform,
      wide: true,
      reverse: true,
      newsStyle: true,
      caption: <p>VEClim model repository and an example sand fly seasonal-activity display. Source: ESOVE 2026 presentation, slide 12.</p>,
    },
    {
      rowno: 12,
      title: <h5>Where this work stands</h5>,
      content: (
        <>
          <p>
            The model brings together laboratory-derived responses, field
            calibration, microenvironmental estimation, and gridded climate
            data within a shared population-modelling framework. Its current
            demonstrations include high-resolution activity simulations and
            an initial early warning application for Portugal.
          </p>
          <p>
            Important work remains: laboratory observations are limited for
            several epidemiologically important sand fly species, field
            surveillance is uneven, and prediction of disease transmission
            requires information beyond sand fly abundance alone. These are
            important motivations for keeping the model open to evaluation,
            new evidence, and further improvement.
          </p>
        </>
      ),
      image: null,
      wide: true,
      reverse: false,
    },
  ],
};
