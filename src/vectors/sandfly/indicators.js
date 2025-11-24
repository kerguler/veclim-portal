export const indicators = {
  resolution: '0.0215° x 0.0215°',
  model: {
    label: 'Sand',
    url: 'https://pypi.org/project/albopictus/', // or correct URL when you have one
    description: null,
  },
  covariates: [
    {
      label: 'WRF-ARW (2015)',
      url: 'https://doi.org/10.5281/zenodo.8413232',
      note: '2015',
    },
  ],
  showForecastRange: false,
};
