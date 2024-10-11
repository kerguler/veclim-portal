import { useDispatch, useSelector } from "react-redux";
import "./ParserOutput.css";
import { useEffect } from "react";
import { useState } from "react";
import { setBlinkers } from "store";
function ParserOutput() {
	const blinkers = useSelector((state) => state.dashboard.blinkers);
	const dispatch = useDispatch();

	const parsedJson = useSelector((state) => state.simulation.parsedJson);
	console.log({ parsedJSON: parsedJson });
	const testJson = {
		model: {
			title: "Climate-sensitive population dynamics of Aedes albopictus",
			type: "Population",
			url: "https://github.com/kerguler/Population",
			deterministic: false,
			parameters: {
				algorithm: "Population",
				istep: 0.01,
			},
		},
		populations: [
			{
				id: "adult",
				name: "Adult females",
				processes: [
					{
						id: "adult_mort",
						name: "Adult lifetime",
						arbiter: "ACC_ERLANG",
						value: [20, 5],
					},
					{
						id: "adult_dev",
						name: "Egg development in adult females",
						arbiter: "ACC_ERLANG",
						value: [5, 1],
					},
				],
			},
		],
		transfers: [
			{
				id: "gonotrophic_cycle",
				name: "Gonotrophic cycle",
				from: "adult_dev",
				to: "adult",
				value: ["1.0", ["adult_mort", 0]],
			},
		],
		transformations: [
			{
				id: "adult_death",
				name: "Adult females dying today",
				value: "adult_mort",
			},
			{
				id: "num_gravid",
				name: "Number of gravid females",
				value: "adult_dev",
			},
			{
				id: "egg_laying",
				name: "Egg laying at the end of gonotrophic cycle",
				value: ["poisson", ["*", "num_gravid", 10]],
			},
		],
	}

	let parseMe = JSON.stringify(parsedJson);

	useEffect(() => {
		if (Object.keys(parsedJson).length === 0) {
			blinkers.displayParserOutput &&
				dispatch(setBlinkers({ ...blinkers, displayParserOutput: false }));
		} else {
			blinkers.displayParserOutput ||
				dispatch(setBlinkers({ ...blinkers, displayParserOutput: true }));
		}
	}, [parsedJson,  dispatch, blinkers]);
	return (
		<div className="flex-column">
			<h3 className="meteo-text"> Parser Output</h3>

			<textarea
				className=" meteo-text text-area"
				value={parseMe}
				readOnly
			>
				{" "}
			</textarea>
		</div>
	);
}

export default ParserOutput;
