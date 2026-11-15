export const indicators = {
  resolution: '5.5 km x 5.5 km',
  model: {
    label: 'Model of Phlebotomus papatasi',
    url: null,
    description:
      "Model of <em>Phlebotomus spp.</em>, version V2609C, developed as part of ISMED-CLIM's early warning system against zoonotic diseases",
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
      label: 'ERA5',
      url: 'https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels',
    },
    {
      label: 'ERA5-Land',
      url: 'https://cds.climate.copernicus.eu/datasets/reanalysis-era5-land',
    },
    {
      label: 'NEX-GDDP-CMIP6',
      url: 'https://www.nccs.nasa.gov/data-collections/nex-gddp-cmip6/',
    },
    {
      label: 'CORINE Land Cover',
      url: 'https://land.copernicus.eu/en/products/corine-land-cover',
    },
  ],
  showForecastRange: false,
};
