import adult from 'assets/icons/map-page-right-menu/png/adult-32px.png';
import veclim from 'assets/icons/map-page-right-menu/png/veclim-32px.png';
import arbocartor from 'assets/icons/map-page-right-menu/png/arbocartor-32px.png';
import dynamaedes from 'assets/icons/map-page-right-menu/png/dynamaedes-32px.png';
import metelmann from 'assets/icons/map-page-right-menu/png/metelmann-32px.png';
import vectri from 'assets/icons/map-page-right-menu/png/vectri-32px.png';
import aedesdde from 'assets/icons/map-page-right-menu/png/aedesdde-32px.png';
import stackedml from 'assets/icons/map-page-right-menu/png/stackedml-32px.png';
import XLink from 'components/xlink';
const tileBase = process.env.REACT_APP_BASE_URL;

export const tileIconsSand = [
  {
    key: 'Bologna2024_vabun',
    colkey: 'Bologna2024_vabun',

    label: 'Size of the VectAbundance dataset in 2019-2022',
    icon: adult,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_vabun&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 31,
    },
    description: (
      <>
        <p>
          Number of years with ovitraps containing <i>Ae. albopictus </i> eggs from the <XLink href="https://www.nature.com/articles/s41597-024-03482-y">VectAbundance</XLink> dataset in 2019-2022
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M0',
    colkey: 'Bologna2024_M0',

    label: 'Model albopictus (sPop)',
    icon: veclim,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M0&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Structured population model (sPop - albopictus) of VEClim
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M1',
    colkey: 'Bologna2024_M1',

    label: 'Model ArboCartoR',
    icon: arbocartor,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M1&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 12,
    },
    description: (
      <>
        <p>
          ODE model of the Asian tiger mosquito (ArboCartoR)
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M2',
    colkey: 'Bologna2024_M2',

    label: 'Model of dynamAedes',
    icon: dynamaedes,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M2&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 13,
    },
    description: (
      <>
        <p>
          Stochastic spatiotemporal model of the Asian tiger mosquito (dynamAedes)
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M3',
    colkey: 'Bologna2024_M3',

    label: 'Model of Metelmann et al. (2019)',
    icon: metelmann,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M3&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 14,
    },
    description: (
      <>
        <p>
          ODE model of the Asian tiger mosquito (Metelmann et al. 2019)
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M4',
    colkey: 'Bologna2024_M4',

    label: 'Model of VECTRI',
    icon: vectri,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M4&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 21,
    },
    description: (
      <>
        <p>
          The vector-borne disease community model of ICTP, TRIeste (VECTRI)
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M5',
    colkey: 'Bologna2024_M5',

    label: 'Model of AedesDDE',
    icon: aedesdde,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M5&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 22,
    },
    description: (
      <>
        <p>
          DDE model of the Asian tiger mosquito (AedesDDE)
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M6',
    colkey: 'Bologna2024_M6',

    label: 'Model of StackedML',
    icon: stackedml,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M6&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 23,
    },
    description: (
      <>
        <p>
          Ensemble machine learning model of the Asian tiger mosquito (Stacked Machine Learning)
        </p>
      </>
    ),
  }
];
