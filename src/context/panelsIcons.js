import seasonal from "assets/icons/map-page-right-menu/png/019-cloud-32px.png";
import adult from "assets/icons/map-page-right-menu/png/adult-32px.png";
import adultsandfly from "assets/icons/map-page-right-menu/png/mosquito-3-32px.png";
import adultsandfly1 from "assets/icons/map-page-right-menu/png/mosquito-3-aprdec-32px.png";
import adultsandfly2 from "assets/icons/map-page-right-menu/png/mosquito-3-aprjun-32px.png";
import adultsandfly3 from "assets/icons/map-page-right-menu/png/mosquito-3-julsep-32px.png";
import adultsandfly4 from "assets/icons/map-page-right-menu/png/mosquito-3-octdec-32px.png";
import larva from "assets/icons/map-page-right-menu/png/larva-32px.png";
import prpin from "assets/icons/map-page-right-menu/png/027-pin-32px.png";
import virus from "assets/icons/map-page-right-menu/png/013-coronavirus-32px.png";
import impact from "assets/icons/map-page-right-menu/png/015-heart rate-32px.png";
import model from "assets/icons/map-page-right-menu/png/019-refresh-32px.png";
import settingsIcon from "assets/icons/icons8-settings-50.png";
import info from "assets/icons/map-page-right-menu/png/008-files-32px.png";
import { createContext } from "react";
import { ChartIndicators } from "../components/ChartIndicators/CharterIndicators";
import TileSelector from "../components/TileSelector/TileSelector";
import suser from "../assets/icons/map-page-right-menu/png/007-arrows-32px.png";
import { useSelector } from "react-redux";

import ChangeMapPanel from "../components/vectorSelection/ChangeMapPanel/ChangeMapPanel";
import AlboParams from "components/AlboParams/AlboParams";
import SettingsPanel from "components/panel/SettingsPanel";
const PanelContext = createContext();

function PanelProvider({ children }) {
	const mapVector = useSelector(
		(state) => state.fetcher.fetcherStates.mapVector
	);
	const mapPagePosition = useSelector(
		(state) => state.fetcher.fetcherStates.map.mapPagePosition
	);
	const tileBase = process.env.REACT_APP_BASE_URL;
	const tileIconRowHeadings = [
		{ row: 1, label: "2010-2020" },
		{ row: 2, label: "2090-2100 (SSP 2-4.5)" },
		{ row: 3, label: "2090-2100 (SSP 5-8.5)" },
		{ row: 4, label: "1980-1990" },
	];

	const parPickerRowHeadings = tileIconRowHeadings;

	const tileIcons = [
		{
			key: "colegg",
			label: (
				<>
					2010-2020
					<br />
					Vector activity
				</>
			),
			icon: adult,
			tileLayer: {
				tile: tileBase + "?v=colegg&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 11,
			},
			description: (
				<>
					<p>
						Average decadal mosquito activity in 2010-2020 as predicted by the
						model (assumes tiger mosquito presence). The colour scale is
						proportional to the activity predicted in Emilia-Romagna.
					</p>
				</>
			),
		},
		{
			key: "larva",
			label: (
				<>
					2010-2020
					<br />
					Larva abundance
				</>
			),
			icon: larva,
			tileLayer: {
				tile: tileBase + "?v=larva&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 15,
			},
			description: (
				<>
					<p>
						The first calendar month when the predicted number of larva (in a
						typical breeding site) exceeds 1. No data is shown when the number
						of larva is always higher or lower than 1.
					</p>
				</>
			),
		},
		{
			key: "presence",
			label: <>Vector presence</>,
			icon: prpin,
			tileLayer: {
				tile: tileBase + "?v=presence&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 16,
			},
			description: (
				<>
					<p>
						All the grid cells that are somehow connected to an administrative
						polygon where the tiger mosquito has been reported.
					</p>
					<p>
						We obtained the polygons from{" "}
						<a
							href="https://data.apps.fao.org/catalog/dataset/global-administrative-unit-layers-gaul"
							target="_blank"
							rel="noreferrer"
						>
							GAUL
						</a>
						,{" "}
						<a
							href="https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units/nuts"
							target="_blank"
							rel="noreferrer"
						>
							NUTS3
						</a>
						, and{" "}
						<a
							href="https://www.ecdc.europa.eu/en/disease-vectors/surveillance-and-disease-data/mosquito-maps"
							target="_blank"
							rel="noreferrer"
						>
							ECDC/EFSA Mosquito Maps
						</a>{" "}
						datasets.
					</p>
				</>
			),
		},
		{
			key: "chikv_pouts",
			label: (
				<>
					2010-2020
					<br />
					Outbreak risk
				</>
			),
			icon: virus,
			tileLayer: {
				tile: tileBase + "?v=chikv_pouts&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 12,
			},
			description: (
				<>
					<p>
						Decadal averages of outbreak risk in 2010-2020 measured as the
						likeliness of starting an outbreak out of 100 independent
						importations in the first 60 days. The value shown represents a
						potential derived from the model. We assume vector presence in each
						grid cell.
					</p>
				</>
			),
		},
		{
			key: "chikv_iouts",
			label: (
				<>
					2010-2020
					<br />
					Importation impact
				</>
			),
			icon: impact,
			tileLayer: {
				tile: tileBase + "?v=chikv_iouts&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 13,
			},
			description: (
				<>
					<p>
						Decadal averages (2010-2020) of the expected impact of an infectious
						case imported in a population of 4000 susceptible individuals. The
						value shown represents a potential derived from the model. We assume
						vector presence in each grid cell.
					</p>
				</>
			),
		},
		{
			key: "colegg_ssp245",
			label: (
				<>
					2090-2100 (SSP 2-4.5)
					<br />
					Vector activity
				</>
			),
			icon: adult,
			tileLayer: {
				tile: tileBase + "?v=colegg_ssp245&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 22,
			},
			description: (
				<>
					<p>
						Average decadal mosquito activity in 2090-2100 as predicted by the
						model under the optimistic (SSP 2-4.5) scenario (assumes tiger
						mosquito presence). The colour scale is proportional to the activity
						predicted in Emilia-Romagna.
					</p>
				</>
			),
		},
		{
			key: "pouts_ssp245",
			label: (
				<>
					2090-2100 (SSP 2-4.5)
					<br />
					Outbreak risk
				</>
			),
			icon: virus,
			tileLayer: {
				tile: tileBase + "?v=pouts_ssp245&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 23,
			},
			description: (
				<>
					<p>
						Decadal averages of outbreak risk in 2090-2100 under the optimistic
						SSP 2-4.5 scenario. The risk is measured as the likeliness of
						starting an outbreak out of 100 independent importations in the
						first 60 days. The value shown represents a potential derived from
						the model. We assume vector presence in each grid cell.
					</p>
				</>
			),
		},
		{
			key: "iouts_ssp245",
			label: (
				<>
					2090-2100 (SSP 2-4.5)
					<br />
					Importation impact
				</>
			),
			icon: impact,
			tileLayer: {
				tile: tileBase + "?v=iouts_ssp245&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 24,
			},
			description: (
				<>
					<p>
						Decadal averages (2090-2100 under the optimistic SSP 2-4.5 scenario)
						of the expected impact of an infectious case imported in a
						population of 4000 susceptible individuals. The value shown
						represents a potential derived from the model. We assume vector
						presence in each grid cell.
					</p>
				</>
			),
		},
		{
			key: "colegg_ssp585",
			label: (
				<>
					2090-2100 (SSP 5-8.5)
					<br />
					Vector activity
				</>
			),
			icon: adult,
			tileLayer: {
				tile: tileBase + "?v=colegg_ssp585&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 32,
			},
			description: (
				<>
					<p>
						Average decadal mosquito activity in 2090-2100 as predicted by the
						model under the pessimistic (SSP 5-8.5) scenario (assumes tiger
						mosquito presence). The colour scale is proportional to the activity
						predicted in Emilia-Romagna.
					</p>
				</>
			),
		},
		{
			key: "pouts_ssp585",
			label: (
				<>
					2090-2100 (SSP 5-8.5)
					<br />
					Outbreak risk
				</>
			),
			icon: virus,
			tileLayer: {
				tile: tileBase + "?v=pouts_ssp585&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 33,
			},
			description: (
				<>
					<p>
						Decadal averages of outbreak risk in 2090-2100 under the pessimistic
						SSP 5-8.5 scenario. The risk is measured as the likeliness of
						starting an outbreak out of 100 independent importations in the
						first 60 days. The value shown represents a potential derived from
						the model. We assume vector presence in each grid cell.
					</p>
				</>
			),
		},
		{
			key: "iouts_ssp585",
			label: (
				<>
					2090-2100 (SSP 5-8.5)
					<br />
					Importation impact
				</>
			),
			icon: impact,
			tileLayer: {
				tile: tileBase + "?v=iouts_ssp585&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 34,
			},
			description: (
				<>
					<p>
						Decadal averages (2090-2100 under the pessimistic SSP 5-8.5
						scenario) of the expected impact of an infectious case imported in a
						population of 4000 susceptible individuals. The value shown
						represents a potential derived from the model. We assume vector
						presence in each grid cell.
					</p>
				</>
			),
		},
		{
			key: "colegg_1980",
			label: (
				<>
					1980-1990
					<br />
					Vector activity
				</>
			),
			icon: adult,
			tileLayer: {
				tile: tileBase + "?v=colegg_1980&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 42,
			},
			description: (
				<>
					<p>
						Average decadal mosquito activity in 1980-1990 as predicted by the
						model (assumes tiger mosquito presence). The colour scale is
						proportional to the activity predicted in Emilia-Romagna.
					</p>
				</>
			),
		},
		{
			key: "chikv_pouts_1980",
			label: (
				<>
					1980-1990
					<br />
					Outbreak risk
				</>
			),
			icon: virus,
			tileLayer: {
				tile: tileBase + "?v=chikv_pouts_1980&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 43,
			},
			description: (
				<>
					<p>
						Decadal averages of outbreak risk in 1980-1990 measured as the
						likeliness of starting an outbreak out of 100 independent
						importations in the first 60 days. The value shown represents a
						potential derived from the model. We assume vector presence in each
						grid cell.
					</p>
				</>
			),
		},
		{
			key: "chikv_iouts_1980",
			label: (
				<>
					1980-1990
					<br />
					Importation impact
				</>
			),
			icon: impact,
			tileLayer: {
				tile: tileBase + "?v=chikv_iouts_1980&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 44,
			},
			description: (
				<>
					<p>
						Decadal averages (1980-1990) of the expected impact of an infectious
						case imported in a population of 4000 susceptible individuals. The
						value shown represents a potential derived from the model. We assume
						vector presence in each grid cell.
					</p>
				</>
			),
		},
	];
	const parPickerTileIcons = tileIcons;
	const tileIconRowHeadingsSand = [{ row: 1, label: "2015" }];
	const tileIconsSand = [
		{
			key: "papatasi_aprdec",
			label: "April - December",
			icon: adultsandfly1,
			tileLayer: {
				tile: tileBase + "?v=papatasi_aprdec&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 11,
			},
			description: (
				<>
					<p>
						Average number of <i>Phlebotomus papatasi</i> females from April to
						December.
					</p>
				</>
			),
		},
		{
			key: "papatasi_aprjun",
			label: "April - June",
			icon: adultsandfly2,
			tileLayer: {
				tile: tileBase + "?v=papatasi_aprjun&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 12,
			},
			description: (
				<>
					<p>
						Average number of <i>Phlebotomus papatasi</i> females from April to
						June.
					</p>
				</>
			),
		},
		{
			key: "papatasi_julsep",
			label: "July - September",
			icon: adultsandfly3,
			tileLayer: {
				tile: tileBase + "?v=papatasi_julsep&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 13,
			},
			description: (
				<>
					<p>
						Average number of <i>Phlebotomus papatasi</i> females from July to
						September.
					</p>
				</>
			),
		},
		{
			key: "papatasi_octdec",
			label: "October - December",
			icon: adultsandfly4,
			tileLayer: {
				tile: tileBase + "?v=papatasi_octdec&z={z}&x={x}&y={y}",
				props: { attribution: "", noWrap: true },
				displayIndex: 14,
			},
			description: (
				<>
					<p>
						Average number of <i>Phlebotomus papatasi</i> females from October
						to December.
					</p>
				</>
			),
		},
	];

	const panelData = [
		{
			id: 0,
			key: "location_info",
			decade: "",
			icon: info,
			chartParameters: {},

			content: (
				<div className="text-area">
					<h1>Location Information</h1>
					<div>
						<ChartIndicators />
					</div>
				</div>
			),
		},
		{
			id: 1,
			key: "seasonal_profile",
			icon: seasonal,
			chartParameters: {
				chartType: "rechart",
				years: "2010-2019",
				horizontalAxis: "date",
				mixedKeys: [
					{
						key: "g1",
						levels: ["meteo-ts", "2010-2019", "atemp"],
					},
					{
						key: "g2",
						levels: ["meteo-ts", "2010-2019", "rehum"],
					},
					{
						key: "g3",
						levels: ["meteo-ts", "2010-2019", "precp"],
					},
				],

				sliceInfo: {
					g1: {
						sliceLabels: {
							slice0: "Temperature (°C)",
						},
						sliceColors: {
							slice0: "#F15A48",
						},
					},
					g2: {
						sliceLabels: { slice0: "Rel. humidity (%)" },
						sliceColors: { slice0: "#50C0AD" },
					},
					g3: {
						sliceLabels: { slice0: "Precipitation (mm)" },
						sliceColors: { slice0: "#1B3958" },
					},
				},
			},

			content: (
				<div className="text-area">
					<h1>Seasonal Profile</h1>
					<div>
						<p>
							Decadal averages (2010-2020) of some of the environmental
							variables obtained from the{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels"
							>
								ERA5
							</a>{" "}
							dataset.
						</p>
					</div>
				</div>
			),
		},
		{
			id: 2,
			key: "larva_forecast",
			chartParameters: {
				chartType: "rechart",
				years: "ecmwf",
				// brushStart: -6,
				// brushEnd: 3,
				mixedKeys: [
					{
						key: "g1",
						levels: ["fcast-ts", "ecmwf", "coln2"],
					},
					{
						key: "g2",
						levels: ["sim-ts", "2010-2019", "coln2"],
					},
				],
				horizontalAxis: "date",
				sliceInfo: {
					g1: {
						sliceLabels: {
							slice0: "This year",
							slice1: "Overlap",
							slice2: "Forecast",
						},
						sliceColors: {
							slice0: "#50C0AD",
							slice1: "orange",
							slice2: "#F15A48",
						},
					},
					g2: {
						sliceLabels: { slice0: "Decadal average" },
						sliceColors: { slice0: "#1B3958" },
					},
				},
			},
			icon: larva,
			content: (
				<div className="text-area">
					<h1>Larva Forecast</h1>
					<div>
						<p>
							Predicted number of larvae in a typical breeding site compared
							with the decadal averages.
						</p>
					</div>
				</div>
			),
		},
		{
			id: 3,
			key: "activity_forecast",

			chartParameters: {
				twins: [
					{ id: 12, display: false, simulation: true },
					{ id: 4, display: false },
				],

				chartType: "rechart",
				initialSetting: "fcast-ts",
				mixedKeys: [
					{
						key: "g1",
						levels: ["fcast-ts", "ecmwf", "colegg"],
					},
					{
						key: "g2",
						levels: ["sim-ts", "2010-2019", "colegg"],
					},
				],
				horizontalAxis: "date",
				sliceInfo: {
					g1: {
						sliceLabels: {
							slice0: "This year",
							slice1: "Overlap",
							slice2: "Forecast",
						},
						sliceColors: {
							slice0: "#50C0AD",
							slice1: "orange",
							slice2: "#F15A48",
						},
					},
					g2: {
						sliceLabels: { slice0: "Decadal activity" },
						sliceColors: { slice0: "#1B3958" },
					},
				},
			},

			icon: adult,
			content: (
				<div className="text-area">
					<h1>Activity Forecast</h1>
					<div>
						<p>
							Daily number of eggs laid by the Asian tiger mosquito as a proxy
							to biting activity.
						</p>
					</div>
				</div>
			),
		},
		{
			id: 4,
			decade: "2090-2100",
			key: "activity_forecast",
			chartParameters: {
				chartType: "rechart",
				years: "2090-2100",
				// brushStart: -6,
				// brushEnd: 3,
				mixedKeys: [
					{
						key: "g1",
						levels: ["fcast-ts", "nasa", "ssp245", "colegg"],
					},
					{
						key: "g2",
						levels: ["fcast-ts", "nasa", "ssp585", "colegg"],
					},
					{
						key: "g3",
						levels: ["sim-ts", "2010-2019", "colegg"],
					},
					{
						key: "g4",
						levels: ["sim-ts", "1980-1989", "colegg"],
					},
				],
				sliceInfo: {
					g1: {
						sliceColors: { slice0: "orange" },
						sliceLabels: { slice0: "SSP2-4.5" },
					},
					g2: {
						sliceColors: { slice0: "#F15A48" },
						sliceLabels: { slice0: "SSP5-8.5" },
					},
					g3: {
						sliceColors: { slice0: "#1B3958" },
						sliceLabels: { slice0: "2010-2020" },
					},
					g4: {
						sliceColors: { slice0: "#50C0AD" },
						sliceLabels: { slice0: "1980-1990" },
					},
				},
				horizontalAxis: "date",
			},
			icon: adult,
			content: (
				<div className="text-area">
					<h1>Activity Projections</h1>
					<div>
						<p>
							Daily number of eggs in 2010-2020, compared to the historical
							(1980-1990) and projected future (2090-2100) decadal averages. SSP
							2-4.5 and SSP 5-8.5 represent the optimistic and pessimistic
							scenarios, respectively.
						</p>
					</div>
				</div>
			),
		},
		{
			id: 5,
			key: "outbreak_forecast",
			chartParameters: {
				twins: [{ id: 6, display: false }],

				chartType: "rechart",
				years: "ecmwf",
				//brushStart and brushEnd are used to set the
				//initial range of the brush [months from the current date]
				// brushStart: -6,
				// brushEnd: 3,

				mixedKeys: [
					{
						key: "g1",
						levels: ["fcast-ts", "ecmwf", "pouts"],
					},
					{
						key: "g2",
						levels: ["sim-ts", "2010-2019", "pouts"],
					},
				],
				sliceInfo: {
					g1: {
						sliceLabels: {
							slice0: "This year",
							slice1: "Overlap",
							slice2: "Forecast",
						},
						sliceColors: {
							slice0: "#50C0AD",
							slice1: "orange",
							slice2: "#F15A48",
						},
					},
					g2: {
						sliceLabels: { slice0: "Decadal average" },
						sliceColors: { slice0: "#1B3958" },
					},
				},
				horizontalAxis: "date",
			},
			icon: virus,
			content: (
				<div className="text-area">
					<h1>Outbreak Forecast</h1>
					<div>
						<p>
							The likeliness of an outbreak in response to an imported
							infectious case according to the{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://doi.org/10.1371/journal.pone.0174293"
							>
								Chikungunya model
							</a>
							.
						</p>
						<p>
							We introduce an infectious case in a population of 4000. Outbreak{" "}
							<strong>risk</strong> is the number of times (out of 100) when an
							autochthonous case is observed.
						</p>
					</div>
				</div>
			),
		},
		{
			id: 6,
			decade: "2090-2100",
			key: "outbreak_forecast",
			chartParameters: {
				chartType: "rechart",
				years: "2090-2100",
				// brushStart: -6,
				// brushEnd: 3,
				mixedKeys: [
					{
						key: "g1",
						levels: ["fcast-ts", "nasa", "ssp245", "pouts"],
					},
					{
						key: "g2",
						levels: ["fcast-ts", "nasa", "ssp585", "pouts"],
					},
					{
						key: "g3",
						levels: ["sim-ts", "2010-2019", "pouts"],
					},
					{
						key: "g4",
						levels: ["sim-ts", "1980-1989", "pouts"],
					},
				],
				sliceInfo: {
					g1: {
						sliceLabels: { slice0: "SSP2-4.5" },
						sliceColors: { slice0: "orange" },
					},
					g2: {
						sliceLabels: { slice0: "SSP5-8.5" },
						sliceColors: { slice0: "#F15A48" },
					},
					g3: {
						sliceLabels: { slice0: "2010-2020" },
						sliceColors: { slice0: "#1B3958" },
					},
					g4: {
						sliceLabels: { slice0: "1980-1990" },
						sliceColors: { slice0: "#50C0AD" },
					},
				},
				horizontalAxis: "date",
			},
			icon: virus,
			content: (
				<div className="text-area">
					<h1>Outbreak Projections</h1>
					<div>
						<p>
							Average outbreak risk in 2010-2020, compared to the historical
							(1980-1990) and projected future (2090-2100) decadal averages. SSP
							2-4.5 and SSP 5-8.5 represent the optimistic and pessimistic
							scenarios, respectively.
						</p>
					</div>
				</div>
			),
		},
		{
			id: 7,
			key: "impact_forecast",

			chartParameters: {
				twins: [{ id: 8, display: false }],

				chartType: "rechart",
				years: "ecmwf",
				// brushStart: -6,
				// brushEnd: 3,
				xinit: { date0: 15, date1: 125 },
				mixedKeys: [
					{
						key: "g1",
						levels: ["fcast-ts", "ecmwf", "iouts"],
					},
					{
						key: "g2",
						levels: ["sim-ts", "2010-2019", "iouts"],
					},
				],
				horizontalAxis: "date",
				sliceInfo: {
					g1: {
						sliceLabels: {
							slice0: "This year",
							slice1: "Overlap",
							slice2: "Forecast",
						},
						sliceColors: {
							slice0: "#50C0AD",
							slice1: "orange",
							slice2: "#F15A48",
						},
					},
					g2: {
						sliceLabels: { slice0: "Decadal average" },
						sliceColors: { slice0: "#1B3958" },
					},
				},
			},
			icon: impact,
			content: (
				<div className="text-area">
					<h1>Impact Forecast</h1>
					<div>
						<p>
							The expected impact of an imported infectious case according to
							the{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://doi.org/10.1371/journal.pone.0174293"
							>
								Chikungunya model
							</a>
							.
						</p>
						<p>
							We introduce an infectious case in a population of 4000. The{" "}
							<strong>impact</strong> is the average number of autochthonous
							cases in 60 days.
						</p>
					</div>
				</div>
			),
		},
		{
			id: 8,
			decade: "2090-2100",
			key: "impact_forecast",
			chartParameters: {
				chartType: "rechart",
				years: "2090-2100",
				// brushStart: -6,
				// brushEnd: 3,
				mixedKeys: [
					{
						key: "g1",
						levels: ["fcast-ts", "nasa", "ssp245", "iouts"],
					},
					{
						key: "g2",
						levels: ["fcast-ts", "nasa", "ssp585", "iouts"],
					},
					{
						key: "g3",
						levels: ["sim-ts", "2010-2019", "iouts"],
					},
					{
						key: "g4",
						levels: ["sim-ts", "1980-1989", "iouts"],
					},
				],
				sliceInfo: {
					g1: {
						sliceLabels: { slice0: "SSP2-4.5" },
						sliceColors: { slice0: "orange" },
					},
					g2: {
						sliceLabels: { slice0: "SSP5-8.5" },
						sliceColors: { slice0: "#F15A48" },
					},
					g3: {
						sliceLabels: { slice0: "2010-2020" },
						sliceColors: { slice0: "#1B3958" },
					},
					g4: {
						sliceLabels: { slice0: "1980-1990" },
						sliceColors: { slice0: "#50C0AD" },
					},
				},
				horizontalAxis: "date",
			},
			icon: impact,
			content: (
				<div className="text-area">
					<h1>Impact Projections</h1>
					<div>
						<p>
							Average importation impact in 2010-2020, compared to the
							historical (1980-1990) and projected future (2090-2100) decadal
							averages. SSP 2-4.5 and SSP 5-8.5 represent the optimistic and
							pessimistic scenarios, respectively.
						</p>
					</div>
				</div>
			),
		},
		{
			id: 9,
			key: "tile_selector",
			chartParameters: {},

			icon: suser,
			content: <TileSelector tileIcons={tileIcons}></TileSelector>,
		},
		{
			id: 10,
			key: "vector_selector",
			chartParameters: {},

			icon: model,
			content: <ChangeMapPanel></ChangeMapPanel>,
		},
		{
			id: 11,
			key: "simulation_panel",
			icon: seasonal,
			chartParameters: {},
			content: (
				<div className="text-area">
					<h1>Simulation Data </h1>
					<div>
						<AlboParams />
						{/* <CoordinatePicker /> */}
					</div>
				</div>
			),
		},
		{
			id: 12,
			key: "simulation_graph",
			icon: seasonal,
			chartParameters: {
				chartType: "rechart",
				years: "ecmwf",
		
				mixedKeys: [
					{
						key: "g1",
						levels: ["test", "fcast-ts", "ecmwf", "iouts"],
					},
					{
						key: "g2",
						levels: ["ts", "fcast-ts", "ecmwf", "iouts"],
					},
				],

				horizontalAxis: "date",
				sliceInfo: {
					g1: {
						sliceLabels: {
							slice0: "This year (sim)",
							slice1: "Overlap (sim) ",
							slice2: "Forecast (sim)",
						},
						sliceColors: {
							slice0: "#1c2833",
							slice1: "#af7ac5",
							slice2: "#d98880",
						},
					},
					g2: {
						sliceLabels: {
							slice0: "This year",
							slice1: "Overlap",
							slice2: "Forecast",
						},
						sliceColors: {
							slice0: "#50C0AD",
							slice1: "orange",
							slice2: "#F15A48",
						},
					},
				},
			},
			content: (
				<div className="text-area">
					<h1>Simulation Data </h1>
					<div>
						<p>Here we will display simulation graphics</p>{" "}
					</div>
				</div>
			),
		},
		{
			id: 13,
			key: "settings_panel",
			icon: settingsIcon,
			chartParameters: {},
			content: (
				<div className="text-area">
					<h1>Settings Panel </h1>

					<SettingsPanel />
					{/* <CoordinatePicker /> */}
				</div>
			),
		},
	];
	const parPickerPanelData = [
		{
			id: 0,
			key: "location_info",
			decade: "",
			icon: info,
			chartParameters: {},

			content: (
				<div className="text-area">
					<h1>Location Information</h1>
					<div>
						<ChartIndicators />
					</div>
				</div>
			),
		},
		{
			id: 1,
			key: "seasonal_profile",
			icon: seasonal,

			chartParameters: {
				chartType: "rechart",
				years: "ecmwf",
		
				mixedKeys: [
					{
						key: "g1",
						levels: ["test", "fcast-ts", "ecmwf", "iouts"],
					},
					{
						key: "g2",
						levels: ["ts", "fcast-ts", "ecmwf", "iouts"],
					},
				],

				horizontalAxis: "date",
				sliceInfo: {
					g1: {
						sliceLabels: {
							slice0: "This year (sim)",
							slice1: "Overlap (sim) ",
							slice2: "Forecast (sim)",
						},
						sliceColors: {
							slice0: "#1c2833",
							slice1: "#af7ac5",
							slice2: "#d98880",
						},
					},
					g2: {
						sliceLabels: {
							slice0: "This year",
							slice1: "Overlap",
							slice2: "Forecast",
						},
						sliceColors: {
							slice0: "#50C0AD",
							slice1: "orange",
							slice2: "#F15A48",
						},
					},
				},
			},

			content: (
				<div className="text-area">
					<h1>Simulation Data </h1>
					<div>
						<AlboParams />
						{/* <CoordinatePicker /> */}
						<div
							style={{
								display: "flex",
								alignContent: "space-evenly",
								width: "100%",
								fontSize: "0.5rem",
							}}
						>
							<p> lat:{mapPagePosition.lat}</p>
							<p>
								{" "}
								lng:
								{mapPagePosition.lng}
							</p>
						</div>
					</div>
				</div>
			),
		},
	];
	const panelDataSand = [
		{
			id: 0,
			icon: info,
			chartParameters: {},
			key: "location_info",
			content: (
				<div className="text-area">
					<h1>Location Information</h1>
					<div>
						<ChartIndicators />
					</div>
				</div>
			),
		},
		{
			id: 1,
			key: "sandfly_population",
			icon: adultsandfly,
			chartParameters: {
				chartType: "rechart",
				years: "2015",
				mixedKeys: [
					{
						key: "g1",
						levels: ["sim-ts", "2015", "simL"],
					},
					{
						key: "g2",
						levels: ["sim-ts", "2015", "simH"],
					},
				],
				sliceInfo: {
					g1: {
						sliceLabels: { slice0: "Secondary land type" },
						sliceColors: { slice0: "#F15A48" },
					},
					g2: {
						sliceLabels: { slice0: "Primary land type" },
						sliceColors: { slice0: "#1B3958" },
					},
				},
				horizontalAxis: "date",
				lineSlice: [],
			},

			content: (
				<div className="text-area">
					<h1>Sand fly population size</h1>
					<div>
						<p>
							The number of females (normalised) for the year 2015 as simulated
							in{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://doi.org/10.1016/j.crpvbd.2023.100152"
							>
								Christou et al. (2023)
							</a>
							.
						</p>
					</div>
				</div>
			),
		},
		{
			id: 2,
			key: "sandfly_tile_selector",
			chartParameters: {},
			icon: suser,
			content: <TileSelector tileIcons={tileIconsSand}></TileSelector>,
		},
		{
			id: 3,
			chartParameters: {},
			key: "sandfly_vector_selector",
			icon: model,
			content: <ChangeMapPanel></ChangeMapPanel>,
		},
	];

	const sharedValues = {
		parPickerPanelData: parPickerPanelData,
		panelData: mapVector === "albopictus" ? panelData : panelDataSand, // panelDataSand,
		tileIcons: mapVector === "albopictus" ? tileIcons : tileIconsSand, // tileIconsSand,
		parPickerTileIcons: parPickerTileIcons,
		parPickerRowHeadings: parPickerRowHeadings,
		tileIconsRowHeadings:
			mapVector === "albopictus"
				? tileIconRowHeadings
				: tileIconRowHeadingsSand,
		tileIconsSand: tileIconsSand,
		tileIconsAlbo: tileIcons,
		panelDataSand: panelDataSand,
		panelDataAlbo: panelData,
	};

	// const [sharedValues, setSharedValues] = useState({
	// 	panelData: [],
	// 	tileIcons: [],
	// 	tileIconsRowHeadings: [],
	// });

	// useEffect(() => {
	// 	console.log("did we change to ", mapVector);
	// 	if (mapVector === "albopictus") {
	// 		setSharedValues({
	// 			panelData: panelData,
	// 			tileIcons: tileIcons,
	// 			tileIconsRowHeadings: tileIconRowHeadings,
	// 		});
	// 	} else if (mapVector === "papatasi") {
	// 		setSharedValues({
	// 			panelData: panelDataSand,
	// 			tileIcons: tileIconsSand,
	// 			tileIconsRowHeadings: tileIconRowHeadingsSand,
	// 		});
	// 	}
	// }, [mapVector]);

	return (
		<PanelContext.Provider value={sharedValues}>
			{children}
		</PanelContext.Provider>
	);
}
export default PanelContext;
export { PanelProvider };
