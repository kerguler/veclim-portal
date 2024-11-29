import "./errorScreenMap.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import useOutsideClickClose from "../../../customHooks/useOutsideClickClose";
import { useSelector } from "react-redux";
const ErrorScreenMap = () => {
	const directInitErrorLeft = useSelector(
		(state) => state.fetcher.fetcherStates.menu.left.directInitError
	);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		setTimeout((params) => {
			errorMessage && setErrorMessage(false);
		}, 5000);
	}, [errorMessage]);

	const eRef = useRef();
	const [showErrorDetails, setShowErrorDetails] = useState(false);
	useOutsideClickClose(eRef, setShowErrorDetails);

	const handleErrorDetails = () => {
		setShowErrorDetails((showErrorDetails) => !showErrorDetails);
	};

	return (
		directInitErrorLeft.isError && (
			<div className="error-div-wrapper">
				<div className="error-inner-div">
					<h3>Ooops.. there was a slight error somewhere </h3>
					<p ref={eRef} onClick={handleErrorDetails}>
						details...
					</p>
					{showErrorDetails && <p>{directInitErrorLeft.message}</p>}
				</div>
			</div>
		)
	);
};
export default ErrorScreenMap;
