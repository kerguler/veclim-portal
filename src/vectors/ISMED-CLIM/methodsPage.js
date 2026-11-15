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
      title: <h4>Developing a climate-sensitive sand fly activity model</h4>,
      content: (
        <>
          <p>
            Sand flies transmit <it>Leishmania</it> parasites and several 
            viruses, including Toscana virus, posing significant public health 
            risks. Sand fly-borne diseases disproportionately affect disadvantaged 
            communities with limited access to healthcare, even in developed 
            countries. As climate and environmental conditions influence sand fly 
            survival and seasonal activity, predicting these patterns is important 
            for surveillance, prevention, and early warning.
          </p>
          <p>
            <strong>
              We have developed a mechanistic model that connects climate and local
              environmental conditions to the survival, development, reproduction,
              and seasonal activity of sand fly populations.
            </strong>
          </p>
          <p>
            We combine laboratory observations, field surveillance, and
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
            a wide array of temperature-dependent life-history observations are available.
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
      caption: <p>
        Examples of temperature-dependent life-history responses 
        of <em>Ph. papatasi</em> represented by the model (ID: V2609C).
        </p>
    },
    {
      rowno: 4,
      title: <h5>From climate to microclimate</h5>,
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
      reverse: true,
      newsStyle: true,
      caption: <p>Illustration of temperature buffering and avoidance of 
        extreme environmental exposure.
        </p>,
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
      caption: <p>Conceptual moisture balance and the modelled soil 
        moisture index.</p>,
    },
    {
      rowno: 6,
      title: <h5>Checking laboratory biology against field observations</h5>,
      content: (
        <>
          <p>
            The model's next challenge is to explain what happens in nature.
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
      reverse: true,
      newsStyle: true,
      caption: <p>Field observation sites and example seasonal profiles 
        from the EDENext dataset.</p>,
    },
    {
      rowno: 7,
      title: <h5>Testing early warning in Living Labs</h5>,
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
      wide: true,
      reverse: false,
      newsStyle: true,
      caption: <p>Conceptual seasonal thresholds and the early warning approach used in the ISMED-CLIM Zoonotic Living Lab. Source: ESOVE 2026 presentation, slide 11.</p>,
    },
    {
      rowno: 8,
      title: <h5>Where we stand</h5>,
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
