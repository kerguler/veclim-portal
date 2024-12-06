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

import info from "assets/icons/map-page-right-menu/png/008-files-32px.png";
import { createContext } from "react";
import { ChartIndicators } from "../components/ChartIndicators/CharterIndicators";
import TileSelector from "../components/TileSelector/TileSelector";
import suser from "../assets/icons/map-page-right-menu/png/007-arrows-32px.png";
import { useSelector } from "react-redux";

import ChangeMapPanel from "../components/vectorSelection/ChangeMapPanel/ChangeMapPanel";
import { useEffect } from "react";
import { useState } from "react";
import AlboParams from "components/AlboParams/AlboParams";
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
				initialSetting: "meteo-ts",
				years: "2010-2019",
				plottedKeys: ["atemp", "rehum", "precp"],
				colors: ["#F15A48", "#50C0AD", "#1B3958"],
				horizontalAxis: "date",
				labels: ["Temperature (°C)", "Rel. humidity (%)", "Precipitation (mm)"],
				lineSlice: [],
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
				initialSetting: "fcast-ts",
				years: "ecmwf",
				// xbrushStart: -6,
				// xbrushEnd: 3,
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
				plottedKeys: ["g1", "g2"],
				colors: ["#1B3958", "#1B3958"],
				horizontalAxis: "date",
				lineSlice: ["g1"],
				labels: ["Larva forecast", "Decadal average"],
				sliceLabels: ["This year", "Overlap", "Forecast"],
				sliceColors: ["#50C0AD", "orange", "#F15A48"],
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
				twins: [{ id: 4, display: false }],

				chartType: "rechart",
				initialSetting: "fcast-ts",
				years: "ecmwf",
				// xbrushStart: -6,
				// xbrushEnd: 3,
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
				plottedKeys: ["g1", "g2"],
				colors: ["#1B3958", "#1B3958"],
				horizontalAxis: "date",
				lineSlice: ["g1"],
				labels: ["Activity forecast", "Decadal activity"],
				sliceLabels: ["This year", "Overlap", "Forecast"],
				sliceColors: ["#50C0AD", "orange", "#F15A48"],
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
				initialSetting: "fcast-ts",
				years: "2090-2100",
				// xbrushStart: -6,
				// xbrushEnd: 3,
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
				plottedKeys: ["g1", "g2", "g3", "g4"],
				colors: ["orange", "#F15A48", "#1B3958", "#50C0AD"],
				sliceColors: ["#50C0AD", "orange", "#F15A48"],
				horizontalAxis: "date",
				lineSlice: [],
				labels: ["SSP2-4.5", "SSP5-8.5", "2010-2020", "1980-1990"],
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
				twins: [{ id: 5.5, display: false }],

				chartType: "rechart",
				initialSetting: "fcast-ts",
				years: "ecmwf",
				//xBrushStart and xBrushEnd are used to set the
				//initial range of the brush [months from the current date]
				// xbrushStart: -6,
				// xbrushEnd: 3,
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
				plottedKeys: ["g1", "g2"],
				colors: ["#1B3958", "#1B3958"],
				horizontalAxis: "date",
				lineSlice: ["g1"],
				labels: ["Risk forecast", "Decadal average"],
				sliceLabels: ["This year", "Overlap", "Forecast"],
				sliceColors: ["#50C0AD", "orange", "#F15A48"],
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
			id: 5.5,
			decade: "2090-2100",
			key: "outbreak_forecast",
			chartParameters: {
				chartType: "rechart",
				initialSetting: "fcast-ts",
				years: "2090-2100",
				// xbrushStart: -6,
				// xbrushEnd: 3,
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
				plottedKeys: ["g1", "g2", "g3", "g4"],
				colors: ["orange", "#F15A48", "#1B3958", "#50C0AD"],
				sliceColors: ["#50C0AD", "orange", "#F15A48"],
				horizontalAxis: "date",
				lineSlice: [],
				labels: ["SSP2-4.5", "SSP5-8.5", "2010-2020", "1980-1990"],
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
			id: 6,
			key: "impact_forecast",

			chartParameters: {
				twins: [{ id: 6.5, display: false }],

				chartType: "rechart",
				initialSetting: "fcast-ts",
				years: "ecmwf",
				// xbrushStart: -6,
				// xbrushEnd: 3,
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
				plottedKeys: ["g1", "g2"],
				colors: ["#1B3958", "#1B3958"],
				horizontalAxis: "date",
				lineSlice: ["g1"],
				labels: ["Impact forecast", "Decadal average"],
				sliceLabels: ["This year", "Overlap", "Forecast"],
				sliceColors: ["#50C0AD", "orange", "#F15A48"],
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
			id: 6.5,
			decade: "2090-2100",
			key: "impact_forecast",
			chartParameters: {
				chartType: "rechart",
				initialSetting: "fcast-ts",
				years: "2090-2100",
				// xbrushStart: -6,
				// xbrushEnd: 3,
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
				plottedKeys: ["g1", "g2", "g3", "g4"],
				colors: ["orange", "#F15A48", "#1B3958", "#50C0AD"],
				sliceColors: ["#50C0AD", "orange", "#F15A48"],
				horizontalAxis: "date",
				lineSlice: [],
				labels: ["SSP2-4.5", "SSP5-8.5", "2010-2020", "1980-1990"],
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
			id: 7,
			key: "tile_selector",
			chartParameters: {},

			icon: suser,
			content: <TileSelector tileIcons={tileIcons}></TileSelector>,
		},
		{
			id: 8,
			key: "vector_selector",
			chartParameters: {},

			icon: model,
			content: <ChangeMapPanel></ChangeMapPanel>,
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
				initialSetting: "test",
				years: "ecmwf",
				// xbrushStart: -6,
				// xbrushEnd: 3,
				mixedKeys: [
					{
						key: "g1",
						levels: ["test", "fcast-ts", "ecmwf", "iouts"],
					},
					{
						key: "g2",
						levels: ["fcast-ts", "ecmwf", "iouts"],
					},
				],
				plottedKeys: ["g1", "g2"],
				colors: ["#1B3958", "#1B3958", "#000000"],
				colorsAlbo: ["1B3958", "#1B3958", "#000000","#1B3958", "#1B3958", "#000000"],
				horizontalAxis: "date",
				lineSlice: ["g1", "g2"],
				labels: ["Activity forecast", "Decadal activity"],
				sliceLabels: ["This year", "Overlap", "Forecast"],
				sliceColors: ["#50C0AD", "orange", "#F15A48"],
				sliceLabelsAlbo: ["This year Albo", "OverlapAlbo ", "ForecastAlbo"],
				sliceColorsAlbo: ["#50C0AD", "orange", "#F15A48"],
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
				initialSetting: "sim-ts",
				years: "2015",
				plottedKeys: ["simL", "simH"],
				colors: ["#F15A48", "#1B3958"],
				horizontalAxis: "date",
				labels: ["Secondary land type", "Primary land type"],
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
