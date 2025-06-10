import "./loginComponent.css";
import React, { useEffect, useState } from "react";
import veclimLogo from "assets/images/logos/VEClim-Logo-300px.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	setUsername,
	setPassword,
	setRememberLogin,
} from "store/slices/loginSlice";
import { get, useLoginMutation } from "store";
import { setApiRegisterResponse } from "store";
import { loginUser } from "../Services/backEndFunctions";
function LoginComponent() {
	const [displayWarning, setDisplayWarning] = useState({
		emailMessage: "",
		passwordMessage: "",
		confirmPasswordMessage: "",
		errorMessage: "",
		loginStatus: "",
	});
	const dispatch = useDispatch();
	const username = useSelector((state) => state.login.username);
	const password = useSelector((state) => state.login.password);
	const rememberLogin = useSelector((state) => state.login.rememberLogin);
	const [login] = useLoginMutation();

	useEffect(() => {
		const rememberLogin = localStorage.getItem("rememberLogin") === "true";
		const username = localStorage.getItem("username");
		const password = localStorage.getItem("password");
		if (rememberLogin && username && password) {
			dispatch(setUsername(username));
			dispatch(setPassword(password));
			dispatch(setRememberLogin(rememberLogin));
		}
	}, []);

	const handleUsernameChange = (e) => {
		dispatch(setUsername(e.target.value));
	};

	const handlePasswordChange = (e) => {
		dispatch(setPassword(e.target.value));
	};

	const handleRememberMeChange = (e) => {
		dispatch(setRememberLogin(e.target.checked));
		localStorage.setItem("rememberLogin", e.target.checked);
		localStorage.setItem("username", username);
		localStorage.setItem("password", password);
	};

	// function getCookie(name) {
	// 	// Parse `document.cookie` (all cookies in a single string)
	// 	const cookies = document.cookie.split(";");
	// 	console.log({ cookies });
	// 	for (let c of cookies) {
	// 		let cookie = c.trim();
	// 		// Check if this cookie string begins with the name we want:
	// 		if (cookie.startsWith(name + "=")) {
	// 			return cookie.substring(name.length + 1);
	// 		}
	// 	}
	// 	return null;
	// }

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await loginUser(login, { username, password });
			dispatch(
				setApiRegisterResponse({
					response: response,
					status: response.status,
					message: response.message,
					userName: username,
					userId: response.userId,
				}),
			);
			console.log({ response });
			localStorage.setItem("username", response.userName);

			localStorage.setItem("id", response.userId);
			// navigate("/ApiWelcome");
		} catch (err) {
			console.error("Failed to login:", err);
		}
	};

	return (
		<div className='login-base'>
			{/* <div className='login-logo'>
				{" "}
				<img alt='veclim-logo' src={veclimLogo}></img>{" "}
			</div> */}
			<div className='login-boxes'>
				<p>You must be logged in to run parameters</p>
				<form onSubmit={handleLogin}>
					<input
						className='email-field'
						// type='email'
						placeholder='username'
						value={username}
						onChange={handleUsernameChange}
						required
					/>
					<input
						className='password-field'
						type='password'
						placeholder='password'
						value={password}
						onChange={handlePasswordChange}
						required
					/>
					<br />
					<label className='checkbox-field'>
						<input
							type='checkbox'
							checked={rememberLogin}
							onChange={handleRememberMeChange}
						/>
						Remember me
					</label>

					<button
						className='login-submit-button'
						type='submit'
						// onClick={handleLogin}
					>
						Login
					</button>
				</form>
				<div>{displayWarning.message}</div>
			</div>
			{/* <div className='register-text'>
				If you don't have an account. You can get one from
				<Link to='/RegistrationPage'>here</Link>
			</div> */}
		</div>
	);
}

export default LoginComponent;
