import { useSelector, useDispatch } from 'react-redux';
import './SimulationEditPanel.css';
import { useRef, useState } from 'react';
import { setEditedSimulation } from 'store';
import { useEditSimulationMutation } from 'store';
import { setBlinkers } from 'store';
import useOutsideClickClose from 'customHooks/useOutsideClickClose';
import JSONPretty from 'react-json-pretty';
import { useRunSimulationMutation } from 'store';
import JsonEditor from 'pages/ApiWelcomePage/JsonEditor/JsonEditor';
function SimulationEditPanel() {
	const sim = useSelector((state) => state.simulation.editedSimulation);
	const [isEditing, setIsEditing] = useState(false);
	const editedSimulation = useSelector(
		(state) => state.simulation.editedSimulation,
	);
	const [editSimulation] = useEditSimulationMutation();

	const dispatch = useDispatch();
	const [runSimulation] = useRunSimulationMutation();
	const setSimDescription = (e, id) => {
		dispatch(
			setEditedSimulation({
				...editedSimulation,
				description: e.target.value,
			}),
		);
	};
	const [jsonData, setJsonData] = useState(null);
	const [error, setError] = useState(null);
	const setSimPopJson = (e, id) => {
		let val = e.target.value;
		try {
			const parsedJson = JSON.parse(val);
			setJsonData(parsedJson);
			setError(null);
		} catch (err) {
			console.log(err);
			setError('invalid json');
		}
		dispatch(
			setEditedSimulation({
				...editedSimulation,
				popJson: e.target.value,
			}),
		);
	};
	const panelRef = useRef();
	const id = localStorage.getItem('id');
	useOutsideClickClose(panelRef, () => {
		dispatch(setBlinkers({ displayEditPage: false }));
		dispatch(setEditedSimulation(null));
	});
	const handleSaveSimulationEdit = () => {
		console.log('save', editedSimulation);
		try {
			const response = editSimulation({
				user: id,
				id: editedSimulation.id,
				title: editedSimulation.title,
				description: editedSimulation.description,
				popJson: editedSimulation.popJson,
			});
			// console.log("EDIT RESPONSE", response);
		} catch (err) {
			console.log(err);
		}
		dispatch(setBlinkers({ displayEditPage: false }));
		dispatch(setEditedSimulation(null));
	};
	const setSimulationTitle = (e, id) => {
		// console.log(e.target.value);

		dispatch(
			setEditedSimulation({ ...editedSimulation, title: e.target.value }),
		);
	};
	const handleDismissChanges = () => {
		dispatch(setBlinkers({ displayEditPage: false }));
		dispatch(setEditedSimulation(null));
	};

	const handleModelRun = async () => {
		try {
			console.log({ asd: sim.popJson });
			let tempJson = String(sim.popJson)
				.replace(/(\r\n|\n|\r|\t)/gm, '')
				.trim();
			console.log({ tempJson });
			const response = await runSimulation(JSON.parse(sim.popJson));

			console.log('RUN RESPONSE', response);
		} catch (err) {
			console.log(err);
		}
		dispatch(setBlinkers({ displayEditPage: false }));
		dispatch(setEditedSimulation(null));
	};
	return (
		<div ref={panelRef} className='edit-panel flex-column '>
			<div onClick={handleDismissChanges} className='close-icon'>
				{' '}
				close{' '}
			</div>
			<div className='entry'>
				<h3>Title</h3>
				<input
					value={
						isEditing === sim.id
							? editedSimulation.title
							: sim.title
					}
					onChange={(e) => setSimulationTitle(e, sim.id)}
				/>
			</div>

			<div className='entry'>
				<h3>Description</h3>
				<input
					className='text-12'
					value={
						isEditing === sim.id
							? editedSimulation.description
							: sim.description
					}
					onChange={(e) => setSimDescription(e, sim.id)}
				/>
			</div>
			<div className='entry '>
				<h3>PopJson</h3>
				<div className='flex-column json-entry '>
					<textarea
						className='text-12 lh-large '
						value={
							isEditing === sim.id
								? editedSimulation.popJson
								: sim.popJson
						}
						onChange={(e) => setSimPopJson(e, sim.id)}
					/>
					<JsonEditor />
					{error && <div>{error}</div>}
					{!error && jsonData && (
						<JSONPretty
							className='json-pretty'
							data={jsonData}
							theme='monokai'
							collapsed={false}
							displayDataTypes={false}
							displayObjectSize={false}
							enableClipboard={false}
						/>
					)}
				</div>
			</div>

			<div className='button-area'>
				{' '}
				<div
					onClick={handleSaveSimulationEdit}
					className='button sim-button save'
				>
					Save changes
				</div>
				<div
					onClick={handleModelRun}
					className='button sim-button parse'
				>
					Run
				</div>
				<div
					onClick={handleDismissChanges}
					className='button sim-button cancel'
				>
					Dismiss changes
				</div>
			</div>
		</div>
	);
}

export default SimulationEditPanel;
