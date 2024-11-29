import { createContext } from "react";
import mosquitoPic from "../assets/images/many-mosquitoes-sm.webp";
import controlPic from "../assets/images/mosquito-control-sm.webp";
import worldPic from "../assets/images/digital-world-sm.webp";
import emiliaSurv from "../assets/images/methods-Emilia-Romagna-surv.webp";
import emiliaTSobs from "../assets/images/methods-Emilia-Romagna-TS-obs.webp";
import emiliaERA from "../assets/images/methods-Emilia-Romagna-ERA5.webp";
import emiliaTSsim from "../assets/images/methods-Emilia-Romagna-TS-sim.webp";
import emiliaTSchikv from "../assets/images/methods-Emilia-Romagna-TS-chikv.webp";
import graphPic from "../assets/images/sample-activity-profile.webp";
import emiliaTSrisk from "../assets/images/methods-Emilia-Romagna-TS-risk.webp";
import methodsForecast from "../assets/images/methods-forecast-ecmwf.webp";
import methodsForecastActivity from "../assets/images/methods-forecast-ecmwf-colegg.webp";
import methodsFutureActivity from "../assets/images/methods-future-nasa-colegg.webp";

import designPic from "../assets/images/connections-background-sm.webp";
import mosquitoesPic from "../assets/images/lots-of-mosquitoes-sm.webp";
import authorityPic from "../assets/images/virus-disinfection-sm.webp";
import boardPic from "../assets/images/mosquito-design-sm.webp";
import veclimPic from "../assets/images/veclim-rotary-sm.webp";
import dataPolicy from "../assets/documents/VEClim_Data Management Plan_20230905.pdf";
import logosPop from "../assets/images/info_sPop2.webp";

import logoZanzarA from "../assets/images/logos/contrib/zanzaratigre.webp";
import logoZanzarB from "../assets/images/logos/contrib/regione-emilia-romagna.webp";
import logoMosquitoAlert from "../assets/images/logos/contrib/LOGO_MosquitoAlert_horizontal_PNG_smm.webp";
import logoVectorBase from "../assets/images/logos/contrib/vectorbase.webp";

import imageCyprus from "../assets/images/project-Cyprus-sm.webp";
import imageFinance from "../assets/images/project-finance.webp";
import imageTime from "../assets/images/project-time.webp";
import DataPolicy from "../components/cookieConsent/DataPolicy/DataPolicy";
import IuBendaScripts from "../components/cookieConsent/IubendaScripts/IuBendaScripts";

import imageSandFlyIcon from "../assets/images/front_sand_fly.webp";
import imageClimateIcon from "../assets/images/front_climate.webp";

import imageSandFlyMicro from "../assets/images/methods-sandfly-micro2.webp";
import imageSandFlyCyprus from "../assets/images/methods-sandfly-Cyprus.webp";
import imageSandFlySEM from "../assets/images/methods-sandfly-SEM2.webp";
import imageSandFlyLeish from "../assets/images/methods-sandfly-leish.webp";
import imageSandFlyPhoto from "../assets/images/methods-sandfly-photo2.webp";
import imageSandFlyTime from "../assets/images/methods-sandfly-ts.webp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setDisplayedPanelIDLeft, setReadyToView } from "store";
import { setMapVector } from "store";
import { setTileArray } from "store";
import { setVectorName } from "store";
import { setCurrentMapBounds } from "store";

import { setCurrentMapZoom } from "store";
import PackageMapServices from "components/map/mapPackage/PackageMapServices";

const TextContext = createContext();

function TextProvider({ children }) {
	let location = useLocation();

	const months = [
		"JANUARY",
		"FEBRUARY",
		"MARCH",
		"APRIL",
		"MAY",
		"JUNE",
		"JULY",
		"AUGUST",
		"SEPTEMBER",
		"OCTOBER",
		"NOVEMBER",
		"DECEMBER",
	];
	const dispatch = useDispatch();
	const vectorName = useSelector(
		(state) => state.fetcher.fetcherStates.vectorName
	);
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector
	);
	const homePage = {
		id: 0,
		page: "HomePage",
		topper: {
			topperTitle: (
				<>
					<h1>Naughty Little Mosquito </h1>
				</>
			),
			topperContent: (
				<>
					<p>
						She bites and spreads disease with ease <br />
						A tiny pest we can't appease <br />
						When vigilance and diligence and ingenuity meet <br />
						This tiny foe we can defeat <br />
					</p>
				</>
			),
			topperWriter: null,
			topperReference: null,
		},
		rows: [
			{
				rowno: 0,
				title: "",
				content: (
					<>
						<h4>
							<Link
								onClick={() => {
									dispatch(setMapVector("papatasi"));
									PackageMapServices.handleToMapPageTransition(
										dispatch,
										vectorName,
										mapVector
									);
									dispatch(setReadyToView(false));
									dispatch(setDisplayedPanelIDLeft(0));
								}}
								to="/MapPage"
							>
								<img
									alt="sandfly"
									src={imageSandFlyIcon}
									width="200px"
									height="200px"
								></img>
							</Link>
							<Link
								onClick={() => {
									PackageMapServices.handleToMapPageTransition(
										dispatch,
										vectorName,
										mapVector
									);
									dispatch(setTileArray(["colegg", "colegg_ssp585"]));
									dispatch(setVectorName("albopictus"));
									dispatch(setMapVector("albopictus"));
									dispatch(setCurrentMapBounds(PackageMapServices.worldBounds));
									dispatch(setReadyToView(false));
									// dispatch(setDisplayedPanelIDLeft(6));
									//  dispatch(setMapPagePosition({ lat: 33.75, lng: 110.0 }));
									// dispatch(setPanelOpen(true));
									// dispatch(setMapMenuOpen(true));
									// dispatch(setSwitcher(true));
									// dispatch(setTwinIndex(1));
									dispatch(setCurrentMapZoom(3));
									// dispatch(setCurrentMapCenter([33.75, 110.0]));
									// dispatch(
									// 	setDirectMap({ lat: 33.75, lon: 110.0, display: 6 })
									// );
								}}
								to="/MapPage"
							>
								<img
									alt="long-term"
									src={imageClimateIcon}
									width="200px"
									height="200px"
								></img>
							</Link>
						</h4>
					</>
				),
			},
			{
				rowno: 1,
				title: (
					<>
						<h4>Will it rain mosquitoes today?</h4>
					</>
				),
				content: (
					<>
						<p>
							<strong>
								Scientists have been perfecting weather forecasts for decades -
								even if we think that those could still be a bit more accurate.
								A global effort, an endless collection of data, and mathematical
								ingenuity, all culminate in a notification on a mobile phone
								that it may rain today. Better get my umbrella!
							</strong>
						</p>
						<p>
							This website is a portal to what may be described as an early
							attempt to predict the risk of catching a disease from a mosquito.
							Not all mosquitoes can carry disease-causing pathogens. The ones
							that can are called vectors. Mosquitoes, ticks, sand flies, and
							many other insects can be vectors, and many vectors organise their
							lives religiously according to weather.
						</p>
						<p>
							We set out to follow the footsteps of the pioneers of atmospheric
							research, and help our community and authorities to prepare for
							today's, this year's, and this century's most notorious
							vector-borne diseases.
						</p>
					</>
				),
				image: mosquitoPic,
				reverse: false,
				wide: false,
				rotate: false,
				newsStyle: true,
			},
			{
				rowno: 1.5,
				title: "",
				content: (
					<>
						<h6 className="quote">
							<strong>
								This is an early attempt to predict the risk of catching a
								disease from a mosquito. Not all mosquitoes can carry
								disease-causing pathogens, only vectors can, and many vectors
								are highly sensitive to their environment.
							</strong>
						</h6>
					</>
				),
			},
			{
				rowno: 2,
				title: (
					<>
						<h4>How can you help?</h4>
					</>
				),
				content: (
					<>
						<p>
							{" "}
							<strong>
								Along with predictions, we will soon provide code, weather data
								(and more), and field observations of important vectors through
								this portal. You could contribute to these with your own data
								and models, or by simply letting us know how we are doing.
							</strong>{" "}
						</p>
						<p>
							This project is funded by the{" "}
							<a target="_blank" rel="noreferrer" href="https://wellcome.org">
								{" "}
								Wellcome Trust
							</a>{" "}
							as part of the{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://wellcome.org/what-we-do/climate-and-health"
							>
								Climate-Sensitive Infectious Diseases
							</a>{" "}
							initiative, and is being developed, hosted, and maintained by{" "}
							<a target="_blank" rel="noreferrer" href="https://www.cyi.ac.cy/">
								The Cyprus Institute
							</a>
							.{" "}
						</p>
					</>
				),
				image: controlPic,
				wide: false,
				rotate: false,
				reverse: true,
				newsStyle: true,
			},
		],
	};

	const methodsPage = {
		id: 1,
		page: "MethodsPage",
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
							populations and vector-borne diseases. One important vector
							species we study is called the Asian tiger mosquito, or{" "}
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
						{" "}
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
							collecting mosquito eggs every two weeks, from May to October,
							using special traps, called ovitraps. This extensive surveillance
							program is still operational, and the data are available at{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://www.zanzaratigreonline.it/"
							>
								ZANZARATIGREONLINE
							</a>
							.{" "}
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
							{" "}
							<strong>
								Mosquitoes depend heavily on external factors, such as water
								availability, shade, and humidity, in addition to temperature.
								They cannot control their body temperature. Rainfall and canopy,
								among many other ecological features, can play a role in
								determining the suitability of an area to a vector population.
								These features (drivers) are invaluable assets for developing a
								structured mathematical reasoning (a model) that can be tested
								and validated.
							</strong>{" "}
						</p>
						<p>
							Our first attempt at modelling the dynamics of mosquito
							populations in Italy was in 2015, which was published the year
							after in{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://doi.org/10.1371/journal.pone.0149282"
							>
								PLOS ONE
							</a>
							. We adopted a new kind of{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://f1000research.com/articles/7-1220/v3"
							>
								modelling
							</a>{" "}
							for this task, which involves keeping track of all life stages at
							different ages developing, surviving, and growing in response to
							the environment. The current version of the model, as we keep
							improving it, requires 48 parameters to describe these processes.
							The code is available as <code>Vector08c</code> in the{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://pypi.org/project/albopictus/"
							>
								<code>albopictus</code>
							</a>{" "}
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
						The average number of eggs collected during high seasons for every
						two weeks in Parma. The vertical lines indicate the standard error
						(the standard deviation divided by the square root of the number of
						traps).
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
						environmental datasets (0.25&deg; regular grid of the{" "}
						<a
							target="_blank"
							rel="noreferrer"
							href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels"
						>
							ERA5
						</a>
						) and obtain the daily average air temperature (at 2 m above
						ground), total precipitation (no distinction of rainfall or snow),
						the length of the day (depends on latitude), and the number of
						people living in a square kilometer. We run the model with each of
						the 100 parameter configurations and calculate the average
						prediction (the average number of eggs laid in two weeks).
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
						This dataset represents the observations made in the entire
						province, and the grid cell we chose seems to represent the area
						well. In our{" "}
						<a
							target="_blank"
							rel="noreferrer"
							href="https://doi.org/10.1371/journal.pone.0174293"
						>
							original study
						</a>
						, we involved more grid points and a slightly different set of
						environmental variables to calibrate the model; therefore, the
						output we show here may differ from one grid cell to another. What's
						reassuring is that the habitat suitability predicted by the model
						overlapped with more than 95% of the range of the tiger mosquito in
						Europe at the time of our analysis.
					</p>
				),
			},
			{
				rowno: 5.5,
				wide: false,
				title: "",
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
							Although we have taken a few good steps towards producing a
							reliable forecast for mosquito-borne diseases, we have a long way
							to reach our destination. It took more than a day or two for
							accurate weather forecast to become a reality. Even after
							centuries of mathematical advances, technological innovations,
							endless inflow of funds, and massive global data collection and
							sharing, we finally get it right most of the times for three to
							four days in advance.
						</p>
						<p>
							<strong>
								On the way to the forecast, we have what we call proxies, not
								quite like the real thing, but as good as one can hope for. The
								number of bites you scratch on your ankles can be a proxy to
								outbreak risk, and the number of vectors caught in specialised
								traps can be a proxy to the number of bites. We can predict the
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
						{" "}
						<p>
							In this version of VEClim, we employed two proxies as indicators
							of risk: (i) The expected number of larvae in a typical breeding
							site, and (ii) the adult female activity within the sampling range
							of a single ovitrap. Please note that we normalise all predictions
							with respect to the sampling intensity in Emilia-Romagna.
						</p>
						<p>
							<strong>
								Larva abundance comes directly from the model (larva is one of
								the four major stages of mosquito development), however, adult
								female activity is a proxy, which is given in terms of the
								number of eggs laid. In <code>Vector08c</code>, we assumed that
								females lay eggs every day and that adult female activity is
								proportional to the number of eggs. Mosquito activity will then
								become visible in the form of bites on nearby people.
							</strong>
						</p>
						<p>
							To evaluate larva counts and biting activity outside of Italy, we
							employed special cut-off values. For biting activity, we let 10
							and 50 (normalised bi-weekly egg numbers) delineate the beginning
							and end of the mosquito high season (that's 0.7 and 3.6 daily),
							and for larva counts, we let 1 and 50 (again, normalised bi-weekly
							numbers for Italy - 0.07 and 3.6 daily) capture the early rise of
							the population (intended as a trigger for mosquito control).
						</p>
					</>
				),
				image: emiliaTSrisk,
				caption: (
					<p>
						The number of eggs laid per trap per adult female mosquito as a
						proxy to biting activity.
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
						{" "}
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
						{" "}
						<p>
							After publishing our model for the tiger mosquito, we worked on
							disease transmission using a similar age-structured population
							model. We studied the 2007 chikungunya outbreak in Emilia-Romagna,
							and published our findings in{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://doi.org/10.1371/journal.pone.0174293"
							>
								PLOS ONE
							</a>
							. The model is available as <code>chikv</code> in the{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://pypi.org/project/albopictus/"
							>
								<code>albopictus</code>
							</a>{" "}
							Python package with 31 (additional) transmission-related
							parameters and 1000 variations of them, labelled as{" "}
							<code>QI</code>.
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
							outbreak simulations to demonstrate our risk estimation process.
							For each simulation, we introduced an infectious person (an
							importation) and followed the dynamics for 60 days. We recorded
							any autochthonous transmission (local transmission due to local
							conditions) if any.
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
						{" "}
						<p>
							<strong>
								As you see, the first simulation ended up with an average of
								7.51 additional infections per 1 imported case. However, only 20
								out of 100 repetitions ended up with infections other than the
								one introduced. Importations resulted in no infections 80% of
								the time. The second simulation ended up with a similar{" "}
								<span className="quote">impact</span> (10.35 cases per
								importation), but this time more repetitions turned up with
								additional cases (47 out of 100). We marked the second
								importation with a higher{" "}
								<span className="quote">outbreak risk</span>.
							</strong>
						</p>
						<p>
							We simulated imported cases day after day and marked the resulting
							impact and outbreak risk on each day of importation. We derived
							two risk indicators using a pair of cut-off values for each.
							First, we marked an outbreak risk larger than 50% as{" "}
							<strong>high</strong> and lower than 1% as <strong>low</strong>.
							Then, we marked an impact of more than 500 cases as{" "}
							<strong>high</strong> and less than 10 cases as{" "}
							<strong>low</strong>.
						</p>
					</>
				),
			},
			{
				rowno: 11,
				title: <h5>Medium-range predictions</h5>,
				content: (
					<>
						{" "}
						<p>
							<strong>
								Every month, the ECMWF publishes{" "}
								<a
									target="_blank"
									rel="noreferrer"
									href="https://cds-beta.climate.copernicus.eu/datasets/seasonal-original-single-levels"
								>
									seasonal forecasts
								</a>{" "}
								for temperature and precipitation at 6-hour intervals, with a
								7-month lead time. Although these forecasts come at a
								considerably lower spatial resolution (1&deg; regular grid),
								they are useful in identifying trends in seasonal averages.
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
						{" "}
						<p>
							Each forecast consists of an ensemble of 51 members, forecasts
							from the same model with alternative configurations. We combine
							each alternative with the latest ERA5 counterpart and average over
							the overlapping time period. Then, we run population dynamics and
							transmission risk simulations on each, label the average as a
							"forecast", and present a comparison with decadal averages. Above,
							you see each of the 51 alternative forecasts of air temperature,
							and below, you see the average vector activity simulated using
							these seasonal forecasts.
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
						{" "}
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
								(ACCESS-CM2, ACCESS-ESM1-5, and EC-Earth3) from the ensemble
								under the optimistic (SSP 2-4.5) and pessimistic (SSP 5-8.5)
								scenarios, and simulated the decadal averages of mosquito
								activity and outbreak risk/impact. Below, you see the
								temperature projections of the three climate models (under SSP
								5-8.5) together with the simulated average daily vector
								activity.
							</strong>
						</p>
					</>
				),
			},
		],
	};

	const policyPage = {
		id: 2,
		page: "PolicyPage",
		topper: {
			topperTitle: null,
			topperContent: (
				<p>
					"To a rough approximation, and setting aside
					<br />
					vertebrate chauvinism, it can be said that
					<br />
					essentially all organisms are insects."
				</p>
			),
			topperWriter: <p>Robert M. May</p>,
			topperReference: <p>(Science, 1988)</p>,
		},
		rows: [
			{
				rowno: 1,
				title: <h4>Our design philosophy</h4>,
				content: (
					<>
						{" "}
						<p className="quote">
							The risk of a disease outbreak is high in this area. Please take
							personal protective measures. The authorities are well-prepared
							and out in the field for the safety of all our citizens.
						</p>
						<p>
							<strong>
								A reliable forecast, a well-justified, verifiable, and timely
								prediction of risk, could serve many with different expectations
								and experiences. But what does a forecast mean? Where does it
								come from? What if we take precautions?
							</strong>
						</p>
						<p>
							The researcher (the analyst), who comes up with the forecast, is
							responsible for answering these questions. Being curious in nature
							and driven by a desire to get published, they would swiftly hand
							out answers with the most intricate details from the bottomless
							well of the human knowledge. We used a stochastic mechanistic data
							mining algorithm assimilated with atmospheric chemical dynamics.
							Simple, really. Think about the first time you faced the question
							Where do babies come from? The answer is almost always a lot
							simpler than you think and never the first thing that comes to
							your mind.
						</p>
						<p>
							<strong>
								It takes courage and experience to come up with a simple answer.
								Red means high risk and yellow means low risk, because the
								colour corresponds to the number of mosquitoes - the vector
								responsible for disease transmission - in that area. With each
								question comes an answer, and each answer bears more questions.
								Once the user is satisfied with the reasoning, they will either
								want to explore it further, push some buttons, and turn some
								knobs, or trust the process and take action to avoid the risk.
							</strong>
						</p>
					</>
				),
				image: designPic,
				rotate: false,
				wide: false,
				reverse: false,
				newsStyle: true,
			},
			{
				rowno: 2,
				title: <h5>Who is our audience?</h5>,
				content: (
					<p>
						The forecast speaks to anyone, another researcher or one of the two
						generic types: (i) The public, who could be a watchful mother, a
						natty business traveller, or an adventurous tourist; or (ii) the
						authority, who assumes the responsibility of detecting, reporting,
						or managing risks - a mosquito control expert, a public health
						specialist, or a regional/national coordinator. The dog walker could
						be satisfied with a warning and an advise, but the head of the
						vector control unit would demand to know more about the reasoning
						and ask for adjustments to better adapt the forecast to the specific
						conditions of the area under their responsibility. Regardless of the
						type, it would be wise to communicate the essence first, as clearly
						as possible, and lure the user into the mystical dungeons of
						scientific research for as long as they keep pulling on the thread.
					</p>
				),
				rotate: false,
				wide: false,
				reverse: true,
				image: authorityPic,
				newsStyle: true,
			},
			{
				rowno: 2.5,
				title: "",
				content: (
					<>
						<h6 className="quote">
							<strong>
								Instead of replicating the functionality of advanced analysis
								tools, we extend their capacity to accommodate climate-sensitive
								mechanistic modelling.
							</strong>
						</h6>
					</>
				),
			},
			{
				rowno: 3,
				title: <h5>Design to be understood</h5>,
				content: (
					<>
						{" "}
						<p>
							Responsibility to be understood lies on both parts. The
							information should be relevant to the intended user, and the user
							should demand to be informed. In VEClim, we develop tailor made
							tools to provide the type and amount of information requested by
							all three user types. We design to display the estimated risk (and
							proxies) up front in a simple and understandable way (
							<span className="quote">The Landing Page</span>) and to enable
							running alternative scenarios and customisations for a specific
							area for who is interested (<Link to="/MapPage">The Map</Link>).
						</p>
						<p>
							<strong>
								We do not expect to completely hand over the analysis to the end
								user and remove the experienced researcher from the equation. It
								is a long and painful process to mix, season, and simmer all the
								ingredients to prepare a noteworthy prediction. Although this is
								not much of an exquisite delicacy, one could be given all the
								ingredients and the recipe, but would still need training and
								experience in the tools to produce it.
							</strong>
						</p>
						<p>
							To the fellow researcher, though, we plan to share everything: the
							data and code and a good documentation of how to use it to
							replicate the results on display and to perform customised
							analyses (<span className="quote">The API</span>). Instead of
							replicating the functionality of well advanced analysis tools,
							such as Python, R, and QGIS, we extend their capacity to
							accommodate our models. We provide data and environmental drivers,
							such as temperature and rainfall, necessary to run our models, and
							focus on displaying our predictions, and the reasoning behind
							them, in a clear and understandable way.
						</p>
					</>
				),
				image: boardPic,
				rotate: false,
				wide: false,
				reverse: false,
				newsStyle: true,
			},
			{
				rowno: 4,
				content: (
					<>
						{" "}
						<p>
							The design of an interface is the key to its understandability and
							usability. A good design conveys a great deal of information and
							goes a long way in addressing the three fundamental questions of
							any user: (i) What am I seeing here?, (ii) How can I access the
							information I want?, and (iii) What should I do with this
							information?
						</p>
						<p>
							In VEClim, we include all three users in the design process, which
							takes several cycles of feedback and improvement to correctly
							address the needs of each. What you experience is a step in this
							process, and we need your feedback to reach the next step.
						</p>
					</>
				),
				title: <h5>Co-creating the platform</h5>,
				image: veclimPic,
				rotate: true,
				wide: false,
				newsStyle: true,
				reverse: true,
			},
			{
				rowno: 5,
				content: (
					<>
						{" "}
						<p>
							A big pile of fluffy stuff on a desk next to a microscope (looked
							more like a pair of inverted binoculars). Thousands of mosquitoes
							were piled up on the desk, and I was tasked to identify and count
							them all. First time, as part of a training course. Look for a
							tiny white stripe on the back of its head and for a white spot at
							the third junction of its leg , said the instructor. I was
							thinking that this might have been the first time I saw a mosquito
							in 3D. It laid flat in my own blood in all my previous encounters.
						</p>
						<p>
							Mosquito control is a fitting job for a rugged soldier, and
							surveillance, continuous trapping and identification and counting,
							is for the special forces - it requires skill, hard work, and
							patience. Then, someone asks you to just give it away for
							analysis. No way!
						</p>{" "}
						<p>
							<strong>
								Well, you shouldn’t. Like an artwork, your data should carry
								your signature and always be cited appropriately. Fortunately,
								nowadays digital technologies accommodate deposition and reuse
								of virtually endless amount of such data. Thousands of rows in a
								spreadsheet, easily extending over many encyclopaedia volumes,
								can be safely stored in online repositories, such as GBIF,
								Zenodo, and Figshare, with a stamp of authenticity and
								ownership, the DOI.
							</strong>
						</p>
						<p>
							Databases organising such data for reuse and analysis - they carve
							raw gems into beautiful diamonds - have the utmost responsibility
							to properly cite their data sources. In VEClim, we rely on well
							known initiatives - such as VectorBase, MosquitoAlert, and GBIF -
							organising, storing, and serving surveillance data in computer
							readable formats. We also keep a local database of environmental
							covariates, such as temperature and land cover, obtained from
							Copernicus Climate Data Services, and mine the literature for
							more.
						</p>
						<p>
							We develop our own models and predictions by working with friends
							and collaborators. We own our methods and code, and all is for
							sharing under the Creative Commons Attribution 4.0 License - CC BY
							4.0. We cite all the data we use, redistribute by preserving the
							appropriate licenses, and aim to acknowledge all the help we get.
							Please check our{" "}
							<a href={dataPolicy} target="_blank" rel="noreferrer">
								<span>
									<DataPolicy />
								</span>
							</a>{" "}
							for more.
						</p>
						<p>
							We value your privacy and we only collect the minimum necessary
							information to provide you with a useful service. Please check our{" "}
							<a
								href="https://www.iubenda.com/privacy-policy/10679144"
								className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe internal "
								title="Privacy Policy "
							>
								privacy policy
							</a>{" "}
							and our{" "}
							{/* <a
                target="_blank"
                rel="noreferrer"
                href="https://www.iubenda.com/privacy-policy/10679144/cookie-policy"
                className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe internal "
                title="Cookie Policy ">
                cookie policy
              </a>{" "} */}
							<IuBendaScripts id="10679144" type="cookie">
								cookie policy
							</IuBendaScripts>
							for more information.
						</p>
						<p>
							Please contact us if you wish to know more, and if you have any
							feedback on our data policies.
						</p>
					</>
				),
				title: <h5>Our data policy</h5>,
				image: mosquitoesPic,
				rotate: false,
				wide: false,
				newsStyle: true,
			},
			{
				rowno: 6,
				title: <h5>Disclaimers</h5>,
				content: (
					<p>
						We thank Leaflet map &copy;{" "}
						<a
							href="https://www.openstreetmap.org/copyright"
							target="_blank"
							rel="noreferrer"
						>
							OpenStreetMap
						</a>{" "}
						contributors &copy;{" "}
						<a
							href="https://carto.com/attributions"
							target="_blank"
							rel="noreferrer"
						>
							CARTO
						</a>
						. The maps, country boundaries, and place names are displayed as
						they are without any political intent.
					</p>
				),
				image: null,
				newsStyle: false,
			},
		],
	};

	const projectPage = {
		id: 3,
		page: "ProjectPage",
		topper: {
			topperTitle: null,
			topperContent: (
				<>
					<p>Twenty-four research teams in 12 countries </p>
					<p> will receive a total of £22.7 million </p>
					<p> to develop new digital tools to respond to </p>
					<p> the emerging threat of climate-sensitive infectious diseases.</p>
				</>
			),
			topperWriter: (
				<p>
					<a
						href="https://wellcome.org/news/digital-tools-climate-sensitive-infectious-disease"
						target="_blank"
						rel="noreferrer"
					>
						Wellcome Trust
					</a>
				</p>
			),
			topperReference: <></>,
			writerLink: true,
		},
		rows: [
			{
				rowno: 1,
				title: <h4>Who are we?</h4>,
				content: (
					<>
						{" "}
						<h6 className="quote">
							New digital tools to transform climate-sensitive infectious
							disease modelling
						</h6>
						<p>
							Climate warming inevitably affects all life forms. It will also
							affect mosquitoes and the diseases they spread. To quantify the
							risk and control the future spread of disease, we need to unravel
							the complex links between mosquitoes (and other disease vectors)
							and their environment.
						</p>
						<p>
							<strong>
								VEClim (ˈvɛklɪm) is one of the digital innovation projects
								supported by Wellcome Trust in our fight against climate threats
								on health. The project aims to promote mathematical modelling in
								predicting, and thus in helping to prepare for, diseases spread
								by mosquitoes and other vectors.
							</strong>
						</p>
						<div className="pins">
							<img alt="Cyprus" src={imageCyprus} />
							<img alt="Budget" src={imageFinance} />
							<img alt="Time" src={imageTime} />
						</div>
						<p>
							This is the first time Wellcome Trust directly awards a research
							institute in Cyprus. The Climate and Atmosphere Research Center
							(CARE-C) of The Cyprus Institute has received &euro;600k for 5
							years to develop the VEClim Platform (complete with{" "}
							<Link to="/MapPage">The Map</Link> and The API) and to help
							integrate predictive mathematical modeling into our arsenal
							against controlling disease vectors and preventing vector-borne
							diseases amid climate change.
						</p>
					</>
				),
				image: logosPop,
				rotate: false,
				wide: true,
				reverse: false,
				newsStyle: false,
			},
			{
				rowno: 2,
				title: <h4>Our contributors</h4>,
				content: (
					<>
						{" "}
						<h6 className="quote">
							Science will progress faster and further by a marriage of
							mathematical and empirical biology
						</h6>
						<p className="citation">
							Otto and Day (2007) "A Biologist's Guide to Mathematical Modeling
							in Ecology and Evolution"
						</p>
						<div className="contrib">
							<div className="logos">
								<a
									href="https://www.zanzaratigreonline.it"
									target="_blank"
									rel="noreferrer"
								>
									<img alt="ZanzaraTigreOnline" src={logoZanzarA} />
								</a>
								<br />
								<a
									href="https://www.zanzaratigreonline.it"
									target="_blank"
									rel="noreferrer"
								>
									<img alt="Emilia-Romagna" src={logoZanzarB} />
								</a>
							</div>
							<p>
								The multidisciplinary{" "}
								<strong>Technical Group of the Emilia-Romagna Region</strong>{" "}
								consists of public health experts, epidemiologists,
								entomologists, medical doctors, veterinarians and others, and is
								involved in vector surveillance in Emilia-Romagna, Italy. The
								Group collaborates in the drafting and implementation of the
								Regional Arbovirus Plan, and contributes to the development of
								local programs and actions. The Group is involved in the
								management of <i>Aedes albopictus</i> monitoring data.
							</p>
						</div>
						<div className="contrib">
							<div className="logos">
								<a
									href="https://www.mosquitoalert.com/"
									target="_blank"
									rel="noreferrer"
								>
									<img alt="MosquitoAlert" src={logoMosquitoAlert} />
								</a>
							</div>
							<p>
								<strong>Mosquito Alert</strong> is a pioneering citizen science
								initiative focused on tracking and studying the spread of
								mosquito populations. The project capitalizes on the collective
								strength of community observations. Since 2020, Mosquito Alert
								has expanded its operations across Europe, concentrating on the
								surveillance of invasive mosquitoes, with an emphasis on species
								such as the tiger mosquito (<i>Aedes albopictus</i>) and the
								yellow fever mosquito (<i>Aedes aegypti</i>). By utilizing a
								user-friendly app, Mosquito Alert empowers individuals to report
								their observations of mosquito activity.
							</p>
						</div>
						<div className="contrib">
							<div className="logos">
								<a
									href="https://vectorbase.org/vectorbase/app/"
									target="_blank"
									rel="noreferrer"
								>
									<img alt="VectorBase" src={logoVectorBase} />
								</a>
							</div>
							<p>
								The{" "}
								<strong>
									Eukaryotic Pathogen, Vector and Host Informatics Resource
								</strong>{" "}
								(VEuPathDB) is one of two Bioinformatics Resource Centers (BRCs)
								funded by the US National Institute of Allergy and Infectious
								Diseases (NIAID), with additional support from the Wellcome
								Trust (UK). VEuPathDB provides access to diverse genomic and
								other large-scale datasets related to eukaryotic pathogens and
								invertebrate vectors of infectious diseases, encompassing data
								from prior BRCs devoted to parasitic species (EuPathDB), fungi
								(FungiDB) and vector species (VectorBase).
							</p>
						</div>
					</>
				),
				rotate: false,
				wide: true,
				reverse: false,
				newsStyle: false,
			},
		],
	};
	const methodsPageSand = {
		id: 4,
		page: "MethodsPageSand",
		topper: {
			topperTitle: null,
			topperContent: (
				<>
					<p>
						"Most of the world’s poverty-related neglected diseases, including
						the NTDs <br />
						and the big three diseases - HIV/AIDS, tuberculosis, and malaria -
						are in fact <br />
						most widely prevalent in G20 economies"
					</p>
				</>
			),
			topperWriter: <p> Peter J. Hotez </p>,
			topperReference: <></>,
		},
		rows: [
			{
				rowno: 0,
				title: "",
				content: "",
				image: imageSandFlyMicro,
				rotate: false,
				wide: true,
				reverse: false,
				newsStyle: false,
			},
			{
				rowno: 1,
				title: <h4>A tropical disease - long neglected but deadly</h4>,
				content: (
					<>
						{" "}
						<p className="quote">
							<strong>
								"That's odd." he thought looking through the microscope. He
								turned the large brass knob a couple of degrees forward, then
								backward again, and shifted the slide only to pop another bunch
								of these in focus. He reached for the dark vial and carefully
								unscrewed the dropper. This was his legacy.
							</strong>
						</p>
						<p>
							He grew up in a family of scholars, and always aspired to unravel
							the never-ending mysteries of nature. This compound staining
							solution was his invention to mark native and foreign DNA in
							blood. Thus, he was helping to identify disease causing agents
							with ease.
						</p>
						<p>
							He carefully stained another preparation, but the result was the
							same, an assortment of purple speckles of a distinct oval shape.
							This was nothing like he has ever seen before, certainly not
							Plasmodium, the malaria parasite, but not quite the usual
							Trypanosoma either - that's the cause of another disease, the
							sleeping sickness.
						</p>
						<p>
							<strong>
								Since the dawn of our species, we have been battling with the
								forces of nature - fires, floods, and ferocious beasts. Most of
								what kills us, however, has been the ones too small to see.
								William Boog Leishman, a bright young pathologist at the
								beginning of the twentieth century, was studying the cause of a
								decades-long epidemic in India, named black fever or kala-azar.
								His discovery was later named by Sir Ronald Ross, the father of
								tropical medicine, as Leishmania donovani, a one-celled blood
								parasite causing the dreadful disease, visceral leishmaniasis.
							</strong>
						</p>
					</>
				),
				image: imageSandFlySEM,
				rotate: false,
				wide: false,
				reverse: false,
				newsStyle: true,
			},
			{
				rowno: 2,
				title: <h4>Neglected Tropical Diseases</h4>,
				content: (
					<>
						{" "}
						<p>
							Leishmaniasis is not one but a spectrum of diseases caused by
							around 20 parasite species of the <i>Leishmania</i> genus. It
							belongs to a group of neglected tropical diseases (NTDs)
							struggling to hold on to the global health agenda. It is fatal if
							untreated, or it leaves patients with serious disfigurement and
							disability, yet it remains neglected.
						</p>
						<p>
							<strong>
								NTDs mainly affect the poorest communities in Africa, Asia, and
								Latin America, but are widely prevalent in the impoverished
								areas of wealthy countries, afflicted with limited access to
								sanitary conditions, clean water, and health care. The
								pharmaceutical industry sees research and development in this
								area highly risky and hardly profitable. Most progress is thus
								made with the help of governments and foundations, and is rather
								slow and with great difficulty.
							</strong>
						</p>
						<p>
							Many NTDs show no immediate symptoms and spread in a population
							silently. When they do, however, maybe after many years, it
							becomes nearly impossible to identify the source of infection and
							take precautions. Social stigma does not make it any better as the
							affected tend to be ostracised, thus reluctant to seek medical
							attention.
						</p>
						<p>
							<strong>
								Fortunately, a substantial number of NTDs is vector-borne, and
								controlling the vector has proven immensely effective since the
								time of Sir Ronald Ross.
							</strong>
						</p>
					</>
				),
				image: imageSandFlyLeish,
				rotate: false,
				wide: true,
				reverse: false,
				newsStyle: false,
			},
			{
				rowno: 3,
				title: <h4>Sand Flies</h4>,
				content: (
					<>
						{" "}
						<p>
							Phlebotomine sand flies are the vectors of leishmaniasis and
							several phleboviruses, such as Naples, Sicilian, and Toscana
							viruses. They are much hairier and smaller than mosquitoes (about
							a quarter of their size) and they inflict a much more painful
							bite.
						</p>
						<p>
							<strong>
								The reason for this itchy blood meal is their lack of elaborate
								apparatus to access a vein for efficient blood collection.
								Instead, sand flies feed on the blood pool formed on the skin as
								they pierce it with their mouthparts. As a result of this messy
								operation, a considerable amount of saliva is transferred to the
								host along with potential allergens and pathogens.
							</strong>
						</p>
						<p>
							In contrast to mosquitoes, sand flies do not have an aquatic life
							stage, but they rely on humidity and decaying organic matter to
							reach adulthood. Cracks and holes in the ground, animal burrows,
							and leaf litter provide excellent breeding grounds. Temperature,
							as in the case of mosquitoes, plays a pivotal role in setting the
							pace of their entire life cycle.
						</p>
						<p>
							<strong>
								They bite humans and also other mammals, such as domestic dogs
								and rodents, which usually become part of the pathogen reservoir
								in an area.
							</strong>
						</p>
					</>
				),
				image: imageSandFlyPhoto,
				rotate: false,
				wide: false,
				reverse: false,
				newsStyle: true,
			},
			{
				rowno: 4,
				title: <h4>A Sand Fly Model for Cyprus</h4>,
				content: (
					<>
						{" "}
						<p>
							Cyprus is an island between Southeast Europe, North Africa, and
							West Asia. Although leishmaniasis was nearly eradicated from the
							island by 1996, an active circulation of the parasites has been
							reported amid a set of favourable conditions, such as rapid
							urbanisation, extensive agriculture, changing environmental
							conditions, and population movement from disease-endemic
							countries.
						</p>
						<p>
							<strong>
								The island hosts a rich sand fly fauna, where{" "}
								<i>Phlebotomus papatasi</i> is the most widely distributed. We
								have recently developed a climate-sensitive population dynamics{" "}
								<a
									href="https://doi.org/10.1016/j.crpvbd.2023.100152"
									rel="noreferrer"
									target="_blank"
								>
									model
								</a>{" "}
								for this species incorporating a combination of meteorological
								modelling and land cover characterisation.
							</strong>
						</p>
					</>
				),
				image: imageSandFlyCyprus,
				rotate: false,
				wide: false,
				reverse: true,
				newsStyle: true,
			},
			{
				rowno: 5,
				title: "",
				content: (
					<>
						<p>
							We simulated the relative spatial (2 km horizontal grid spacing)
							and temporal (daily time steps) dynamics of the species across the
							island for both primary and secondary habitats. Our simulations
							cover only 2015, with the initial quarter lost as the population
							transitions into the expected dynamics. Despite these limitations,
							our assessment indicates potential breeding habitats and times of
							peak activity, informing public health policies for developing
							optimum intervention strategies.
						</p>
					</>
				),
				caption: (
					<>
						{" "}
						<p>
							The average relative abundance of <i>Ph. papatasi</i> in Cyprus in
							2015. We performed two sets of simulations to represent
							populations growing in their primary and secondary habitats.
						</p>
					</>
				),
				image: imageSandFlyTime,
				rotate: false,
				wide: true,
				reverse: true,
				newsStyle: false,
			},
		],
	};
	let page;

	switch (location.pathname) {
		case "/":
			page = homePage;
			break;

		case "/Policy":
			page = policyPage;
			break;

		case "/Project":
			page = projectPage;
			break;

		case "/Methods/SandFly":
			page = methodsPageSand;
			break;

		case "/Methods/TigerMosquito":
			page = methodsPage;
			break;
		default:
			page = homePage;
	}

	const sharedValues = {
		months: months,
		pageTexts: [page],
	};

	return (
		<TextContext.Provider value={sharedValues}>{children}</TextContext.Provider>
	);
}

export default TextContext;
export { TextProvider };
