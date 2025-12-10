import adultsandfly1 from 'assets/icons/map-page-right-menu/png/mosquito-3-aprdec-32px.png';
import XLink from 'components/xlink';
const tileBase = process.env.REACT_APP_BASE_URL;

export const tileIconsSand = [
  {
    key: 'Bologna2024_vabun',
    colkey: 'Bologna2024_vabun',

    label: 'Size of the VectAbundance dataset in 2019-2022',
    icon: adultsandfly1,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_vabun&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 31,
    },
    description: (
      <>
        <p>
          Number of years with ovitraps containing <i>Ae. albopictus </i> eggs from the <XLink href="https://www.nature.com/articles/s41597-024-03482-y">VectAbundance</XLink> dataset in 2019-2022.
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M0',
    colkey: 'Bologna2024_M0',

    label: 'Ph. papatasi female abundance ratio',
    icon: adultsandfly1,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M0&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 11,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015).
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M1',
    colkey: 'Bologna2024_M1',

    label: 'Ph. papatasi female abundance ratio',
    icon: adultsandfly1,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M1&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 12,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015).
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M2',
    colkey: 'Bologna2024_M2',

    label: 'Ph. papatasi female abundance ratio',
    icon: adultsandfly1,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M2&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 13,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015).
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M3',
    colkey: 'Bologna2024_M3',

    label: 'Ph. papatasi female abundance ratio',
    icon: adultsandfly1,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M3&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 14,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015).
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M4',
    colkey: 'Bologna2024_M4',

    label: 'Ph. papatasi female abundance ratio',
    icon: adultsandfly1,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M4&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 21,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015).
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M5',
    colkey: 'Bologna2024_M5',

    label: 'Ph. papatasi female abundance ratio',
    icon: adultsandfly1,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M5&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 22,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015).
        </p>
      </>
    ),
  },
  {
    key: 'Bologna2024_M6',
    colkey: 'Bologna2024_M6',

    label: 'Ph. papatasi female abundance ratio',
    icon: adultsandfly1,
    tileLayer: {
      tile: tileBase + '?v=Bologna2024_M6&z={z}&x={x}&y={y}',
      props: { attribution: '', noWrap: true },
      displayIndex: 23,
    },
    description: (
      <>
        <p>
          Average number of <i>Phlebotomus papatasi</i> females (2011-2015).
        </p>
      </>
    ),
  }
];
