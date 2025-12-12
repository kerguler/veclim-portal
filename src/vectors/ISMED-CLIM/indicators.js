export const indicators = {
  resolution: '5.5 km x 5.5 km',
  model: {
    label: 'Model of Phlebotomus papatasi',
    url: null,
    description:
      "Model of Phlebotomus papatasi, version V2511A, developed as part of ISMED-CLIM's early warning system against zoonotic diseases",
  },
  covariates: [
    {
      label: 'CERRA',
      url: 'https://cds.climate.copernicus.eu/datasets/reanalysis-cerra-single-levels',
    },
    {
      label: 'CERRA-Land',
      url: 'https://cds.climate.copernicus.eu/datasets/reanalysis-cerra-land',
    },
    {
      label: 'CORINE Land Cover',
      url: 'https://land.copernicus.eu/en/products/corine-land-cover',
    },
  ],
  showForecastRange: false,
};
