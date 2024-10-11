import { useEffect, useRef, useState } from "react";
import "./LanguageChanger.css";

function LanguageChanger() {
	const divEl = useRef();

	useEffect(() => {
		const handler = (event) => {
			if (!divEl.current) {
				return;
			}
			if (!divEl.current.contains(event.target)) {
				setLanBar(false);
			}
		};
		document.addEventListener("click", handler, true);
		return () => {
			document.removeEventListener("click", handler);
		};
	}, [divEl]);
	const [lanBar, setLanBar] = useState(false);

	const handleClickLanguage = () => {
		setLanBar((lanBar) => !lanBar);
		// console.log(lanBar);
	};

	const handleChangeLanguage = (event) => {
		setLanBar((lanBar) => !lanBar);
		// console.log("selected language", event.target.value);
		// i18n.changeLanguage(event.target.value);
	};

	const LanSelectBox = () => {
		return (
			<div ref={divEl} className="lan-select-box">
				<option
					value="en"
					onClick={handleChangeLanguage}
					className="lan-select-box-item">
					en
				</option>
				<option
					value="gr"
					onClick={handleChangeLanguage}
					className="lan-select-box-item">
					gr
				</option>
				<option
					value="tr"
					onClick={handleChangeLanguage}
					className="lan-select-box-item">
					tr
				</option>
			</div>
		);
	};

	return (
		<div className="lan-wrapper">
			<div className="lan-button disabled" onClick={handleClickLanguage}>
				EN
			</div>
			{lanBar && <LanSelectBox />}
		</div>
	);
}

export default LanguageChanger;
