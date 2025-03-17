# Internal ReadMe

## Helpful explanations

Some helpful explanation of functionality

## Table of Contents

- [Internal ReadMe](#internal-readme)
  - [Helpful explanations](#helpful-explanations)
  - [Table of Contents](#table-of-contents)
  - [Using chartParameters](#using-chartparameters)

## Using chartParameters

Data is received from backend and it is processed in ReactJs to be put into the correct format for display. From the data, we know we will be slicing a graph into parts, if the data has a property called "overlaps" with an array of dates representing the cut points. If this array has 2 elements,then there would be 3 lines... these should be clearly expressed in chartParameters. as slice0,slice1,slice2... if there is no "overlaps" or if we do not want to slice a given data, then we still enter them as a single slice slice0..

The below chartParameters explain how to use the parameters, if we are expecting to slice both the lines....

```javascript
// Example of using chartParameters
chartParameters: {
				chartType: "rechart", // not necessarily important... just for the future when we want to add other charting options.1
				years: "ecmwf", // years are actually important for when we are using arrows to pass to other panels. especially when we want to use the same panel for two charts (like Activity Forecast.)

//brushStart and brushEnd are used when we want to initialize the x-brush at certain values.
				// brushStart: -6,
				// brushEnd: 3,

// mixedKeys represent your graph names and where to find the date for them.

// forexapmle we will find the data for g1 at data["test"]["fcast-ts"]["ecmf"]["iouts"]
// it is REQUIRED to have all the graphs here.
				mixedKeys: [
					{
						key: "g1",
						levels: ["test", "fcast-ts", "ecmwf", "iouts"],
					},
					{
						key: "g2",
						levels: ["ts", "fcast-ts", "ecmwf", "iouts"],
					},
				],
// horizontal axis is always date for us. this parameter is not used at the moment. but it is useful for the future.
				horizontalAxis: "date",
// lineSlice is an array of graphs that you will be slicing.
				lineSlice: ["g1", "g2"],

// Info about the slices.
				sliceInfo: {
                    // as g1 and g2 are in the lineSlice array, We should find "overlaps" in the data as we know we will be slicing it at the backend.
// property g1 has properties sliceLabels and sliceColors representing the labels and colors of each lineSlice.

					g1: {
						sliceLabels: {
							slice0: "This year (sim)",
							slice1: "Overlap (sim) ",
							slice2: "Forecast (sim)",
						},
						sliceColors: {
							slice0: "#1c2833",
							slice1: "#af7ac5",
							slice2: "#d98880",
						},
					},
					g2: {
						sliceLabels: {
							slice0: "This year",
							slice1: "Overlap",
							slice2: "Forecast",
						},
						sliceColors: {
							slice0: "#50C0AD",
							slice1: "orange",
							slice2: "#F15A48",
						},
					},
				},
			},




```

If we wanted to not slice any lines, we could use parameters as follows:
here we have 3 graphs, whose locations are given in mixedKeys... sliceInfo property explains each graph as a single slice with a label.

```javascript
			chartParameters: {
				chartType: "rechart",
				years: "2010-2019",
				horizontalAxis: "date",
				lineSlice: [],
				mixedKeys: [
					{
						key: "g1",
						levels: ["meteo-ts", "2010-2019", "atemp"],
					},
					{
						key: "g2",
						levels: ["meteo-ts", "2010-2019", "rehum"],
					},
					{
						key: "g3",
						levels: ["meteo-ts", "2010-2019", "precp"],
					},
				],

				sliceInfo: {
					g1: {
						sliceLabels: {
							slice0: "Temperature (°C)",
						},
						sliceColors: {
							slice0: "#F15A48",
						},
					},
					g2: {
						sliceLabels: { slice0: "Rel. humidity (%)" },
						sliceColors: { slice0: "#50C0AD" },
					},
					g3: {
						sliceLabels: { slice0: "Precipitation (mm)" },
						sliceColors: { slice0: "#1B3958" },
					},
				},
			},


```

If we wanted to have two curves and one of them should be sliced, we can mix and match as such... making sure to mention which curve is to be sliced in lineslice property.

```javascript
	chartParameters: {
				chartType: "rechart",
				years: "ecmwf",
				// brushStart: -6,
				// brushEnd: 3,
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
				horizontalAxis: "date",
				lineSlice: ["g1"],
				sliceInfo: {
					g1: {
						sliceLabels: {
							slice0: "This year",
							slice1: "Overlap",
							slice2: "Forecast",
						},
						sliceColors: {
							slice0: "#50C0AD",
							slice1: "orange",
							slice2: "#F15A48",
						},
					},
					g2: {
						sliceLabels: { slice0: "Decadal average" },
						sliceColors: { slice0: "#1B3958" },
					},
				},
			},


```
