function calculatePlotMat(data, chartType) {
	// console.log(data);
	let dataB;
	const date0 = new Date(data.date.date0);
	const date1 = new Date(data.date.date1);
	var currentDate = date0;
	let dateArray = [];
	let plotMat = [];
	let counter = 0;
	const formatDate = (date) => {
		var year = date.getFullYear();
		var month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
		var day = date.getDate().toString().padStart(2, "0");
		return year + "-" + month + "-" + day;
	};

	while (currentDate <= date1) {
		var formattedDate = formatDate(currentDate);
		currentDate.setDate(currentDate.getDate() + 1);
		dateArray.push(formattedDate);
	}
	counter = 0;

	// if (chartType === "d3") {
	// 	dataB = data["meteo-ts"]["2010-2019"];

	// 	const keys = Object.keys(dataB);
	// 	keys.forEach((key, index, keys) => {
	// 		if (key === "pdens") {
	// 			return;
	// 		}
	// 		counter = 0;
	// 		plotMat.push({
	// 			key: key,
	// 			values: dateArray.map((date) => {
	// 				if (dataB[key][counter]) {
	// 					return { x: counter, y: dataB[key][counter++] };
	// 				}
	// 			}),
	// 		});
	// 	});
	// } else 
	if (chartType === "rechart") {
		dataB = data["meteo-ts"]["2010-2019"];

		const dateStart = dateArray[Math.floor(dateArray.length / 3)];
		const dateEnd = dateArray[Math.floor((dateArray.length * 2) / 3)];
		let range1;
		let range2;
		let range3;
		counter = 0;
		plotMat = Object.entries(dateArray).map(([key, value]) => {
			const date = dateArray[counter++];
			const photo = dataB.photo[key];
			const atemp = dataB.atemp[key];
			const rehum = dataB.rehum[key];
			const precp = dataB.precp[key];
			const soilw = dataB.soilw[key];
			if (date < dateStart) {
				range1 = rehum;
				range2 = null;
				range3 = null;
			} else if (date >= dateStart && date < dateEnd) {
				if (date === dateStart) {
					range1 = rehum;
				} else {
					range1 = null;
				}
				range2 = rehum;
				range3 = null;
			} else {
				if (date === dateEnd) {
					range2 = rehum;
				} else {
					range2 = null;
				}
				range1 = null;
				range3 = rehum;
			}

			return {
				date,
				photo,
				atemp,
				rehum,
				precp,
				soilw,
				range1,
				range2,
				range3,
				dateStart,
				dateEnd,
			};
		});
	} else if (chartType === "rechart-risk") {
		dataB = data["fcast-ts"]["2010-2019"];

		const dateStart = dataB.ecmwf.overlap[0];
		const dateEnd = dataB.ecmwf.overlap[1];
		let range1;
		let range2;
		let range3;
		counter = 0;
		plotMat = Object.entries(dateArray).map(([key, value]) => {
			const date = dateArray[counter++];
			const colegg = dataB.photo[key];
			const coln2 = dataB.atemp[key];
			const coln4f = dataB.rehum[key];

			if (date < dateStart) {
				range1 = colegg;
				range2 = null;
				range3 = null;
			} else if (date >= dateStart && date < dateEnd) {
				if (date === dateStart) {
					range1 = colegg;
				} else {
					range1 = null;
				}
				range2 = colegg;
				range3 = null;
			} else {
				if (date === dateEnd) {
					range2 = colegg;
				} else {
					range2 = null;
				}
				range1 = null;
				range3 = colegg;
			}

			return {
				date,
				colegg,
				coln2,
				coln4f,
				range1,
				range2,
				range3,
				dateStart,
				dateEnd,
			};
		});
	} else {
		console.log("unrecognized chart type");
	}
	return { dataB, plotMat };
}

export default calculatePlotMat;
