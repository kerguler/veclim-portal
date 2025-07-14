import seasonal from 'assets/icons/map-page-right-menu/png/019-cloud-32px.png';
import adult from 'assets/icons/map-page-right-menu/png/adult-32px.png';
import adultsandfly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import adultsandfly1 from 'assets/icons/map-page-right-menu/png/mosquito-3-aprdec-32px.png';
import adultsandfly2 from 'assets/icons/map-page-right-menu/png/mosquito-3-aprjun-32px.png';
import adultsandfly3 from 'assets/icons/map-page-right-menu/png/mosquito-3-julsep-32px.png';
import adultsandfly4 from 'assets/icons/map-page-right-menu/png/mosquito-3-octdec-32px.png';
import larva from 'assets/icons/map-page-right-menu/png/larva-32px.png';
import prpin from 'assets/icons/map-page-right-menu/png/027-pin-32px.png';
import virus from 'assets/icons/map-page-right-menu/png/013-coronavirus-32px.png';
import impact from 'assets/icons/map-page-right-menu/png/015-heart rate-32px.png';
import model from 'assets/icons/map-page-right-menu/png/019-refresh-32px.png';
import settingsIcon from 'assets/icons/map-page-right-menu/svg/plot-icon.svg';
import info from 'assets/icons/map-page-right-menu/png/008-files-32px.png';
import { createContext } from 'react';
import { ChartIndicators } from '../components/ChartIndicators/CharterIndicators';
import TileSelector from '../components/TileSelector/TileSelector';
import suser from '../assets/icons/map-page-right-menu/png/007-arrows-32px.png';
import { useSelector } from 'react-redux';
import menuIcon from 'assets/icons/map-page-right-menu/png/menu-32px.png';
import OptionsPanel from 'components/optionsPanel/OptionsPanel';
import ChangeMapPanel from '../components/vectorSelection/ChangeMapPanel/ChangeMapPanel';
import { useEffect } from 'react';
import { useState } from 'react';
import AlboParams from 'components/AlboParams/AlboParams';
import SettingsPanel from 'components/panel/SettingsPanel';
import { icon } from 'leaflet';
const PanelContextV2 = createContext();

function PanelProviderV2({ children }) {
  const mapVector = useSelector((state) => state.fetcher.fetcherStates.mapVector);
  const mapPagePosition = useSelector((state) => state.fetcher.fetcherStates.map.mapPagePosition);
  const tileBase = process.env.REACT_APP_BASE_URL;

  const fcastDateRange = '2025-07-01:2025-10-01';
  const fcastDateLabel = 'July - September, 2025';

  const tileIconRowHeadings = [
    { row: 1, label: '2010-2020' },
    { row: 2, label: 'Mid-term predictions' },
    { row: 3, label: '2090-2100 (SSP 2-4.5)' },
    { row: 4, label: '2090-2100 (SSP 5-8.5)' },
    { row: 5, label: '1980-1990' },
  ];
  const tileIcons = [
    {
      key: 'colegg',
      colkey: 'colegg',
      label: (
        <>
          2010-2020
          <br />
          Vector activity
        </>
      ),
      icon: adult,
      tileLayer: {
        tile: tileBase + '?v=colegg&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 11,
      },
      description: (
        <>
          <p>
            Average decadal mosquito activity in 2010-2020 as predicted by the model (assumes tiger
            mosquito presence). The colour scale is proportional to the activity predicted in
            Emilia-Romagna.
          </p>
        </>
      ),
    },
    {
      key: 'larva',
      colkey: 'larva',
      label: (
        <>
          2010-2020
          <br />
          Larva abundance
        </>
      ),
      icon: larva,
      tileLayer: {
        tile: tileBase + '?v=larva&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 15,
      },
      description: (
        <>
          <p>
            The first calendar month when the predicted number of larva (in a typical breeding site)
            exceeds 1. No data is shown when the number of larva is always higher or lower than 1.
          </p>
        </>
      ),
    },
    {
      key: 'albosurv',
      colkey: 'albosurv',
      label: <>Vector presence</>,
      icon: prpin,
      tileLayer: {
        tile: tileBase + '?v=albosurv&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 16,
      },
      description: (
        <>
          <p>
            All the grid cells that are somehow connected to an administrative polygon where the
            tiger mosquito has been reported.
          </p>
          <p>
            We obtained the polygons from{' '}
            <a
              href="https://data.apps.fao.org/catalog/dataset/global-administrative-unit-layers-gaul"
              target="_blank"
              rel="noreferrer"
            >
              GAUL
            </a>
            ,{' '}
            <a
              href="https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units/nuts"
              target="_blank"
              rel="noreferrer"
            >
              NUTS3
            </a>
            , and{' '}
            <a
              href="https://www.ecdc.europa.eu/en/disease-vectors/surveillance-and-disease-data/mosquito-maps"
              target="_blank"
              rel="noreferrer"
            >
              ECDC/EFSA Mosquito Maps
            </a>{' '}
            datasets.
          </p>
          <p>
            We display average seasonal dynamics from{' '}
            <a href="https://doi.org/10.5281/zenodo.11486198" target="_blank" rel="noreferrer">
              VectAbundance
            </a>
            ,{' '}
            <a
              href="https://www.gbif.org/dataset/03269e13-84ae-430f-990e-f11069413e36"
              target="_blank"
              rel="noreferrer"
            >
              AIMsurv
            </a>
            , and{' '}
            <a href="https://vectorbase.org/vectorbase/app/" target="_blank" rel="noreferrer">
              VectorBase
            </a>{' '}
            surveillance datasets.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_pouts',
      colkey: 'chikv_pouts',
      label: (
        <>
          2010-2020
          <br />
          Outbreak risk
        </>
      ),
      icon: virus,
      tileLayer: {
        tile: tileBase + '?v=chikv_pouts&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 12,
      },
      description: (
        <>
          <p>
            Decadal averages of outbreak risk in 2010-2020 measured as the likeliness of starting an
            outbreak out of 100 independent importations in the first 60 days. The value shown
            represents a potential derived from the model. We assume vector presence in each grid
            cell.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_iouts',
      colkey: 'chikv_iouts',
      label: (
        <>
          2010-2020
          <br />
          Importation impact
        </>
      ),
      icon: impact,
      tileLayer: {
        tile: tileBase + '?v=chikv_iouts&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 13,
      },
      description: (
        <>
          <p>
            Decadal averages (2010-2020) of the expected impact of an infectious case imported in a
            population of 4000 susceptible individuals. The value shown represents a potential
            derived from the model. We assume vector presence in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'colegg_dates',
      colkey: 'colegg',
      linked: 'colegg_fcast',
      label: (
        <>
          {fcastDateLabel}
          <br />
          Decadal average
          <br />
          Vector activity
        </>
      ),
      icon: adult,
      tileLayer: {
        tile: tileBase + '?v=colegg&z={z}&x={x}&y={y}&dates=' + fcastDateRange,
        props: { attribution: '', noWrap: true },
        displayIndex: 21,
      },
      description: (
        <>
          <p>
            Average decadal mosquito activity in {fcastDateLabel} as predicted by the model (assumes
            tiger mosquito presence).
          </p>
        </>
      ),
    },
    {
      key: 'colegg_fcast',
      colkey: 'colegg',
      hidden: true,
      label: (
        <>
          {fcastDateLabel}
          <br />
          Predicted
          <br />
          Vector activity
        </>
      ),
      icon: adult,
      tileLayer: {
        tile: tileBase + '?v=colegg_fcast&z={z}&x={x}&y={y}&dates=' + fcastDateRange,
        props: { attribution: '', noWrap: true },
        displayIndex: 22,
      },
      description: (
        <>
          <p>
            Mosquito activity in {fcastDateLabel} as predicted by the model (assumes tiger mosquito
            presence) using low-resolution ECMWF seasonal forecasts.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_pouts_dates',
      colkey: 'chikv_pouts',
      linked: 'chikv_pouts_fcast',
      label: (
        <>
          {fcastDateLabel}
          <br />
          Decadal average
          <br />
          Outbreak risk
        </>
      ),
      icon: virus,
      tileLayer: {
        tile: tileBase + '?v=chikv_pouts&z={z}&x={x}&y={y}&dates=' + fcastDateRange,
        props: { attribution: '', noWrap: true },
        displayIndex: 23,
      },
      description: (
        <>
          <p>
            Average decadal outbreak risk in {fcastDateLabel} measured as the likeliness of starting
            an outbreak out of 100 independent importations in the first 60 days. The value shown
            represents a potential derived from the model. We assume vector presence in each grid
            cell.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_pouts_fcast',
      colkey: 'chikv_pouts',
      hidden: 'true',
      label: (
        <>
          {fcastDateLabel}
          <br />
          Predicted
          <br />
          Outbreak risk
        </>
      ),
      icon: virus,
      tileLayer: {
        tile: tileBase + '?v=chikv_pouts_fcast&z={z}&x={x}&y={y}&dates=' + fcastDateRange,
        props: { attribution: '', noWrap: true },
        displayIndex: 24,
      },
      description: (
        <>
          <p>
            Outbreak risk in {fcastDateLabel} measured as the likeliness of starting an outbreak out
            of 100 independent importations in the first 60 days using low-resolution ECMWF seasonal
            forecasts.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_iouts_dates',
      colkey: 'chikv_iouts',
      linked: 'chikv_iouts_fcast',
      label: (
        <>
          {fcastDateLabel}
          <br />
          Decadal average
          <br />
          Importation impact
        </>
      ),
      icon: impact,
      tileLayer: {
        tile: tileBase + '?v=chikv_iouts&z={z}&x={x}&y={y}&dates=' + fcastDateRange,
        props: { attribution: '', noWrap: true },
        displayIndex: 25,
      },
      description: (
        <>
          <p>
            Average decadal expected impact of an infectious case imported in {fcastDateLabel}, in a
            population of 4000 susceptible individuals. The value shown represents a potential
            derived from the model. We assume vector presence in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_iouts_fcast',
      colkey: 'chikv_iouts',
      hidden: 'true',
      label: (
        <>
          {fcastDateLabel}
          <br />
          Predicted
          <br />
          Importation impact
        </>
      ),
      icon: impact,
      tileLayer: {
        tile: tileBase + '?v=chikv_iouts_fcast&z={z}&x={x}&y={y}&dates=' + fcastDateRange,
        props: { attribution: '', noWrap: true },
        displayIndex: 26,
      },
      description: (
        <>
          <p>
            Expected impact of an infectious case imported in {fcastDateLabel}, in a population of
            4000 susceptible individuals estimated using low-resolution ECMWF seasonal forecasts.
          </p>
        </>
      ),
    },
    {
      key: 'colegg_ssp245',
      colkey: 'colegg_ssp245',
      label: (
        <>
          2090-2100 (SSP 2-4.5)
          <br />
          Vector activity
        </>
      ),
      icon: adult,
      tileLayer: {
        tile: tileBase + '?v=colegg_ssp245&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 32,
      },
      description: (
        <>
          <p>
            Average decadal mosquito activity in 2090-2100 as predicted by the model under the
            optimistic (SSP 2-4.5) scenario (assumes tiger mosquito presence). The colour scale is
            proportional to the activity predicted in Emilia-Romagna.
          </p>
        </>
      ),
    },
    {
      key: 'pouts_ssp245',
      colkey: 'pouts_ssp245',
      label: (
        <>
          2090-2100 (SSP 2-4.5)
          <br />
          Outbreak risk
        </>
      ),
      icon: virus,
      tileLayer: {
        tile: tileBase + '?v=pouts_ssp245&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 33,
      },
      description: (
        <>
          <p>
            Decadal averages of outbreak risk in 2090-2100 under the optimistic SSP 2-4.5 scenario.
            The risk is measured as the likeliness of starting an outbreak out of 100 independent
            importations in the first 60 days. The value shown represents a potential derived from
            the model. We assume vector presence in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'iouts_ssp245',
      colkey: 'iouts_ssp245',
      label: (
        <>
          2090-2100 (SSP 2-4.5)
          <br />
          Importation impact
        </>
      ),
      icon: impact,
      tileLayer: {
        tile: tileBase + '?v=iouts_ssp245&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 34,
      },
      description: (
        <>
          <p>
            Decadal averages (2090-2100 under the optimistic SSP 2-4.5 scenario) of the expected
            impact of an infectious case imported in a population of 4000 susceptible individuals.
            The value shown represents a potential derived from the model. We assume vector presence
            in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'colegg_ssp585',
      colkey: 'colegg_ssp585',
      label: (
        <>
          2090-2100 (SSP 5-8.5)
          <br />
          Vector activity
        </>
      ),
      icon: adult,
      tileLayer: {
        tile: tileBase + '?v=colegg_ssp585&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 42,
      },
      description: (
        <>
          <p>
            Average decadal mosquito activity in 2090-2100 as predicted by the model under the
            pessimistic (SSP 5-8.5) scenario (assumes tiger mosquito presence). The colour scale is
            proportional to the activity predicted in Emilia-Romagna.
          </p>
        </>
      ),
    },
    {
      key: 'pouts_ssp585',
      colkey: 'pouts_ssp585',
      label: (
        <>
          2090-2100 (SSP 5-8.5)
          <br />
          Outbreak risk
        </>
      ),
      icon: virus,
      tileLayer: {
        tile: tileBase + '?v=pouts_ssp585&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 43,
      },
      description: (
        <>
          <p>
            Decadal averages of outbreak risk in 2090-2100 under the pessimistic SSP 5-8.5 scenario.
            The risk is measured as the likeliness of starting an outbreak out of 100 independent
            importations in the first 60 days. The value shown represents a potential derived from
            the model. We assume vector presence in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'iouts_ssp585',
      colkey: 'iouts_ssp585',
      label: (
        <>
          2090-2100 (SSP 5-8.5)
          <br />
          Importation impact
        </>
      ),
      icon: impact,
      tileLayer: {
        tile: tileBase + '?v=iouts_ssp585&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 44,
      },
      description: (
        <>
          <p>
            Decadal averages (2090-2100 under the pessimistic SSP 5-8.5 scenario) of the expected
            impact of an infectious case imported in a population of 4000 susceptible individuals.
            The value shown represents a potential derived from the model. We assume vector presence
            in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'colegg_1980',
      colkey: 'colegg_1980',
      label: (
        <>
          1980-1990
          <br />
          Vector activity
        </>
      ),
      icon: adult,
      tileLayer: {
        tile: tileBase + '?v=colegg_1980&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 52,
      },
      description: (
        <>
          <p>
            Average decadal mosquito activity in 1980-1990 as predicted by the model (assumes tiger
            mosquito presence). The colour scale is proportional to the activity predicted in
            Emilia-Romagna.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_pouts_1980',
      colkey: 'chikv_pouts_1980',
      label: (
        <>
          1980-1990
          <br />
          Outbreak risk
        </>
      ),
      icon: virus,
      tileLayer: {
        tile: tileBase + '?v=chikv_pouts_1980&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 53,
      },
      description: (
        <>
          <p>
            Decadal averages of outbreak risk in 1980-1990 measured as the likeliness of starting an
            outbreak out of 100 independent importations in the first 60 days. The value shown
            represents a potential derived from the model. We assume vector presence in each grid
            cell.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_iouts_1980',
      colkey: 'chikv_iouts_1980',
      label: (
        <>
          1980-1990
          <br />
          Importation impact
        </>
      ),
      icon: impact,
      tileLayer: {
        tile: tileBase + '?v=chikv_iouts_1980&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 54,
      },
      description: (
        <>
          <p>
            Decadal averages (1980-1990) of the expected impact of an infectious case imported in a
            population of 4000 susceptible individuals. The value shown represents a potential
            derived from the model. We assume vector presence in each grid cell.
          </p>
        </>
      ),
    },
  ];
  const tileIconRowHeadings_old = [
    { row: 1, label: '2010-2020' },
    { row: 2, label: '2090-2100 (SSP 2-4.5)' },
    { row: 3, label: '2090-2100 (SSP 5-8.5)' },
    { row: 4, label: '1980-1990' },
  ];

  const parPickerRowHeadings = tileIconRowHeadings;

  const tileIcons_old = [
    {
      key: 'colegg',
      label: (
        <>
          2010-2020
          <br />
          Vector activity
        </>
      ),
      icon: adult,
      tileLayer: {
        tile: tileBase + '?v=colegg&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 11,
      },
      description: (
        <>
          <p>
            Average decadal mosquito activity in 2010-2020 as predicted by the model (assumes tiger
            mosquito presence). The colour scale is proportional to the activity predicted in
            Emilia-Romagna.
          </p>
        </>
      ),
    },
    {
      key: 'larva',
      label: (
        <>
          2010-2020
          <br />
          Larva abundance
        </>
      ),
      icon: larva,
      tileLayer: {
        tile: tileBase + '?v=larva&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 15,
      },
      description: (
        <>
          <p>
            The first calendar month when the predicted number of larva (in a typical breeding site)
            exceeds 1. No data is shown when the number of larva is always higher or lower than 1.
          </p>
        </>
      ),
    },
    {
      key: 'presence',
      label: <>Vector presence</>,
      icon: prpin,
      tileLayer: {
        tile: tileBase + '?v=presence&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 16,
      },
      description: (
        <>
          <p>
            All the grid cells that are somehow connected to an administrative polygon where the
            tiger mosquito has been reported.
          </p>
          <p>
            We obtained the polygons from{' '}
            <a
              href="https://data.apps.fao.org/catalog/dataset/global-administrative-unit-layers-gaul"
              target="_blank"
              rel="noreferrer"
            >
              GAUL
            </a>
            ,{' '}
            <a
              href="https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units/nuts"
              target="_blank"
              rel="noreferrer"
            >
              NUTS3
            </a>
            , and{' '}
            <a
              href="https://www.ecdc.europa.eu/en/disease-vectors/surveillance-and-disease-data/mosquito-maps"
              target="_blank"
              rel="noreferrer"
            >
              ECDC/EFSA Mosquito Maps
            </a>{' '}
            datasets.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_pouts',
      label: (
        <>
          2010-2020
          <br />
          Outbreak risk
        </>
      ),
      icon: virus,
      tileLayer: {
        tile: tileBase + '?v=chikv_pouts&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 12,
      },
      description: (
        <>
          <p>
            Decadal averages of outbreak risk in 2010-2020 measured as the likeliness of starting an
            outbreak out of 100 independent importations in the first 60 days. The value shown
            represents a potential derived from the model. We assume vector presence in each grid
            cell.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_iouts',
      label: (
        <>
          2010-2020
          <br />
          Importation impact
        </>
      ),
      icon: impact,
      tileLayer: {
        tile: tileBase + '?v=chikv_iouts&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 13,
      },
      description: (
        <>
          <p>
            Decadal averages (2010-2020) of the expected impact of an infectious case imported in a
            population of 4000 susceptible individuals. The value shown represents a potential
            derived from the model. We assume vector presence in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'colegg_ssp245',
      label: (
        <>
          2090-2100 (SSP 2-4.5)
          <br />
          Vector activity
        </>
      ),
      icon: adult,
      tileLayer: {
        tile: tileBase + '?v=colegg_ssp245&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 22,
      },
      description: (
        <>
          <p>
            Average decadal mosquito activity in 2090-2100 as predicted by the model under the
            optimistic (SSP 2-4.5) scenario (assumes tiger mosquito presence). The colour scale is
            proportional to the activity predicted in Emilia-Romagna.
          </p>
        </>
      ),
    },
    {
      key: 'pouts_ssp245',
      label: (
        <>
          2090-2100 (SSP 2-4.5)
          <br />
          Outbreak risk
        </>
      ),
      icon: virus,
      tileLayer: {
        tile: tileBase + '?v=pouts_ssp245&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 23,
      },
      description: (
        <>
          <p>
            Decadal averages of outbreak risk in 2090-2100 under the optimistic SSP 2-4.5 scenario.
            The risk is measured as the likeliness of starting an outbreak out of 100 independent
            importations in the first 60 days. The value shown represents a potential derived from
            the model. We assume vector presence in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'iouts_ssp245',
      label: (
        <>
          2090-2100 (SSP 2-4.5)
          <br />
          Importation impact
        </>
      ),
      icon: impact,
      tileLayer: {
        tile: tileBase + '?v=iouts_ssp245&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 24,
      },
      description: (
        <>
          <p>
            Decadal averages (2090-2100 under the optimistic SSP 2-4.5 scenario) of the expected
            impact of an infectious case imported in a population of 4000 susceptible individuals.
            The value shown represents a potential derived from the model. We assume vector presence
            in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'colegg_ssp585',
      label: (
        <>
          2090-2100 (SSP 5-8.5)
          <br />
          Vector activity
        </>
      ),
      icon: adult,
      tileLayer: {
        tile: tileBase + '?v=colegg_ssp585&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 32,
      },
      description: (
        <>
          <p>
            Average decadal mosquito activity in 2090-2100 as predicted by the model under the
            pessimistic (SSP 5-8.5) scenario (assumes tiger mosquito presence). The colour scale is
            proportional to the activity predicted in Emilia-Romagna.
          </p>
        </>
      ),
    },
    {
      key: 'pouts_ssp585',
      label: (
        <>
          2090-2100 (SSP 5-8.5)
          <br />
          Outbreak risk
        </>
      ),
      icon: virus,
      tileLayer: {
        tile: tileBase + '?v=pouts_ssp585&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 33,
      },
      description: (
        <>
          <p>
            Decadal averages of outbreak risk in 2090-2100 under the pessimistic SSP 5-8.5 scenario.
            The risk is measured as the likeliness of starting an outbreak out of 100 independent
            importations in the first 60 days. The value shown represents a potential derived from
            the model. We assume vector presence in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'iouts_ssp585',
      label: (
        <>
          2090-2100 (SSP 5-8.5)
          <br />
          Importation impact
        </>
      ),
      icon: impact,
      tileLayer: {
        tile: tileBase + '?v=iouts_ssp585&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 34,
      },
      description: (
        <>
          <p>
            Decadal averages (2090-2100 under the pessimistic SSP 5-8.5 scenario) of the expected
            impact of an infectious case imported in a population of 4000 susceptible individuals.
            The value shown represents a potential derived from the model. We assume vector presence
            in each grid cell.
          </p>
        </>
      ),
    },
    {
      key: 'colegg_1980',
      label: (
        <>
          1980-1990
          <br />
          Vector activity
        </>
      ),
      icon: adult,
      tileLayer: {
        tile: tileBase + '?v=colegg_1980&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 42,
      },
      description: (
        <>
          <p>
            Average decadal mosquito activity in 1980-1990 as predicted by the model (assumes tiger
            mosquito presence). The colour scale is proportional to the activity predicted in
            Emilia-Romagna.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_pouts_1980',
      label: (
        <>
          1980-1990
          <br />
          Outbreak risk
        </>
      ),
      icon: virus,
      tileLayer: {
        tile: tileBase + '?v=chikv_pouts_1980&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 43,
      },
      description: (
        <>
          <p>
            Decadal averages of outbreak risk in 1980-1990 measured as the likeliness of starting an
            outbreak out of 100 independent importations in the first 60 days. The value shown
            represents a potential derived from the model. We assume vector presence in each grid
            cell.
          </p>
        </>
      ),
    },
    {
      key: 'chikv_iouts_1980',
      label: (
        <>
          1980-1990
          <br />
          Importation impact
        </>
      ),
      icon: impact,
      tileLayer: {
        tile: tileBase + '?v=chikv_iouts_1980&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 44,
      },
      description: (
        <>
          <p>
            Decadal averages (1980-1990) of the expected impact of an infectious case imported in a
            population of 4000 susceptible individuals. The value shown represents a potential
            derived from the model. We assume vector presence in each grid cell.
          </p>
        </>
      ),
    },
  ];
  const parPickerTileIcons = tileIcons;
  const tileIconRowHeadingsSand = [{ row: 1, label: '2015' }];
  const tileIconsSand = [
    {
      key: 'papatasi_aprdec',
      colkey: 'papatasi_aprdec',

      label: 'April - December',
      icon: adultsandfly1,
      tileLayer: {
        tile: tileBase + '?v=papatasi_aprdec&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 11,
      },
      description: (
        <>
          <p>
            Average number of <i>Phlebotomus papatasi</i> females from April to December.
          </p>
        </>
      ),
    },
    {
      key: 'papatasi_aprjun',
      label: 'April - June',
      colkey: 'papatasi_aprjun',

      icon: adultsandfly2,
      tileLayer: {
        tile: tileBase + '?v=papatasi_aprjun&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 12,
      },
      description: (
        <>
          <p>
            Average number of <i>Phlebotomus papatasi</i> females from April to June.
          </p>
        </>
      ),
    },
    {
      key: 'papatasi_julsep',
      colkey: 'papatasi_julsep',

      label: 'July - September',
      icon: adultsandfly3,
      tileLayer: {
        tile: tileBase + '?v=papatasi_julsep&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 13,
      },
      description: (
        <>
          <p>
            Average number of <i>Phlebotomus papatasi</i> females from July to September.
          </p>
        </>
      ),
    },
    {
      key: 'papatasi_octdec',
      label: 'October - December',
      icon: adultsandfly4,
      colkey: 'papatasi_octdec',

      tileLayer: {
        tile: tileBase + '?v=papatasi_octdec&z={z}&x={x}&y={y}',
        props: { attribution: '', noWrap: true },
        displayIndex: 14,
      },
      description: (
        <>
          <p>
            Average number of <i>Phlebotomus papatasi</i> females from October to December.
          </p>
        </>
      ),
    },
  ];
  const menuStructure = [
    {
      key: 'menu_icon',
      parent: null,
    },

    { key: 'location_info', parent: 'menu_icon' },
    { key: 'location_info_panel', parent: 'location_info' },
    {
      key: 'seasonal_profile',
      parent: 'menu_icon',
    },
    {
      key: 'seasonal_profile_panel',
      parent: 'seasonal_profile',
    },

    {
      key: 'graphics_menu_icon',
      parent: 'menu_icon',
    },
    {
      key: 'secondary_menu_icon',
      parent: 'graphics_menu_icon',
    },

    { key: 'larva_forecast', parent: 'secondary_menu_icon' },
    {
      key: 'larva_forecast_panel',
      parent: 'larva_forecast',
    },

    {
      key: 'activity_forecast',
      parent: 'secondary_menu_icon',
    },

    // { key: "simulation_activity_graph_panel", parent: "activity_forecast" },
    { key: 'activity_forecast_panel', parent: 'activity_forecast' },
    { key: 'activity_projections_panel', parent: 'activity_forecast' },

    {
      key: 'outbreak_forecast',
      parent: 'secondary_menu_icon',
    },
    // { key: "simulation_outbreak_graph_panel", parent: "outbreak_forecast" },
    { key: 'outbreak_forecast_panel', parent: 'outbreak_forecast' },
    { key: 'outbreak_projections_panel', parent: 'outbreak_forecast' },

    {
      key: 'impact_forecast',
      parent: 'secondary_menu_icon',
    },
    // { key: "simulation_impact_graph_panel", parent: "impact_forecast" },
    { key: 'impact_forecast_panel', parent: 'impact_forecast' },
    {
      key: 'impact_projections_panel',
      parent: 'impact_forecast',
    },

    {
      key: 'tile_selector',
      parent: 'menu_icon',
    },
    { key: 'tile_selector_panel', parent: 'tile_selector' },

    {
      key: 'vector_selector',
      parent: 'menu_icon',
    },
    { key: 'vector_selector_panel', parent: 'vector_selector' },

    // {
    // 	key: "simulation_adjustment",
    // 	parent: "menu_icon",
    // },
    // { key: "simulation_adjustment_panel", parent: "simulation_adjustment" },

    // { key: "settings_adjustment", parent: "menu_icon" },
    // { key: "settings_adjustment_panel", parent: "settings_adjustment" },
  ];
  const menuStructureSand = [
    {
      key: 'menu_icon',
      parent: null,
    },
    { key: 'location_info', parent: 'menu_icon' },
    { key: 'location_info_panel', parent: 'location_info' },
    { key: 'sandfly_population', parent: 'menu_icon' },
    { key: 'sandfly_population_panel', parent: 'sandfly_population' },
    { key: 'sandfly_tile_selector', parent: 'menu_icon' },
    { key: 'sandfly_tile_selector_panel', parent: 'sandfly_tile_selector' },
    { key: 'sandfly_vector_selector', parent: 'menu_icon' },
    {
      key: 'sandfly_vector_selector_panel',
      parent: 'sandfly_vector_selector',
    },
  ];

  const [tree, setTree] = useState([]);
  useEffect(() => {
    function buildNestedMenu(data, parentKey = null) {
      return data
        .filter((item) => item.parent === parentKey)
        .map((item) => ({
          ...item,
          children: buildNestedMenu(data, item.key),
        }));
    }

    let nested =
      mapVector === 'albopictus'
        ? buildNestedMenu(menuStructure)
        : buildNestedMenu(menuStructureSand);
    setTree(nested);
  }, [mapVector]);
  const panelData_old = [
    {
      key: 'menu_icon',
      parent: [],
      icon: menuIcon,
      hasPanels: false,
      panelList: [],
      hasSubMenus: true,
      subMenuOpenDirection: 'down',
      subMenuIndex: 0,
    },
    {
      key: 'secondary_menu_icon',
      icon: menuIcon,
      rotate: 90,
      hasSubMenus: true,
      subMenuOpenDirection: 'down',
      initialOpen: true,
      selfClose: true,
    },
    {
      id: [2, 1],
      parent: [1, 1],
      icon: info,
      key: 'location_info',
      hasPanels: true,
    },
    {
      id: [2, 2],
      parent: [1, 1],

      icon: seasonal,
      key: 'seasonal_profile',
      hasPanels: true,
    },
    {
      key: 'graphics_menu_icon',
      id: [2, 3],
      parent: [1, 1],
      hasSubMenus: true,
      subMenuOpenDirection: 'right',
      submenuIndex: 1,
      icon: settingsIcon,
    },
    {
      id: [2, 4],
      parent: [1, 1],
      key: 'larva_forecast',
      icon: larva,
      hasPanels: true,
    },

    {
      id: [2, 4],
      // parent: [2, 3],
      icon: adult,
      key: 'activity_forecast',
      hasPanels: true,
    },
    {
      key: 'location_info_panel',
      id: [3, 1],
      parent: [2, 1],
      decade: '',
      icon: info,
      chartParameters: {},
      positionDependent: true,

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
      key: 'seasonal_profile_panel',
      id: [3, 1],
      parent: [2, 2],
      icon: seasonal,
      chartParameters: {
        chartType: 'rechart',
        years: '2010-2019',
        horizontalAxis: 'date',
        mixedKeys: [
          {
            key: 'g1',
            levels: ['meteo-ts', '2010-2019', 'atemp'],
          },
          {
            key: 'g2',
            levels: ['meteo-ts', '2010-2019', 'rehum'],
          },
          {
            key: 'g3',
            levels: ['meteo-ts', '2010-2019', 'precp'],
          },
        ],

        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'Temperature (°C)',
            },
            sliceColors: {
              slice0: '#F15A48',
            },
          },
          g2: {
            sliceLabels: { slice0: 'Rel. humidity (%)' },
            sliceColors: { slice0: '#50C0AD' },
          },
          g3: {
            sliceLabels: { slice0: 'Precipitation (mm)' },
            sliceColors: { slice0: '#1B3958' },
          },
        },
      },

      content: (
        <div className="text-area">
          <h1>Seasonal Profile</h1>
          <div>
            <p>
              Decadal averages (2010-2020) of some of the environmental variables obtained from the{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels"
              >
                ERA5
              </a>{' '}
              dataset.
            </p>
          </div>
        </div>
      ),
    },

    {
      id: [4, 1],
      parent: [3, 1],
      key: 'larva_forecast_panel',
      icon: larva,
      chartParameters: {
        chartType: 'rechart',
        years: 'ecmwf',

        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'coln2'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '2010-2019', 'coln2'],
          },
        ],
        horizontalAxis: 'date',
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
          g2: {
            sliceLabels: { slice0: 'Decadal average' },
            sliceColors: { slice0: '#1B3958' },
          },
        },
      },
      content: (
        <div className="text-area">
          <h1>Larva Forecast</h1>
          <div>
            <p>
              Predicted number of larvae in a typical breeding site compared with the decadal
              averages.
            </p>
          </div>
        </div>
      ),
    },

    {
      key: 'activity_forecast_panel',
      id: [0, 2, 1, 1],
      icon: adult,
      chartParameters: {
        // twins: [
        // 	{ id: 12, display: false, simulation: true },
        // 	{ id: 4, display: false },
        // ],

        chartType: 'rechart',
        initialSetting: 'fcast-ts',
        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'colegg'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '2010-2019', 'colegg'],
          },
        ],
        horizontalAxis: 'date',
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
          g2: {
            sliceLabels: { slice0: 'Decadal activity' },
            sliceColors: { slice0: '#1B3958' },
          },
        },
      },
      content: (
        <div className="text-area">
          <h1>Activity Forecast</h1>
          <div>
            <p>
              Daily number of eggs laid by the Asian tiger mosquito as a proxy to biting activity.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: [0, 2, 1, 0],
      key: 'simulation_activity_graph_panel',
      simulation: true,
      chartParameters: {
        chartType: 'rechart',
        years: 'ecmwf',

        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'colegg'],
          },
          {
            key: 'g2',
            levels: ['ts', 'fcast-ts', 'ecmwf', 'colegg'],
          },
        ],

        horizontalAxis: 'date',
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year (sim)',
              slice1: 'Overlap (sim) ',
              slice2: 'Forecast (sim)',
            },
            sliceColors: {
              slice0: '#1c2833',
              slice1: '#af7ac5',
              slice2: '#d98880',
            },
          },
          g2: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
        },
      },
      content: (
        <div className="text-area">
          <h1>Activity Simulation Data </h1>
          <div>
            <p>Here we will display simulation graphics</p>{' '}
          </div>
        </div>
      ),
    },
    {
      id: [0, 2, 1, 2],
      decade: '2090-2100',
      key: 'activity_projections_panel',
      icon: adult,

      chartParameters: {
        chartType: 'rechart',
        years: '2090-2100',

        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'nasa', 'ssp245', 'colegg'],
          },
          {
            key: 'g2',
            levels: ['fcast-ts', 'nasa', 'ssp585', 'colegg'],
          },
          {
            key: 'g3',
            levels: ['sim-ts', '2010-2019', 'colegg'],
          },
          {
            key: 'g4',
            levels: ['sim-ts', '1980-1989', 'colegg'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceColors: { slice0: 'orange' },
            sliceLabels: { slice0: 'SSP2-4.5' },
          },
          g2: {
            sliceColors: { slice0: '#F15A48' },
            sliceLabels: { slice0: 'SSP5-8.5' },
          },
          g3: {
            sliceColors: { slice0: '#1B3958' },
            sliceLabels: { slice0: '2010-2020' },
          },
          g4: {
            sliceColors: { slice0: '#50C0AD' },
            sliceLabels: { slice0: '1980-1990' },
          },
        },
        horizontalAxis: 'date',
      },

      content: (
        <div className="text-area">
          <h1>Activity Projections</h1>
          <div>
            <p>
              Daily number of eggs in 2010-2020, compared to the historical (1980-1990) and
              projected future (2090-2100) decadal averages. SSP 2-4.5 and SSP 5-8.5 represent the
              optimistic and pessimistic scenarios, respectively.
            </p>
          </div>
        </div>
      ),
    },

    {
      id: [0, 2, 2],
      key: 'outbreak_forecast',
      icon: virus,
      hasPanels: true,
    },

    {
      key: 'outbreak_forecast_panel',
      icon: virus,

      id: [0, 2, 2, 0],
      chartParameters: {
        twins: [{ id: 6, display: false }],

        chartType: 'rechart',
        years: 'ecmwf',
        //brushStart and brushEnd are used to set the
        //initial range of the brush [months from the current date]
        // brushStart: -6,
        // brushEnd: 3,

        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'pouts'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '2010-2019', 'pouts'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
          g2: {
            sliceLabels: { slice0: 'Decadal average' },
            sliceColors: { slice0: '#1B3958' },
          },
        },
        horizontalAxis: 'date',
      },
      content: (
        <div className="text-area">
          <h1>Outbreak Forecast</h1>
          <div>
            <p>
              The likeliness of an outbreak in response to an imported infectious case according to
              the{' '}
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
              We introduce an infectious case in a population of 4000. Outbreak{' '}
              <strong>risk</strong> is the number of times (out of 100) when an autochthonous case
              is observed.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: [0, 2, 2, 0],
      key: 'simulation_outbreak_graph_panel',
      simulation: true,
      chartParameters: {
        chartType: 'rechart',
        years: 'ecmwf',

        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'pouts'],
          },
          {
            key: 'g2',
            levels: ['ts', 'fcast-ts', 'ecmwf', 'pouts'],
          },
        ],

        horizontalAxis: 'date',
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year (sim)',
              slice1: 'Overlap (sim) ',
              slice2: 'Forecast (sim)',
            },
            sliceColors: {
              slice0: '#1c2833',
              slice1: '#af7ac5',
              slice2: '#d98880',
            },
          },
          g2: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
        },
      },
      content: (
        <div className="text-area">
          <h1>Outbreak Simulation Data </h1>
          <div>
            <p>Here we will display simulation graphics</p>{' '}
          </div>
        </div>
      ),
    },
    {
      id: [0, 2, 2, 1],
      decade: '2090-2100',
      key: 'outbreak_projections_panel',
      icon: virus,
      chartParameters: {
        chartType: 'rechart',
        years: '2090-2100',
        // brushStart: -6,
        // brushEnd: 3,
        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'nasa', 'ssp245', 'pouts'],
          },
          {
            key: 'g2',
            levels: ['fcast-ts', 'nasa', 'ssp585', 'pouts'],
          },
          {
            key: 'g3',
            levels: ['sim-ts', '2010-2019', 'pouts'],
          },
          {
            key: 'g4',
            levels: ['sim-ts', '1980-1989', 'pouts'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceLabels: { slice0: 'SSP2-4.5' },
            sliceColors: { slice0: 'orange' },
          },
          g2: {
            sliceLabels: { slice0: 'SSP5-8.5' },
            sliceColors: { slice0: '#F15A48' },
          },
          g3: {
            sliceLabels: { slice0: '2010-2020' },
            sliceColors: { slice0: '#1B3958' },
          },
          g4: {
            sliceLabels: { slice0: '1980-1990' },
            sliceColors: { slice0: '#50C0AD' },
          },
        },
        horizontalAxis: 'date',
      },
      content: (
        <div className="text-area">
          <h1>Outbreak Projections</h1>
          <div>
            <p>
              Average outbreak risk in 2010-2020, compared to the historical (1980-1990) and
              projected future (2090-2100) decadal averages. SSP 2-4.5 and SSP 5-8.5 represent the
              optimistic and pessimistic scenarios, respectively.
            </p>
          </div>
        </div>
      ),
    },

    {
      id: [0, 2, 3],
      key: 'impact_forecast',
      icon: impact,
      hasPanels: true,
    },
    // simulation_graph_panel_impact
    {
      id: [0, 2, 1, 0],
      key: 'simulation_impact_graph_panel',
      simulation: true,
      chartParameters: {
        chartType: 'rechart',
        years: 'ecmwf',

        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'iouts'],
          },
          {
            key: 'g2',
            levels: ['ts', 'fcast-ts', 'ecmwf', 'iouts'],
          },
        ],

        horizontalAxis: 'date',
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year (sim)',
              slice1: 'Overlap (sim) ',
              slice2: 'Forecast (sim)',
            },
            sliceColors: {
              slice0: '#1c2833',
              slice1: '#af7ac5',
              slice2: '#d98880',
            },
          },
          g2: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
        },
      },
      content: (
        <div className="text-area">
          <h1>Impact Simulation Data </h1>
          <div>
            <p>Here we will display simulation graphics</p>{' '}
          </div>
        </div>
      ),
    },
    {
      key: 'impact_forecast_panel',
      id: [0, 2, 3, 0],
      chartParameters: {
        twins: [{ id: 8, display: false }],

        chartType: 'rechart',
        years: 'ecmwf',
        // brushStart: -6,
        // brushEnd: 3,
        xinit: { date0: 15, date1: 125 },
        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'iouts'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '2010-2019', 'iouts'],
          },
        ],
        horizontalAxis: 'date',
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
          g2: {
            sliceLabels: { slice0: 'Decadal average' },
            sliceColors: { slice0: '#1B3958' },
          },
        },
      },
      content: (
        <div className="text-area">
          <h1>Impact Forecast</h1>
          <div>
            <p>
              The expected impact of an imported infectious case according to the{' '}
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
              We introduce an infectious case in a population of 4000. The <strong>impact</strong>{' '}
              is the average number of autochthonous cases in 60 days.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: [0, 2, 3, 1],
      decade: '2090-2100',
      key: 'impact_projections_panel',
      icon: impact,
      chartParameters: {
        chartType: 'rechart',
        years: '2090-2100',
        // brushStart: -6,
        // brushEnd: 3,
        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'nasa', 'ssp245', 'iouts'],
          },
          {
            key: 'g2',
            levels: ['fcast-ts', 'nasa', 'ssp585', 'iouts'],
          },
          {
            key: 'g3',
            levels: ['sim-ts', '2010-2019', 'iouts'],
          },
          {
            key: 'g4',
            levels: ['sim-ts', '1980-1989', 'iouts'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceLabels: { slice0: 'SSP2-4.5' },
            sliceColors: { slice0: 'orange' },
          },
          g2: {
            sliceLabels: { slice0: 'SSP5-8.5' },
            sliceColors: { slice0: '#F15A48' },
          },
          g3: {
            sliceLabels: { slice0: '2010-2020' },
            sliceColors: { slice0: '#1B3958' },
          },
          g4: {
            sliceLabels: { slice0: '1980-1990' },
            sliceColors: { slice0: '#50C0AD' },
          },
        },
        horizontalAxis: 'date',
      },
      content: (
        <div className="text-area">
          <h1>Impact Projections</h1>
          <div>
            <p>
              Average importation impact in 2010-2020, compared to the historical (1980-1990) and
              projected future (2090-2100) decadal averages. SSP 2-4.5 and SSP 5-8.5 represent the
              optimistic and pessimistic scenarios, respectively.
            </p>
          </div>
        </div>
      ),
    },

    {
      id: [2, 4],
      key: 'tile_selector',
      icon: suser,
      hasPanels: true,
    },

    {
      key: 'tile_selector_panel',
      id: [0, 3, 0],
      chartParameters: {},
      icon: suser,
      content: <TileSelector tileIcons={tileIcons}></TileSelector>,
    },

    {
      id: [0, 4],
      key: 'vector_selector',
      icon: model,
      hasPanels: true,
    },

    {
      key: 'vector_selector_panel',
      id: [0, 4, 0],
      chartParameters: {},
      icon: model,

      content: <ChangeMapPanel></ChangeMapPanel>,
    },

    {
      id: [0, 5],
      key: 'simulation_adjustment',
      icon: seasonal,
      hasPanels: true,
    },

    {
      key: 'simulation_adjustment_panel',
      id: [0, 5, 0],
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
      id: [0, 6],
      key: 'settings_adjustment',
      icon: settingsIcon,
      hasPanels: true,
    },

    {
      key: 'settings_adjustment_panel',
      id: [0, 6, 0],
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
  const panelData = [
    {
      key: 'menu_icon',
      icon: menuIcon,
      hasPanels: false,
      panelList: [],
      hasSubMenus: true,
      subMenuOpenDirection: 'down',
      subMenuIndex: 0,
    },
    {
      key: 'secondary_menu_icon',
      icon: menuIcon,
      rotate: 90,
      hasSubMenus: true,
      subMenuOpenDirection: 'down',
      initialOpen: true,
      selfClose: true,
    },
    {
      icon: info,
      key: 'location_info',
      hasPanels: true,
    },
    {
      icon: seasonal,
      key: 'seasonal_profile',
      hasPanels: true,
    },
    {
      key: 'graphics_menu_icon',
      hasSubMenus: true,
      subMenuOpenDirection: 'right',
      submenuIndex: 1,
      icon: settingsIcon,
    },
    {
      key: 'larva_forecast',
      icon: larva,
      hasPanels: true,
    },

    {
      icon: adult,
      key: 'activity_forecast',
      hasPanels: true,
    },
    {
      key: 'location_info_panel',
      decade: '',
      icon: info,
      chartParameters: {},
      positionDependent: true,
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
      key: 'seasonal_profile_panel',
      icon: seasonal,
      chartParameters: {
        chartType: 'rechart',
        initialSetting: 'meteo-ts',
        years: '2010-2019',
        mixedKeys: [
          {
            key: 'g1',
            levels: ['meteo-ts', '2010-2019', 'atemp'],
          },
          {
            key: 'g2',
            levels: ['meteo-ts', '2010-2019', 'rehum'],
          },
          {
            key: 'g3',
            levels: ['meteo-ts', '2010-2019', 'precp'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'Temperature (°C)',
            },
            sliceColors: {
              slice0: '#F15A48',
            },
          },
          g2: {
            sliceLabels: { slice0: 'Rel. humidity (%)' },
            sliceColors: { slice0: '#50C0AD' },
          },
          g3: {
            sliceLabels: { slice0: 'Precipitation (mm)' },
            sliceColors: { slice0: '#1B3958' },
          },
        },
        plottedKeys: ['atemp', 'rehum', 'precp'],
        colors: ['#F15A48', '#50C0AD', '#1B3958'],
        horizontalAxis: 'date',
        labels: ['Temperature (°C)', 'Rel. humidity (%)', 'Precipitation (mm)'],
      },

      content: (
        <div className="text-area">
          <h1>Seasonal Profile</h1>
          <div>
            <p>
              Decadal averages (2010-2020) of some of the environmental variables obtained from the{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels"
              >
                ERA5
              </a>{' '}
              dataset.
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'larva_forecast_panel',
      chartParameters: {
        chartType: 'rechart',
        initialSetting: 'fcast-ts',
        years: 'ecmwf',
        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'coln2'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '2010-2019', 'coln2'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
          g2: {
            sliceLabels: { slice0: 'Decadal average' },
            sliceColors: { slice0: '#1B3958' },
          },
        },
        plottedKeys: ['g1', 'g2'],
        colors: ['#1B3958', '#1B3958'],
        horizontalAxis: 'date',
        lineSlice: ['g1'],
        labels: ['Larva forecast', 'Decadal average'],
        sliceLabels: ['This year', 'Overlap', 'Forecast'],
        sliceColors: ['#50C0AD', 'orange', '#F15A48'],
      },
      icon: larva,
      content: (
        <div className="text-area">
          <h1>Larva Forecast</h1>
          <div>
            <p>
              Predicted number of larvae in a typical breeding site compared with the decadal
              averages.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: [0, 2, 1, 1],
      key: 'activity_forecast_panel',

      chartParameters: {
        twins: [{ id: 4, display: false }],

        chartType: 'rechart',
        initialSetting: 'fcast-ts',
        years: 'ecmwf',
        xbrushStart: -6,
        xbrushEnd: 3,
        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'colegg'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '2010-2019', 'colegg'],
          },
          {
            key: 'g3',
            levels: ['surv-ts', 'vabun'], // "v015"],
          },
          {
            key: 'g4',
            levels: ['surv-ts', 'aimsurv'],
          },
          {
            key: 'g5',
            levels: ['surv-ts', 'vbase'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
          g2: {
            sliceLabels: { slice0: 'Decadal activity' },
            sliceColors: { slice0: '#1B3958' },
          },
          g3: {
            sliceLabels: { slice0: 'VectAbundance' },
            sliceColors: { slice0: '#167997' },
          },
          g4: {
            sliceLabels: { slice0: 'AIMsurv' },
            sliceColors: { slice0: '#167997' },
          },
          g5: {
            sliceLabels: { slice0: 'VectorBase' },
            sliceColors: { slice0: '#167997' },
          },
        },

        plottedKeys: ['g1', 'g2', 'g3'],
        orientation: { g3: 'right', g4: 'right', g5: 'right' },
        lineStyle: { g3: 'dots', g4: 'dots', g5: 'dots' },
        colors: ['#1B3958', '#1B3958', '#167997', '#167997', '#167997'],
        horizontalAxis: 'date',
        lineSlice: ['g1'],
        labels: ['Activity forecast', 'Decadal activity', 'VectAbundance', 'AIMsurv', 'VectorBase'],
        sliceLabels: ['This year', 'Overlap', 'Forecast'],
        sliceColors: ['#50C0AD', 'orange', '#F15A48'],
      },
      icon: adult,
      content: (
        <div className="text-area">
          <h1>Activity Forecast</h1>
          <div>
            <p>
              Daily number of eggs laid by the Asian tiger mosquito as a proxy to biting activity.
            </p>
          </div>
        </div>
      ),
    },
    {
      decade: '2090-2100',
      key: 'activity_projections_panel',
      chartParameters: {
        chartType: 'rechart',
        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'nasa', 'ssp245', 'colegg'],
          },
          {
            key: 'g2',
            levels: ['fcast-ts', 'nasa', 'ssp585', 'colegg'],
          },
          {
            key: 'g3',
            levels: ['sim-ts', '2010-2019', 'colegg'],
          },
          {
            key: 'g4',
            levels: ['sim-ts', '1980-1989', 'colegg'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceColors: { slice0: 'orange' },
            sliceLabels: { slice0: 'SSP2-4.5' },
          },
          g2: {
            sliceColors: { slice0: '#F15A48' },
            sliceLabels: { slice0: 'SSP5-8.5' },
          },
          g3: {
            sliceColors: { slice0: '#1B3958' },
            sliceLabels: { slice0: '2010-2020' },
          },
          g4: {
            sliceColors: { slice0: '#50C0AD' },
            sliceLabels: { slice0: '1980-1990' },
          },
        },
        plottedKeys: ['g1', 'g2', 'g3', 'g4'],
        colors: ['#1B3958', '#50C0AD', 'orange', '#F15A48'],
        sliceColors: ['#50C0AD', 'orange', '#F15A48'],
        horizontalAxis: 'date',
        lineSlice: [],
        labels: ['2010-2020', '1980-1990', 'SSP2-4.5', 'SSP5-8.5'],
      },
      icon: adult,
      content: (
        <div className="text-area">
          <h1>Activity Projections</h1>
          <div>
            <p>
              Daily number of eggs in 2010-2020, compared to the historical (1980-1990) and
              projected future (2090-2100) decadal averages. SSP 2-4.5 and SSP 5-8.5 represent the
              optimistic and pessimistic scenarios, respectively.
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'outbreak_forecast',
      icon: virus,
      hasPanels: true,
    },
    {
      key: 'outbreak_forecast_panel',
      icon: virus,
      decade: '2010-2020',
      chartParameters: {
        chartType: 'rechart',
        initialSetting: 'fcast-ts',
        years: 'ecmwf',
        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'pouts'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '2010-2019', 'pouts'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
          g2: {
            sliceLabels: { slice0: 'Decadal average' },
            sliceColors: { slice0: '#1B3958' },
          },
        },
        horizontalAxis: 'date',
        labels: ['Risk forecast', 'Decadal average'],
      },
      content: (
        <div className="text-area">
          <h1>Outbreak Forecast</h1>
          <div>
            <p>
              The likeliness of an outbreak in response to an imported infectious case according to
              the{' '}
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
              We introduce an infectious case in a population of 4000. Outbreak{' '}
              <strong>risk</strong> is the number of times (out of 100) when an autochthonous case
              is observed.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: [0, 2, 2, 1],
      decade: '2090-2100',
      key: 'outbreak_projections_panel',
      chartParameters: {
        chartType: 'rechart',
        initialSetting: 'fcast-ts',
        years: '2090-2100',
        mixedKeys: [
          {
            key: 'g1',
            levels: ['sim-ts', '2010-2019', 'pouts'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '1980-1989', 'pouts'],
          },
          {
            key: 'g3',
            levels: ['fcast-ts', 'nasa', 'ssp245', 'pouts'],
          },
          {
            key: 'g4',
            levels: ['fcast-ts', 'nasa', 'ssp585', 'pouts'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceLabels: { slice0: '2010-2020' },
            sliceColors: { slice0: '#1B3958' },
          },
          g2: {
            sliceLabels: { slice0: '1980-1990' },
            sliceColors: { slice0: '#50C0AD' },
          },
          g3: {
            sliceLabels: { slice0: 'SSP2-4.5' },
            sliceColors: { slice0: 'orange' },
          },
          g4: {
            sliceLabels: { slice0: 'SSP5-8.5' },
            sliceColors: { slice0: '#F15A48' },
          },
        },
        horizontalAxis: 'date',
        labels: ['2010-2020', '1980-1990', 'SSP2-4.5', 'SSP5-8.5'],
      },
      content: (
        <div className="text-area">
          <h1>Outbreak Projections</h1>
          <div>
            <p>
              Average outbreak risk in 2010-2020, compared to the historical (1980-1990) and
              projected future (2090-2100) decadal averages. SSP 2-4.5 and SSP 5-8.5 represent the
              optimistic and pessimistic scenarios, respectively.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: [0, 2, 3],
      key: 'impact_forecast',
      icon: impact,
      hasPanels: true,
    },
    {
      id: [0, 2, 3, 0],
      key: 'impact_forecast_panel',
      icon: impact,

      chartParameters: {
        twins: [{ id: 6.5, display: false }],

        chartType: 'rechart',
        initialSetting: 'fcast-ts',
        years: 'ecmwf',
        // xbrushStart: -6,
        // xbrushEnd: 3,
        xinit: { date0: 15, date1: 125 },
        mixedKeys: [
          {
            key: 'g1',
            levels: ['fcast-ts', 'ecmwf', 'iouts'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '2010-2019', 'iouts'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
            },
          },
          g2: {
            sliceLabels: { slice0: 'Decadal average' },
            sliceColors: { slice0: '#1B3958' },
          },
        },
        horizontalAxis: 'date',
        labels: ['Impact forecast', 'Decadal average'],
        sliceLabels: ['This year', 'Overlap', 'Forecast'],
        sliceColors: ['#50C0AD', 'orange', '#F15A48'],
      },
      content: (
        <div className="text-area">
          <h1>Impact Forecast</h1>
          <div>
            <p>
              The expected impact of an imported infectious case according to the{' '}
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
              We introduce an infectious case in a population of 4000. The <strong>impact</strong>{' '}
              is the average number of autochthonous cases in 60 days.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: [0, 2, 3, 1],
      decade: '2090-2100',
      key: 'impact_projections_panel',
      chartParameters: {
        chartType: 'rechart',
        initialSetting: 'fcast-ts',
        years: '2090-2100',
        mixedKeys: [
          {
            key: 'g1',
            levels: ['sim-ts', '2010-2019', 'iouts'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '1980-1989', 'iouts'],
          },
          {
            key: 'g3',
            levels: ['fcast-ts', 'nasa', 'ssp245', 'iouts'],
          },
          {
            key: 'g4',
            levels: ['fcast-ts', 'nasa', 'ssp585', 'iouts'],
          },
        ],

        sliceInfo: {
          g1: {
            sliceLabels: { slice0: '2010-2020' },
            sliceColors: { slice0: '#1B3958' },
          },
          g2: {
            sliceLabels: { slice0: '1980-1990' },
            sliceColors: { slice0: '#50C0AD' },
          },
          g3: {
            sliceLabels: { slice0: 'SSP2-4.5' },
            sliceColors: { slice0: 'orange' },
          },
          g4: {
            sliceLabels: { slice0: 'SSP5-8.5' },
            sliceColors: { slice0: '#F15A48' },
          },
        },
        labels: ['2010-2020', '1980-1990', 'SSP2-4.5', 'SSP5-8.5'],
        colors: ['#1B3958', '#50C0AD', 'orange', '#F15A48'],

        horizontalAxis: 'date',
      },
      icon: impact,
      content: (
        <div className="text-area">
          <h1>Impact Projections</h1>
          <div>
            <p>
              Average importation impact in 2010-2020, compared to the historical (1980-1990) and
              projected future (2090-2100) decadal averages. SSP 2-4.5 and SSP 5-8.5 represent the
              optimistic and pessimistic scenarios, respectively.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: [2, 4],
      key: 'tile_selector',
      icon: suser,
      hasPanels: true,
    },
    {
      id: [0, 3, 0],
      key: 'tile_selector_panel',
      chartParameters: {},
      forgetOpen: true,
      icon: suser,
      content: <TileSelector tileIcons={tileIcons}></TileSelector>,
    },
    {
      id: [0, 4],
      key: 'vector_selector',
      icon: model,
      hasPanels: true,
    },
    {
      id: [0, 4, 0],
      key: 'vector_selector_panel',
      chartParameters: {},
      forgetOpen: true,

      icon: model,
      content: (
        <>
          <ChangeMapPanel></ChangeMapPanel>
          <OptionsPanel></OptionsPanel>
        </>
      ),
    },
    {
      id: [0, 6],
      key: 'settings_adjustment',
      icon: settingsIcon,
      hasPanels: true,
    },

    {
      key: 'settings_adjustment_panel',
      id: [0, 6, 0],
      chartParameters: {},
      forgetOpen: true,

      content: (
        <div className="text-area">
          <h1>Settings Panel </h1>

          <SettingsPanel />
          {/* <CoordinatePicker /> */}
        </div>
      ),
    },
  ];

  const panelData1 = [
    {
      id: [0],
      icon: menuIcon,
      hasPanels: false,
      panelList: [],
      hasSubMenus: true,
      subMenuOpenDirection: 'down',
      subMenuIndex: 0,
      children: [
        {
          id: [0, 0],
          icon: info,
          key: 'location_info',
          hasPanels: true,
          children: [
            {
              id: [0, 0, 0],
              decade: '',
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
          ],
        },
        {
          id: [0, 1],
          icon: seasonal,
          key: 'seasonal_profile',
          hasPanels: true,
          children: [
            {
              id: [0, 1, 0],
              chartParameters: {
                chartType: 'rechart',
                years: '2010-2019',
                horizontalAxis: 'date',
                mixedKeys: [
                  {
                    key: 'g1',
                    levels: ['meteo-ts', '2010-2019', 'atemp'],
                  },
                  {
                    key: 'g2',
                    levels: ['meteo-ts', '2010-2019', 'rehum'],
                  },
                  {
                    key: 'g3',
                    levels: ['meteo-ts', '2010-2019', 'precp'],
                  },
                ],

                sliceInfo: {
                  g1: {
                    sliceLabels: {
                      slice0: 'Temperature (°C)',
                    },
                    sliceColors: {
                      slice0: '#F15A48',
                    },
                  },
                  g2: {
                    sliceLabels: {
                      slice0: 'Rel. humidity (%)',
                    },
                    sliceColors: { slice0: '#50C0AD' },
                  },
                  g3: {
                    sliceLabels: {
                      slice0: 'Precipitation (mm)',
                    },
                    sliceColors: { slice0: '#1B3958' },
                  },
                },
              },

              content: (
                <div className="text-area">
                  <h1>Seasonal Profile</h1>
                  <div>
                    <p>
                      Decadal averages (2010-2020) of some of the environmental variables obtained
                      from the{' '}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels"
                      >
                        ERA5
                      </a>{' '}
                      dataset.
                    </p>
                  </div>
                </div>
              ),
            },
          ],
        },

        {
          id: [0, 2],
          hasSubMenus: true,
          subMenuOpenDirection: 'right',
          submenuIndex: 1,
          icon: settingsIcon,

          children: [
            {
              id: [0, 2, 0],
              key: 'larva_forecast',
              icon: larva,
              hasPanels: true,
              children: [
                {
                  chartParameters: {
                    chartType: 'rechart',
                    years: 'ecmwf',
                    // brushStart: -6,
                    // brushEnd: 3,
                    mixedKeys: [
                      {
                        key: 'g1',
                        levels: ['fcast-ts', 'ecmwf', 'coln2'],
                      },
                      {
                        key: 'g2',
                        levels: ['sim-ts', '2010-2019', 'coln2'],
                      },
                    ],
                    horizontalAxis: 'date',
                    sliceInfo: {
                      g1: {
                        sliceLabels: {
                          slice0: 'This year',
                          slice1: 'Overlap',
                          slice2: 'Forecast',
                        },
                        sliceColors: {
                          slice0: '#50C0AD',
                          slice1: 'orange',
                          slice2: '#F15A48',
                        },
                      },
                      g2: {
                        sliceLabels: {
                          slice0: 'Decadal average',
                        },
                        sliceColors: {
                          slice0: '#1B3958',
                        },
                      },
                    },
                  },
                  content: (
                    <div className="text-area">
                      <h1>Larva Forecast</h1>
                      <div>
                        <p>
                          Predicted number of larvae in a typical breeding site compared with the
                          decadal averages.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ],
            },
            {
              id: [0, 2, 1],
              icon: adult,
              key: 'activity_forecast',
              hasPanels: true,
              children: [
                {
                  id: [0, 2, 1, 0],
                  key: 'simulation_graph',
                  chartParameters: {
                    chartType: 'rechart',
                    years: 'ecmwf',
                    // brushStart: -6,
                    // brushEnd: 3,
                    mixedKeys: [
                      {
                        key: 'g1',
                        levels: ['test', 'fcast-ts', 'ecmwf', 'iouts'],
                      },
                      {
                        key: 'g2',
                        levels: ['ts', 'fcast-ts', 'ecmwf', 'iouts'],
                      },
                    ],

                    horizontalAxis: 'date',
                    sliceInfo: {
                      g1: {
                        sliceLabels: {
                          slice0: 'This year (sim)',
                          slice1: 'Overlap (sim) ',
                          slice2: 'Forecast (sim)',
                        },
                        sliceColors: {
                          slice0: '#1c2833',
                          slice1: '#af7ac5',
                          slice2: '#d98880',
                        },
                      },
                      g2: {
                        sliceLabels: {
                          slice0: 'This year',
                          slice1: 'Overlap',
                          slice2: 'Forecast',
                        },
                        sliceColors: {
                          slice0: '#50C0AD',
                          slice1: 'orange',
                          slice2: '#F15A48',
                        },
                      },
                    },
                  },
                  content: (
                    <div className="text-area">
                      <h1>Simulation Data </h1>
                      <div>
                        <p>Here we will display simulation graphics</p>{' '}
                      </div>
                    </div>
                  ),
                },
                {
                  id: [0, 2, 1, 1],
                  chartParameters: {
                    twins: [
                      {
                        id: 12,
                        display: false,
                        simulation: true,
                      },
                      { id: 4, display: false },
                    ],

                    chartType: 'rechart',
                    initialSetting: 'fcast-ts',
                    mixedKeys: [
                      {
                        key: 'g1',
                        levels: ['fcast-ts', 'ecmwf', 'colegg'],
                      },
                      {
                        key: 'g2',
                        levels: ['sim-ts', '2010-2019', 'colegg'],
                      },
                    ],
                    horizontalAxis: 'date',
                    sliceInfo: {
                      g1: {
                        sliceLabels: {
                          slice0: 'This year',
                          slice1: 'Overlap',
                          slice2: 'Forecast',
                        },
                        sliceColors: {
                          slice0: '#50C0AD',
                          slice1: 'orange',
                          slice2: '#F15A48',
                        },
                      },
                      g2: {
                        sliceLabels: {
                          slice0: 'Decadal activity',
                        },
                        sliceColors: {
                          slice0: '#1B3958',
                        },
                      },
                    },
                  },
                  content: (
                    <div className="text-area">
                      <h1>Activity Forecast</h1>
                      <div>
                        <p>
                          Daily number of eggs laid by the Asian tiger mosquito as a proxy to biting
                          activity.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: [0, 2, 1, 2],
                  decade: '2090-2100',
                  key: 'activity_forecast',
                  chartParameters: {
                    chartType: 'rechart',
                    years: '2090-2100',
                    // brushStart: -6,
                    // brushEnd: 3,
                    mixedKeys: [
                      {
                        key: 'g1',
                        levels: ['fcast-ts', 'nasa', 'ssp245', 'colegg'],
                      },
                      {
                        key: 'g2',
                        levels: ['fcast-ts', 'nasa', 'ssp585', 'colegg'],
                      },
                      {
                        key: 'g3',
                        levels: ['sim-ts', '2010-2019', 'colegg'],
                      },
                      {
                        key: 'g4',
                        levels: ['sim-ts', '1980-1989', 'colegg'],
                      },
                    ],
                    sliceInfo: {
                      g1: {
                        sliceColors: {
                          slice0: 'orange',
                        },
                        sliceLabels: {
                          slice0: 'SSP2-4.5',
                        },
                      },
                      g2: {
                        sliceColors: {
                          slice0: '#F15A48',
                        },
                        sliceLabels: {
                          slice0: 'SSP5-8.5',
                        },
                      },
                      g3: {
                        sliceColors: {
                          slice0: '#1B3958',
                        },
                        sliceLabels: {
                          slice0: '2010-2020',
                        },
                      },
                      g4: {
                        sliceColors: {
                          slice0: '#50C0AD',
                        },
                        sliceLabels: {
                          slice0: '1980-1990',
                        },
                      },
                    },
                    horizontalAxis: 'date',
                  },

                  content: (
                    <div className="text-area">
                      <h1>Activity Projections</h1>
                      <div>
                        <p>
                          Daily number of eggs in 2010-2020, compared to the historical (1980-1990)
                          and projected future (2090-2100) decadal averages. SSP 2-4.5 and SSP 5-8.5
                          represent the optimistic and pessimistic scenarios, respectively.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ],
            },

            {
              id: [0, 2, 2],
              key: 'outbreak_forecast',
              icon: virus,
              hasPanels: true,
              children: [
                {
                  id: [0, 2, 2, 0],
                  chartParameters: {
                    twins: [{ id: 6, display: false }],

                    chartType: 'rechart',
                    years: 'ecmwf',
                    //brushStart and brushEnd are used to set the
                    //initial range of the brush [months from the current date]
                    // brushStart: -6,
                    // brushEnd: 3,

                    mixedKeys: [
                      {
                        key: 'g1',
                        levels: ['fcast-ts', 'ecmwf', 'pouts'],
                      },
                      {
                        key: 'g2',
                        levels: ['sim-ts', '2010-2019', 'pouts'],
                      },
                    ],
                    sliceInfo: {
                      g1: {
                        sliceLabels: {
                          slice0: 'This year',
                          slice1: 'Overlap',
                          slice2: 'Forecast',
                        },
                        sliceColors: {
                          slice0: '#50C0AD',
                          slice1: 'orange',
                          slice2: '#F15A48',
                        },
                      },
                      g2: {
                        sliceLabels: {
                          slice0: 'Decadal average',
                        },
                        sliceColors: {
                          slice0: '#1B3958',
                        },
                      },
                    },
                    horizontalAxis: 'date',
                  },
                  content: (
                    <div className="text-area">
                      <h1>Outbreak Forecast</h1>
                      <div>
                        <p>
                          The likeliness of an outbreak in response to an imported infectious case
                          according to the{' '}
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
                          We introduce an infectious case in a population of 4000. Outbreak{' '}
                          <strong>risk</strong> is the number of times (out of 100) when an
                          autochthonous case is observed.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: [0, 2, 2, 1],
                  decade: '2090-2100',
                  key: 'outbreak_forecast',
                  chartParameters: {
                    chartType: 'rechart',
                    years: '2090-2100',
                    // brushStart: -6,
                    // brushEnd: 3,
                    mixedKeys: [
                      {
                        key: 'g1',
                        levels: ['fcast-ts', 'nasa', 'ssp245', 'pouts'],
                      },
                      {
                        key: 'g2',
                        levels: ['fcast-ts', 'nasa', 'ssp585', 'pouts'],
                      },
                      {
                        key: 'g3',
                        levels: ['sim-ts', '2010-2019', 'pouts'],
                      },
                      {
                        key: 'g4',
                        levels: ['sim-ts', '1980-1989', 'pouts'],
                      },
                    ],
                    sliceInfo: {
                      g1: {
                        sliceLabels: {
                          slice0: 'SSP2-4.5',
                        },
                        sliceColors: {
                          slice0: 'orange',
                        },
                      },
                      g2: {
                        sliceLabels: {
                          slice0: 'SSP5-8.5',
                        },
                        sliceColors: {
                          slice0: '#F15A48',
                        },
                      },
                      g3: {
                        sliceLabels: {
                          slice0: '2010-2020',
                        },
                        sliceColors: {
                          slice0: '#1B3958',
                        },
                      },
                      g4: {
                        sliceLabels: {
                          slice0: '1980-1990',
                        },
                        sliceColors: {
                          slice0: '#50C0AD',
                        },
                      },
                    },
                    horizontalAxis: 'date',
                  },
                  content: (
                    <div className="text-area">
                      <h1>Outbreak Projections</h1>
                      <div>
                        <p>
                          Average outbreak risk in 2010-2020, compared to the historical (1980-1990)
                          and projected future (2090-2100) decadal averages. SSP 2-4.5 and SSP 5-8.5
                          represent the optimistic and pessimistic scenarios, respectively.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ],
            },

            {
              id: [0, 2, 3],
              key: 'impact_forecast',
              icon: impact,
              hasPanels: true,
              children: [
                {
                  id: [0, 2, 3, 0],
                  chartParameters: {
                    twins: [{ id: 8, display: false }],

                    chartType: 'rechart',
                    years: 'ecmwf',
                    // brushStart: -6,
                    // brushEnd: 3,
                    xinit: { date0: 15, date1: 125 },
                    mixedKeys: [
                      {
                        key: 'g1',
                        levels: ['fcast-ts', 'ecmwf', 'iouts'],
                      },
                      {
                        key: 'g2',
                        levels: ['sim-ts', '2010-2019', 'iouts'],
                      },
                    ],
                    horizontalAxis: 'date',
                    sliceInfo: {
                      g1: {
                        sliceLabels: {
                          slice0: 'This year',
                          slice1: 'Overlap',
                          slice2: 'Forecast',
                        },
                        sliceColors: {
                          slice0: '#50C0AD',
                          slice1: 'orange',
                          slice2: '#F15A48',
                        },
                      },
                      g2: {
                        sliceLabels: {
                          slice0: 'Decadal average',
                        },
                        sliceColors: {
                          slice0: '#1B3958',
                        },
                      },
                    },
                  },
                  content: (
                    <div className="text-area">
                      <h1>Impact Forecast</h1>
                      <div>
                        <p>
                          The expected impact of an imported infectious case according to the{' '}
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
                          We introduce an infectious case in a population of 4000. The{' '}
                          <strong>impact</strong> is the average number of autochthonous cases in 60
                          days.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: [0, 2, 3, 1],
                  decade: '2090-2100',
                  key: 'impact_forecast',
                  chartParameters: {
                    chartType: 'rechart',
                    years: '2090-2100',
                    // brushStart: -6,
                    // brushEnd: 3,
                    mixedKeys: [
                      {
                        key: 'g1',
                        levels: ['fcast-ts', 'nasa', 'ssp245', 'iouts'],
                      },
                      {
                        key: 'g2',
                        levels: ['fcast-ts', 'nasa', 'ssp585', 'iouts'],
                      },
                      {
                        key: 'g3',
                        levels: ['sim-ts', '2010-2019', 'iouts'],
                      },
                      {
                        key: 'g4',
                        levels: ['sim-ts', '1980-1989', 'iouts'],
                      },
                    ],
                    sliceInfo: {
                      g1: {
                        sliceLabels: {
                          slice0: 'SSP2-4.5',
                        },
                        sliceColors: {
                          slice0: 'orange',
                        },
                      },
                      g2: {
                        sliceLabels: {
                          slice0: 'SSP5-8.5',
                        },
                        sliceColors: {
                          slice0: '#F15A48',
                        },
                      },
                      g3: {
                        sliceLabels: {
                          slice0: '2010-2020',
                        },
                        sliceColors: {
                          slice0: '#1B3958',
                        },
                      },
                      g4: {
                        sliceLabels: {
                          slice0: '1980-1990',
                        },
                        sliceColors: {
                          slice0: '#50C0AD',
                        },
                      },
                    },
                    horizontalAxis: 'date',
                  },
                  content: (
                    <div className="text-area">
                      <h1>Impact Projections</h1>
                      <div>
                        <p>
                          Average importation impact in 2010-2020, compared to the historical
                          (1980-1990) and projected future (2090-2100) decadal averages. SSP 2-4.5
                          and SSP 5-8.5 represent the optimistic and pessimistic scenarios,
                          respectively.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ],
            },
          ],
        },

        {
          id: [0, 3],
          key: 'tile_selector',
          icon: suser,
          hasPanels: true,
          children: [
            {
              id: [0, 3, 0],
              chartParameters: {},
              content: <TileSelector tileIcons={tileIcons}></TileSelector>,
            },
          ],
        },
        {
          id: [0, 4],
          key: 'vector_selector',
          icon: model,
          hasPanels: true,
          children: [
            {
              id: [0, 4, 0],
              chartParameters: {},
              content: <ChangeMapPanel></ChangeMapPanel>,
            },
          ],
        },
        {
          id: [0, 5],
          key: 'simulation_panel',
          icon: seasonal,
          hasPanels: true,
          children: [
            {
              id: [0, 5, 0],
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
          ],
        },

        {
          id: [0, 6],
          key: 'settings_panel',
          icon: settingsIcon,
          hasPanels: true,
          children: [
            {
              id: [0, 6, 0],
              chartParameters: {},
              content: (
                <div className="text-area">
                  <h1>Settings Panel </h1>

                  <SettingsPanel />
                  {/* <CoordinatePicker /> */}
                </div>
              ),
            },
          ],
        },
      ],
    },
  ];
  const parPickerPanelData = [
    {
      id: 0,
      key: 'location_info',
      decade: '',
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
      key: 'seasonal_profile',
      icon: seasonal,

      chartParameters: {
        chartType: 'rechart',
        years: 'ecmwf',
        // brushStart: -6,
        // brushEnd: 3,
        mixedKeys: [
          {
            key: 'g1',
            levels: ['test', 'fcast-ts', 'ecmwf', 'iouts'],
          },
          {
            key: 'g2',
            levels: ['ts', 'fcast-ts', 'ecmwf', 'iouts'],
          },
        ],

        horizontalAxis: 'date',
        sliceInfo: {
          g1: {
            sliceLabels: {
              slice0: 'This year (sim)',
              slice1: 'Overlap (sim) ',
              slice2: 'Forecast (sim)',
            },
            sliceColors: {
              slice0: '#1c2833',
              slice1: '#af7ac5',
              slice2: '#d98880',
            },
          },
          g2: {
            sliceLabels: {
              slice0: 'This year',
              slice1: 'Overlap',
              slice2: 'Forecast',
            },
            sliceColors: {
              slice0: '#50C0AD',
              slice1: 'orange',
              slice2: '#F15A48',
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
                display: 'flex',
                alignContent: 'space-evenly',
                width: '100%',
                fontSize: '0.5rem',
              }}
            >
              <p> lat:{mapPagePosition.lat}</p>
              <p>
                {' '}
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
      id: [1, 1],
      key: 'menu_icon',
      parent: [],
      icon: menuIcon,
      hasPanels: false,
      panelList: [],
      hasSubMenus: true,
      subMenuOpenDirection: 'down',
      subMenuIndex: 0,
    },
    {
      id: 0,
      icon: info,
      hasPanels: true,
      key: 'location_info',
    },
    {
      key: 'location_info_panel',
      chartParameters: {},
      icon: info,
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
      key: 'sandfly_population',
      icon: adultsandfly,
    },
    {
      key: 'sandfly_population_panel',
      chartParameters: {
        years: '2015',
        mixedKeys: [
          {
            key: 'g1',
            levels: ['sim-ts', '2015', 'simL'],
          },
          {
            key: 'g2',
            levels: ['sim-ts', '2015', 'simH'],
          },
        ],
        sliceInfo: {
          g1: {
            sliceLabels: { slice0: 'Secondary land type' },
            sliceColors: { slice0: '#F15A48' },
          },
          g2: {
            sliceLabels: { slice0: 'Primary land type' },
            sliceColors: { slice0: '#1B3958' },
          },
        },
        horizontalAxis: 'date',
        chartType: 'rechart',
        initialSetting: 'sim-ts',
        plottedKeys: ['simL', 'simH'],
        orientation: { g1: 'right' },
        colors: ['#F15A48', '#1B3958'],
        labels: ['Secondary land type', 'Primary land type'],
        lineSlice: [],
      },

      content: (
        <div className="text-area">
          <h1>Sand fly population size</h1>
          <div>
            <p>
              The number of females (normalised) for the year 2015 as simulated in{' '}
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
      key: 'sandfly_tile_selector',

      icon: suser,
    },
    {
      key: 'sandfly_tile_selector_panel',
      forgetOpen: true,

      chartParameters: {},
      content: <TileSelector tileIcons={tileIconsSand}></TileSelector>,
    },
    {
      id: 3,

      key: 'sandfly_vector_selector',
      icon: model,
    },
    {
      key: 'sandfly_vector_selector_panel',
      forgetOpen: true,

      chartParameters: {},
      content: (
        <>
          <ChangeMapPanel></ChangeMapPanel>
          <OptionsPanel></OptionsPanel>
        </>
      ),
    },
  ];

  const simulationPanels = panelData.filter((panel) => {
    if (panel.simulation) {
      return panel;
    }
  });
  const colorKeys = {};
  tileIconsSand.forEach((tile) => {
    colorKeys[tile.key] = tile.colkey;
  });
  tileIcons.forEach((tile) => {
    colorKeys[tile.key] = tile.colkey;
  });

  const sharedValues = {
    parPickerPanelData: parPickerPanelData,
    panelData: mapVector === 'albopictus' ? panelData : panelDataSand, // panelDataSand,
    tileIcons: mapVector === 'albopictus' ? tileIcons : tileIconsSand, // tileIconsSand,
    parPickerTileIcons: parPickerTileIcons,
    parPickerRowHeadings: parPickerRowHeadings,
    tileIconsRowHeadings:
      mapVector === 'albopictus' ? tileIconRowHeadings : tileIconRowHeadingsSand,
    tileIconsSand: tileIconsSand,
    tileIconsAlbo: tileIcons,
    panelDataSand: panelDataSand,
    panelDataAlbo: panelData,
    menuStructure: mapVector === 'albopictus' ? menuStructure : menuStructureSand,
    simulationPanels: simulationPanels,
    tree: tree,
    colorKeys: colorKeys,
  };

  return <PanelContextV2.Provider value={sharedValues}>{children}</PanelContextV2.Provider>;
}

export default PanelContextV2;
export { PanelProviderV2 };
