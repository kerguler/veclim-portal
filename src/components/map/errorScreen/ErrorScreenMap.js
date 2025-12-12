import "./errorScreenMap.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import useOutsideClickClose from "../../../customHooks/useOutsideClickClose";
import { useDispatch } from "react-redux";
import { setDirectInitError } from "store";
import useDirectorFun from "customHooks/useDirectorFun";
const ErrorScreenMap = () => {
	const dispatch = useDispatch();
	const { directInitError, tileArray } = useDirectorFun("left");

	const [errorMessage, setErrorMessage] = useState(null);

	const [counter, setCounter] = useState(10);

	const eRef = useRef();
	const [showErrorDetails, setShowErrorDetails] = useState(false);
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	useOutsideClickClose(eRef, setShowErrorMessage);
useEffect(() => {
		if (directInitError.isError) {
			setShowErrorMessage(true);
		}
}, [directInitError.isError]);

	const handleErrorDetails = () => {
		setShowErrorDetails((showErrorDetails) => !showErrorDetails);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCounter((prev) => {
				if (prev === 1) {
					dispatch(
						setDirectInitError({
							direction: "left",
							value: { isError: false, message: "", type: "" },
						}),
					);
					clearInterval(interval);
				}
				return prev - 1;
			});
		}, 1000);
		showErrorMessage || clearInterval(interval);
		// Cleanup when component unmounts
		return () => clearInterval(interval);
	}, [dispatch, showErrorMessage]);

	useEffect(() => {
		if (counter === 0) {
			dispatch(
				setDirectInitError({
					direction: "left",
					value: { isError: false, message: "", type: "" },
				}),
			);
		}
	}, [counter,dispatch]);

	let tileNames = tileArray.map((item) => {
		return item + "  ";
	});

	let message = directInitError.message;

	return (
		directInitError.isError &&
		showErrorMessage && (
			<div ref={eRef} className='error-div-wrapper'>
				<div className='error-inner-div'>
					<h3>Ooops.. there was a slight error somewhere </h3>
					<p onClick={handleErrorDetails}>details...</p>
					{showErrorDetails && (
						<div>
							<h1>
								There was an Error with your request :{" "}
								{directInitError.type}
							</h1>
							<br />
							<h2>{message.heading}</h2> <br />
							<p>{message.explanation}</p>
							<br />
							You are being redirected to {tileNames},
							<br />
							<br />
							This message will self destruct if you dont... in{" "}
							{counter} seconds
						</div>
					)}
				</div>
			</div>
		)
	);
};
export default ErrorScreenMap;
