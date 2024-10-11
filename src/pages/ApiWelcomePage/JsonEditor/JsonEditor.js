import "./JsonEditor.css";
import { useState } from "react";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
function JsonEditor() {
	const deneme = {
		model: {
			id: "model_vector08c",
		},
		data: {
			envir: {
				photoperiod: [],
				"2m_temperature": [],
				total_precipitation: [],
				popdens: [],
			},
			return_method: "stream",
		},
	};

	const [json, setJson] = useState({
		model: {
			id: "model_vector08c",
		},
		data: {
			envir: {
				photoperiod: [],
				"2m_temperature": [],
				total_precipitation: [],
				popdens: [],
			},
			return_method: "stream",
		},
	});

	return <Editor value={json} onChange={setJson} />;
}

export default JsonEditor;
