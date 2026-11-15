import bannerCSVD from 'assets/images/banner-CSVD.avif';
import ensembleSurveillance from 'assets/images/methods-Bologna2024-surveillance.webp';
import ensembleBenchmark from 'assets/images/methods-Bologna2024-benchmark.webp';
import ensembleWeights from 'assets/images/methods-Bologna2024-weights.webp';
import ensemblePerformance from 'assets/images/methods-Bologna2024-performance.webp';
import XLink from 'components/xlink';

// Methods page for the Aedes albopictus multi-model ensemble.
// The four ensemble images are adapted from Figures 1–4 of the
// accompanying Da Re et al. manuscript; credit the authors when publishing.
// Adjust id and the route registration to suit the existing VEClim application.
export const methodsPage = {
  id: 3,
  page: 'MethodsPage',
  topper: {
    topperTitle: null,
    topperContent: (
      <p>
        Different models tell different stories <br />
         about mosquito populations. <br />
        What happens when we bring them together?
      </p>
    ),
    topperWriter: <p>Daniele Da Re and peers</p>,
    topperReference: <p>(EcoEvoRxiv, 2026)</p>,
  },
  rows: [
    {
      rowno: 1,
      title: <h4>Many models, one mosquito</h4>,
      content: (
        <>
          <p>
            The Asian tiger mosquito, <span className="emph">Aedes albopictus</span>,
            is spreading across Europe. Its numbers rise and fall with the seasons,
            and knowing when mosquito activity is likely to begin, peak, and decline
            can help us prepare surveillance and control activities.
          </p>
          <p>
            <strong>
              We have several ways to predict these seasonal changes, but how do
              we know which predictions to trust? And can combining different
              models give us a more reliable picture?
            </strong>
          </p>
          <p>
            To investigate, we brought together seven independently developed
            mosquito models, compared them against the same field observations,
            and built a weighted ensemble from their predictions. Here we
            describe how the comparison works and what the ensemble can, and
            cannot, tell us.
          </p>
        </>
      ),
      image: bannerCSVD,
      wide: true,
      reverse: false,
      newsStyle: false,
    },

{
  rowno: 2,
  title: <h5>Seven ways to describe a mosquito season</h5>,
  content: (
    <>
      <p>
        Six of the seven models are <strong>mechanistic</strong>: they use
        information about mosquito biology, such as development, survival,
        reproduction, and responses to temperature, to simulate populations
        over time. The seventh uses <strong>machine learning</strong> to find
        relationships between environmental conditions and observed egg counts.
      </p>
      <p>We label the seven individual models as follows:</p>
      <ul>
        <li>
          <XLink href="https://doi.org/10.1371/journal.pone.0149282">
            <code>albopictus (sPop)</code>
          </XLink>
          , an age- and stage-structured population model driven by
          environmental conditions (
          <XLink href="https://github.com/kerguler/albopictus">code</XLink>).
        </li>
        <li>
          <XLink href="https://doi.org/10.18167/DVN1/APVHYM">
            <code>ArboCartoR</code>
          </XLink>
          , a spatially explicit model representing mosquito habitats and
          hosts to support local vector control (
          <XLink href="https://gitlab.cirad.fr/astre/arbocartoR">code</XLink>).
        </li>
        <li>
          <XLink href="https://doi.org/10.1186/s13071-022-05414-4">
            <code>dynamAedes</code>
          </XLink>
          , a stochastic, spatially explicit model that incorporates
          mosquito dispersal (
          <XLink href="https://mattmar.github.io/dynamAedes/">code</XLink>).
        </li>
        <li>
          <XLink href="https://doi.org/10.1098/rsif.2024.0319">
            <code>VECTRI</code>
          </XLink>
          , a climate-driven model linking mosquito population dynamics
          to temperature, rainfall, and surface hydrology (
          <XLink href="https://gitlab.com/tompkins/vectri">code</XLink>).
        </li>
        <li>
          <XLink href="https://doi.org/10.1098/rsif.2018.0761">
            <code>Metelmann et al.</code>
          </XLink>
          , a population model that incorporates diapausing eggs and
          photoperiod-dependent seasonal responses (
          <XLink href="https://github.com/radiciandrea/Metelmann2019Model">
            R adaptation
          </XLink>).
        </li>
        <li>
          <XLink href="https://doi.org/10.1038/s41467-024-52144-5">
            <code>AedesDDE</code>
          </XLink>
          , a size-structured population model that represents
          phenotypic plasticity and delayed responses to environmental
          conditions (
          <XLink href="https://github.com/DomBrass/Aedes_DDE">code</XLink>).
        </li>
        <li>
          <XLink href="https://doi.org/10.1038/s41598-025-87554-y">
            <code>Stacked Machine Learning</code>
          </XLink>
          , a data-driven approach combining several predictive algorithms
          through a meta-model to estimate weekly egg abundance (
          <XLink href="https://github.com/danddr/stackedML">code</XLink>).
        </li>
      </ul>
      <p>
        These models were designed for different purposes. Their differences
        are an advantage when exploring uncertainty, but they also mean that
        a single comparison cannot tell us which model is best for every task.
      </p>
    </>
    ),
      image: null,
      wide: true,
      reverse: false,
    },
    {
      rowno: 3,
      title: <h5>Putting the models on common ground</h5>,
      content: (
        <>
          <p>
            <strong>
              A fair comparison needs the same environmental information and the
              same observations for every model.
            </strong>
          </p>
          <p>
            We used hourly temperature and precipitation data from
            {' '}<XLink href="https://cds.climate.copernicus.eu/datasets/reanalysis-era5-land">ERA5-Land</XLink>{' '}
            for 2019–2022. Each model received inputs prepared at the time
            resolution it needs. Where a model required additional information,
            such as day length, population density, evaporation, or habitat
            suitability, these inputs were provided according to its formulation.
          </p>
          <p>
            We compared the predictions with the
            {' '}<XLink href="https://doi.org/10.5281/zenodo.11486198">VectAbundance</XLink>{' '}
            dataset, which brings together mosquito egg counts collected using
            ovitraps across several European countries. The observations were
            harmonised and represented on a 9 × 9 km grid.
          </p>
        </>
      ),
      image: ensembleSurveillance,
      caption: (
        <p>
          Locations used to compare the models (left), and variation in the week
          of first egg detection (right). Adapted from Figure 1 of Da Re et al.
        </p>
      ),
      wide: true,
      reverse: true,
      newsStyle: true,
    },
    {
      rowno: 4,
      title: <h5>Learning from earlier years, testing on a new year</h5>,
      content: (
        <>
          <p>
            We used observations from <strong>2019–2021</strong> at 93 grid
            cells for ensemble calibration. An independent
            dataset from <strong>2022</strong>, covering 72 grid cells, was
            reserved for testing.
          </p>
          <p>
            Some locations occur in both periods. There, we can ask whether
            the models describe a new year at a familiar site. Other locations
            appear only in the test dataset, allowing us to examine how well
            predictions transfer to places not represented during calibration.
          </p>
          <p>
            The observations are not equally complete everywhere. Some areas,
            particularly Emilia-Romagna in northern Italy, have extensive and
            consistent monitoring, while other locations have shorter or less
            regular records. This turns out to matter greatly.
          </p>
        </>
      ),
      image: null,
      wide: true,
      reverse: false,
    },
    {
      rowno: 5,
      title: <h5>Comparing the timing, not the absolute number</h5>,
      content: (
        <>
          <p>
            Different models do not necessarily predict egg numbers on the same
            scale. We therefore compared the <strong>shape of the seasonal
            activity profile</strong> rather than absolute abundance.
          </p>
          <p>
            We first aggregated observations and predictions into weekly values 
            using the median, then normalised each time series by dividing its weekly 
            values by their sum across all years. This allowed us to compare 
            the timing and relative intensity of egg laying, regardless of differences 
            in absolute abundance. For example, a normalised value of 0.05 indicates 
            that 5% of the total egg-laying activity over the study period occurred 
            during that particular week.          
          </p>
          <p>
            <strong>
              This tells us whether a model captures the beginning, peak, and
              decline of the mosquito season. It does not tell us how many
              mosquitoes or eggs will actually be present.
            </strong>
          </p>
        </>
      ),
      image: null,
      wide: true,
      reverse: false,
    },
    {
      rowno: 6,
      title: <h5>Building a weighted ensemble</h5>,
      content: (
        <>
          <p>
            An ensemble combines the predictions of several models. The simplest
            approach gives every model an equal say. We instead used a
            <strong> weighted average</strong>: models that contributed more
            consistently to good seasonal predictions could receive greater
            weight, while no model was excluded in advance.
          </p>
          <p>
            We inferred the weights using <strong>approximate Bayesian
            computation (ABC)</strong>. We tested many possible combinations
            against the training observations, ranked the ensemble alongside
            its seven constituent models at each location, and favoured
            combinations with a consistently good average rank across sites.
            We retained 100 plausible weight configurations to represent
            uncertainty in how much each model contributes.
          </p>
          <p>
            The figure shows the distribution of inferred weights. Rather
            than relying on a single set of numbers, the ensemble accounts for
            several plausible ways of combining the seven models.
          </p>
        </>
      ),
      image: ensembleWeights,
      caption: (
        <p>
          Distributions of the relative weights assigned to the seven individual
          models. Adapted from Figure 3 of Da Re et al.
        </p>
      ),
      wide: true,
      reverse: true,
      newsStyle: true,
    },
    {
      rowno: 7,
      title: <h5>A useful reality check: two simple baselines</h5>,
      content: (
        <>
          <p>
            We also compared the models with two deliberately simple
            predictors. <strong>Baseline I (persistence)</strong> assumes that next week's
            mosquito egg count will be the same as this week's. It can be
            useful over a single week, but depends on continuously updated
            observations. <strong>Baseline II (historical average)</strong> predicts each week's
            count from the average for that calendar week in previous years.
            It can describe a typical season farther in advance, provided
            historical observations are available.
          </p>
          <p>
            These baselines were used to <strong>evaluate</strong> the seven
            models and their ensemble. They were <strong>not</strong> included
            as members of the weighted ensemble.
          </p>
          <p>
            Both baselines reproduced the observed seasonal profiles better
            than the more elaborate models under the evaluation used in the
            study. This does not make them universally better predictors:
            persistence has a very short forecast horizon, while historical
            averages cannot anticipate unusual seasons or unfamiliar climates.
          </p>
        </>
      ),
      image: null,
      wide: true,
      reverse: false,
    },
    {
      rowno: 8,
      title: <h5>How well did the models perform?</h5>,
      content: (
        <>
          <p>
            We measured the difference between observed and predicted weekly
            seasonal profiles using <strong>relative squared error (RSE)</strong>.
            Smaller values indicate a closer match. For this study, an RSE
            below 0.5 was labelled a relatively good fit. To check how stable
            the results were, we repeated the evaluation across 100 bootstrap
            samples of the locations.
          </p>
          <p>
            The two baselines produced the largest numbers of good fits.
            Among the seven more elaborate models, predictive performance
            varied considerably. <strong>The weighted ensemble performed
            comparably to the stronger individual models, but did not
            consistently improve on them.</strong>
          </p>
          <p>
            This is not a ranking of which modelling approach is most valuable.
            Our test focuses on the weekly timing and relative intensity of egg
            laying, not absolute abundance, disease transmission, intervention
            effects, or predictions under future climates.
          </p>
        </>
      ),
      image: ensembleBenchmark,
      caption: (
        <p>
          Number of grid cells with a relatively good fit in the training
          (top) and test (bottom) datasets. Points and intervals summarise
          100 bootstrap resamples. Adapted from Figure 2 of Da Re et al.
        </p>
      ),
      wide: true,
      reverse: true,
      newsStyle: true,
    },
    {
      rowno: 9,
      title: <h5>Why some places are easier to predict</h5>,
      content: (
        <>
          <p>
            Predictive performance was far from uniform across Europe.
            The ensemble generally matched observations more closely in
            well-monitored parts of northern Italy, particularly the Po Plain
            and Emilia-Romagna, than in locations with sparse or irregular
            surveillance records.
          </p>
          <p>
            The examples show what a good and a poor fit can look like:
            the seasonal peak is fairly easy to recognise in some places,
            while observations elsewhere are too sporadic to establish a
            consistent pattern. Part of the geographic difference may also
            reflect the regional data used to develop or calibrate individual
            models, so surveillance density is not the only possible cause.
          </p>
          <p>
            <strong>
              Better weather data or more complicated models cannot fully
              compensate for missing, inconsistent mosquito observations.
            </strong>
          </p>
        </>
      ),
      image: ensemblePerformance,
      caption: (
        <p>
          Geographic variation in ensemble fit (left) and examples of observed
          and predicted weekly egg-laying profiles. Adapted from Figure 4 of
          Da Re et al.; lower RSE indicates closer agreement.
        </p>
      ),
      wide: true,
      reverse: false,
      newsStyle: true,
    },
    {
      rowno: 10,
      title: <h5>Further reading and data</h5>,
      content: (
        <>
          <p>
            This page summarises the methods and findings of
            <em> “A common benchmark for Aedes albopictus phenological models
            reveals surveillance data, not model complexity, as the limiting
            factor”</em> by Da Re and colleagues. The accompanying manuscript
            is under revision; a publication link will be added here once
            available.
          </p>
          <ul>
            <li><XLink href="https://ecoevorxiv.org/repository/view/15568">Pre-print version of the ensemble population modelling study</XLink></li>
            <li><XLink href="https://www.vectormodelling.com/">Vector Modelling Workshop: community model development</XLink></li>
          </ul>
        </>
      ),
      image: null,
      wide: true,
      reverse: false,
    },
  ],
};
