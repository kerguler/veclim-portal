import { useDispatch, useSelector } from "react-redux";
import "./RegistrationPage.css";
import veclimLogo from "assets/images/logos/VEClim-Logo-300px.png";
import { setDetails } from "store";
import { useState } from "react";
import LoginRegisterService from "../Services/LoginRegisterService";
import { useRegisterMutation } from "store";
import { setApiRegisterResponse } from "store";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/backEndFunctions";
import { setCsrfToken } from "store";
import useCsrf from "../Services/useCsrf";
function RegistrationPage() {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const [displayWarning, setDisplayWarning] = useState({
		emailMessage: "",
		passwordMessage: "",
		confirmPasswordMessage: "",
		errorMessage: "",
		loginStatus: "",
	});

	const registrationResponse = useSelector(
		(state) => state.login.apiRegisterResponse
	);
	const details = useSelector((state) => state.login.details);
	const { firstName, lastName, username, email, password, confirmPassword } =
		details;

	const [
		register,
		{ data: registerData, isLoading: registerLoading, error: registerError },
	] = useRegisterMutation();

	useCsrf();
	
	const handleRegisterStart = async () => {
		try {
			const response = await registerUser(register, details);
			dispatch(setCsrfToken(null));
			dispatch(
				setApiRegisterResponse({
					...registrationResponse,
					userName: response.username,
				})
			);
			setDisplayWarning({
				...displayWarning,
				errorMessage: "",
			});
			navigate("/login");
		} catch (err) {
			console.error("Failed to register:", err);
			console.log(err.data.username[0]);
			setDisplayWarning({
				...displayWarning,
				errorMessage: err.data.username[0],
			});
		}

	
	};

	const onEmailChange = (e) => {
		dispatch(setDetails({ ...details, email: e.target.value }));
		if (!LoginRegisterService.validateEmail(e.target.value)) {
			console.log("Invalid Email");
			setDisplayWarning({ ...displayWarning, emailMessage: "invalid email" });
		} else {
			setDisplayWarning({ ...displayWarning, emailMessage: "" });
		}
	};
	const onPasswordChange = (e) => {
		dispatch(setDetails({ ...details, password: e.target.value }));
		if (password === "") {
			setDisplayWarning({
				...displayWarning,
				passwordMessage: "Password is required",
			});
		} else if (password.length < 8) {
			setDisplayWarning({
				...displayWarning,
				passwordMessage: "Password must be at least 8 characters long",
			});
		} else {
			setDisplayWarning({ ...displayWarning, passwordMessage: "" });
		}
	};
	const onConfirmPasswordChange = (e) => {
		dispatch(setDetails({ ...details, confirmPassword: e.target.value }));
		if (e.target.value !== password) {
			setDisplayWarning({
				...displayWarning,
				confirmPasswordMessage: "Passwords do not match",
			});
		} else {
			setDisplayWarning({ ...displayWarning, confirmPasswordMessage: "" });
		}
	};

	return (
		<div className="registration-page-wrapper">
			<div className="logo-div">
				<img alt="logo" src={veclimLogo}></img>
			</div>
			<h1>Registration Form</h1>{" "}
			<div>
				<input
					value={firstName}
					type="text"
					placeholder="First Name"
					onChange={(e) =>
						dispatch(setDetails({ ...details, firstName: e.target.value }))
					}
					required
				></input>
			</div>
			<div>
				<input
					value={lastName}
					type="text"
					placeholder="Last Name"
					onChange={(e) =>
						dispatch(setDetails({ ...details, lastName: e.target.value }))
					}
					required
				></input>
			</div>
			<div>
				<input
					onChange={(e) =>
						dispatch(setDetails({ ...details, username: e.target.value }))
					}
					value={username}
					type="text"
					placeholder="Username"
					required
				></input>
			</div>
			<div className="message-row">
				<input
					onChange={(e) => onEmailChange(e)}
					value={email}
					type="email"
					placeholder="email"
					required
				></input>

				<div className="message"> {displayWarning.emailMessage}</div>
			</div>
			<div className="message-row">
				<input
					onChange={(e) => onPasswordChange(e)}
					value={password}
					type="password"
					placeholder="Password"
					required
				></input>{" "}
				<div className="message"> {displayWarning.passwordMessage}</div>
			</div>
			<div className="message-row">
				<input
					onChange={(e) => onConfirmPasswordChange(e)}
					value={confirmPassword}
					type="password"
					placeholder="Confirm Password"
					required
				></input>
				<div className="message"> {displayWarning.confirmPasswordMessage}</div>
			</div>
			<label onClick={handleRegisterStart} className="registration-label">
				<div className="register-submit-button">
					{registerLoading ? <p>Loading...</p> : <p>Register</p>}
					{registerData && <p>Logging in...</p>}
				</div>
			</label>
			<div>{displayWarning.loginStatus}</div>
			<div>{displayWarning.errorMessage}</div>
		</div>
	);
}

export default RegistrationPage;
