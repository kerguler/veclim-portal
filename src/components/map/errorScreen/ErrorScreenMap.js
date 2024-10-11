import "./errorScreenMap.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import useOutsideClickClose from "../../../customHooks/useOutsideClickClose";
import { set } from "react-ga";
const ErrorScreenMap = ({ error }) => {
	const eRef = useRef();
	const [showErrorDetails, setShowErrorDetails] = useState(false);
	useOutsideClickClose(eRef, setShowErrorDetails);

	const handleErrorDetails = () => {
		setShowErrorDetails((showErrorDetails) => !showErrorDetails);
	};



	return (
		<div className="error-div-wrapper">
			<div className="error-inner-div">
				<h3>Ooops.. there was a slight error somewhere </h3>
				<p ref={eRef} onClick={handleErrorDetails}>
					details...
				</p>
				{showErrorDetails && <p>{error}</p>}
			</div>
		</div>
	);
};
export default ErrorScreenMap;
