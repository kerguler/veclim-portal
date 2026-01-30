import adult from 'assets/icons/map-page-right-menu/png/adult-32px.png';
import larva from 'assets/icons/map-page-right-menu/png/larva-32px.png';
import virus from 'assets/icons/map-page-right-menu/png/013-coronavirus-32px.png';
import impact from 'assets/icons/map-page-right-menu/png/015-heart rate-32px.png';

import prpin from 'assets/icons/map-page-right-menu/png/027-pin-32px.png';
const tileBase = process.env.REACT_APP_BASE_URL;

const fcastDateRange = '2026-03-01:2026-06-01';
const fcastDateLabel = 'March-May 2026';

export const tileIcons = [
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
          Average decadal mosquito activity in 2010-2020 as predicted by the
          model (assumes tiger mosquito presence). The colour scale is
          proportional to the activity predicted in Emilia-Romagna.
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
          The first calendar month when the predicted number of larva (in a
          typical breeding site) exceeds 1. No data is shown when the number of
          larva is always higher or lower than 1.
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
          All the grid cells that are somehow connected to an administrative
          polygon where the tiger mosquito has been reported.
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
          <a
            href="https://doi.org/10.5281/zenodo.11486198"
            target="_blank"
            rel="noreferrer"
          >
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
          <a
            href="https://vectorbase.org/vectorbase/app/"
            target="_blank"
            rel="noreferrer"
          >
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
          Decadal averages of outbreak risk in 2010-2020 measured as the
          likeliness of starting an outbreak out of 100 independent importations
          in the first 60 days. The value shown represents a potential derived
          from the model. We assume vector presence in each grid cell.
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
          Decadal averages (2010-2020) of the expected impact of an infectious
          case imported in a population of 4000 susceptible individuals. The
          value shown represents a potential derived from the model. We assume
          vector presence in each grid cell.
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
          Average decadal mosquito activity in {fcastDateLabel} as predicted by
          the model (assumes tiger mosquito presence).
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
      tile:
        tileBase + '?v=colegg_fcast&z={z}&x={x}&y={y}&dates=' + fcastDateRange,
      props: { attribution: '', noWrap: true },
      displayIndex: 22,
    },
    description: (
      <>
        <p>
          Mosquito activity in {fcastDateLabel} as predicted by the model
          (assumes tiger mosquito presence) using low-resolution ECMWF seasonal
          forecasts.
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
      tile:
        tileBase + '?v=chikv_pouts&z={z}&x={x}&y={y}&dates=' + fcastDateRange,
      props: { attribution: '', noWrap: true },
      displayIndex: 23,
    },
    description: (
      <>
        <p>
          Average decadal outbreak risk in {fcastDateLabel} measured as the
          likeliness of starting an outbreak out of 100 independent importations
          in the first 60 days. The value shown represents a potential derived
          from the model. We assume vector presence in each grid cell.
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
      tile:
        tileBase +
        '?v=chikv_pouts_fcast&z={z}&x={x}&y={y}&dates=' +
        fcastDateRange,
      props: { attribution: '', noWrap: true },
      displayIndex: 24,
    },
    description: (
      <>
        <p>
          Outbreak risk in {fcastDateLabel} measured as the likeliness of
          starting an outbreak out of 100 independent importations in the first
          60 days using low-resolution ECMWF seasonal forecasts.
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
      tile:
        tileBase + '?v=chikv_iouts&z={z}&x={x}&y={y}&dates=' + fcastDateRange,
      props: { attribution: '', noWrap: true },
      displayIndex: 25,
    },
    description: (
      <>
        <p>
          Average decadal expected impact of an infectious case imported in{' '}
          {fcastDateLabel}, in a population of 4000 susceptible individuals. The
          value shown represents a potential derived from the model. We assume
          vector presence in each grid cell.
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
      tile:
        tileBase +
        '?v=chikv_iouts_fcast&z={z}&x={x}&y={y}&dates=' +
        fcastDateRange,
      props: { attribution: '', noWrap: true },
      displayIndex: 26,
    },
    description: (
      <>
        <p>
          Expected impact of an infectious case imported in {fcastDateLabel}, in
          a population of 4000 susceptible individuals estimated using
          low-resolution ECMWF seasonal forecasts.
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
          Average decadal mosquito activity in 2090-2100 as predicted by the
          model under the optimistic (SSP 2-4.5) scenario (assumes tiger
          mosquito presence). The colour scale is proportional to the activity
          predicted in Emilia-Romagna.
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
          Decadal averages of outbreak risk in 2090-2100 under the optimistic
          SSP 2-4.5 scenario. The risk is measured as the likeliness of starting
          an outbreak out of 100 independent importations in the first 60 days.
          The value shown represents a potential derived from the model. We
          assume vector presence in each grid cell.
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
          Decadal averages (2090-2100 under the optimistic SSP 2-4.5 scenario)
          of the expected impact of an infectious case imported in a population
          of 4000 susceptible individuals. The value shown represents a
          potential derived from the model. We assume vector presence in each
          grid cell.
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
          Average decadal mosquito activity in 2090-2100 as predicted by the
          model under the pessimistic (SSP 5-8.5) scenario (assumes tiger
          mosquito presence). The colour scale is proportional to the activity
          predicted in Emilia-Romagna.
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
          Decadal averages of outbreak risk in 2090-2100 under the pessimistic
          SSP 5-8.5 scenario. The risk is measured as the likeliness of starting
          an outbreak out of 100 independent importations in the first 60 days.
          The value shown represents a potential derived from the model. We
          assume vector presence in each grid cell.
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
          Decadal averages (2090-2100 under the pessimistic SSP 5-8.5 scenario)
          of the expected impact of an infectious case imported in a population
          of 4000 susceptible individuals. The value shown represents a
          potential derived from the model. We assume vector presence in each
          grid cell.
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
          Average decadal mosquito activity in 1980-1990 as predicted by the
          model (assumes tiger mosquito presence). The colour scale is
          proportional to the activity predicted in Emilia-Romagna.
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
          Decadal averages of outbreak risk in 1980-1990 measured as the
          likeliness of starting an outbreak out of 100 independent importations
          in the first 60 days. The value shown represents a potential derived
          from the model. We assume vector presence in each grid cell.
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
          Decadal averages (1980-1990) of the expected impact of an infectious
          case imported in a population of 4000 susceptible individuals. The
          value shown represents a potential derived from the model. We assume
          vector presence in each grid cell.
        </p>
      </>
    ),
  },
];
