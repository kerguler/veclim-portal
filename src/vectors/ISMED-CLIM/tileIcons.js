import adultsandfly from 'assets/icons/map-page-right-menu/png/mosquito-3-32px.png';
import adultsandflyE from 'assets/icons/map-page-right-menu/png/mosquito-3-ERA5-32px.png';
import adultsandflyC from 'assets/icons/map-page-right-menu/png/mosquito-3-CMIP6-32px.png';
import modality from 'assets/icons/map-page-right-menu/png/002-analytics-18-32px.png';
import seasonlen from 'assets/icons/map-page-right-menu/png/004-analytics-16-32px.png';
import prpin from 'assets/icons/map-page-right-menu/png/027-pin-32px.png';

import XLink from 'components/xlink';
const tileBase = process.env.REACT_APP_BASE_URL;

export const tileIcons = [
  {
    key: 'papatasi_V2609C_PRT_newegg',
    colkey: 'papatasi_V2609C_PRT_newegg',

    label: 'Sand fly activity',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C_PRT_newegg&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          The average number of newly laid eggs in each municipality 
          of Portugal, during 2011-2014.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2609C_PRT_season_length',
    colkey: 'papatasi_V2609C_PRT_season_length',

    label: 'Sand fly season length (in weeks)',
    icon: seasonlen,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C_PRT_season_length&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 12,
    },
    description: (
      <>
        <p>
          The average length of the active sand fly season in weeks.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2609C_PRT_season_num',
    colkey: 'papatasi_V2609C_PRT_season_num',

    label: 'Number of active seasons',
    icon: modality,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C_PRT_season_num&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 13,
    },
    description: (
      <>
        <p>
          The number of active sand fly seasons (modality) as determined by an activity threshold.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_EDENext_PRT_surv',
    colkey: 'papatasi_EDENext_PRT_surv',

    label: 'Reported sand fly activity',
    icon: prpin,
    tileLayer: {
      tile: tileBase + '?v=papatasi_EDENext_PRT_surv&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 14,
    },
    description: (
      <>
        <p>
          Municipalities where adult sand flies were reported 
          during the <XLink href="https://cordis.europa.eu/project/id/261504">EDENext</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2609C_CERRA_newegg',
    colkey: 'papatasi_V2609C_CERRA_newegg',

    label: 'Sand fly activity',
    icon: adultsandfly,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C_CERRA_newegg&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 21,
    },
    description: (
      <>
        <p>
            The average number of newly laid eggs across the CERRA grid 
            during 2011-2014.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_EDENext_CERRA_surv',
    colkey: 'papatasi_EDENext_CERRA_surv',

    label: 'Reported sand fly activity',
    icon: prpin,
    tileLayer: {
      tile: tileBase + '?v=papatasi_EDENext_CERRA_surv&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 22,
    },
    description: (
      <>
        <p>
          CERRA grid cells where adult sand flies were reported 
          during the <XLink href="https://cordis.europa.eu/project/id/261504">EDENext</XLink> project.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2609C',
    colkey: 'papatasi_V2609C',

    label: 'Sand fly activity',
    icon: adultsandflyE,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 31,
    },
    description: (
      <>
        <p>
            The average number of newly laid eggs across the ERA5 grid 
            during 2011-2014.
        </p>
      </>
    ),
  },
  {
    key: 'papatasi_V2609C_ssp585',
    colkey: 'papatasi_V2609C_ssp585',

    label: 'Sand fly activity (SSP5-5.8)',
    icon: adultsandflyC,
    tileLayer: {
      tile: tileBase + '?v=papatasi_V2609C_ssp585&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 32,
    },
    description: (
      <>
        <p>
            The average number of newly laid eggs across the ERA5 grid 
            during 2091-2094.
        </p>
      </>
    ),
  }
];
