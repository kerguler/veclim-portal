import adultsandfly1 from 'assets/icons/map-page-right-menu/png/mosquito-3-aprdec-32px.png';
import adultsandfly2 from 'assets/icons/map-page-right-menu/png/mosquito-3-aprjun-32px.png';
import adultsandfly3 from 'assets/icons/map-page-right-menu/png/mosquito-3-julsep-32px.png';
import adultsandfly4 from 'assets/icons/map-page-right-menu/png/mosquito-3-octdec-32px.png';
const tileBase = process.env.REACT_APP_BASE_URL;

export const tileIconsSand = [
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
