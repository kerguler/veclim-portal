import "./loginPage.css";
import React, { useEffect, useState } from "react";
import "./loginPage.css";
import veclimLogo from "assets/images/logos/VEClim-Logo-300px.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	setUsername,
	setPassword,
	setRememberLogin,
} from "store/slices/loginSlice";
import { Link } from "react-router-dom";
import { useLoginMutation } from "store";
import { setApiRegisterResponse } from "store";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/backEndFunctions";
import useCsrf from "../Services/useCsrf";
function LoginPage() {
	const navigate = useNavigate();

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

	useCsrf();
	useEffect(() => {
		const rememberLogin = localStorage.getItem("rememberLogin");
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
	const handleLogin = async () => {
		try {
			const response = await loginUser(login, { username, password });

			dispatch(
				setApiRegisterResponse({
					response: response,
					status: response.status,
					message: response.message,
					token: response.token,
					userName: username,
					userId: response.userId,
				})
			);
			console.log({ response });
			localStorage.setItem("username", response.userName);
			localStorage.setItem("id", response.userId);

			navigate("/ApiWelcome");
		} catch (err) {
			console.error("Failed to login:", err);
		}
	};

	return (
		<div className="login-base">
			<div className="login-logo">
				{" "}
				<img alt="veclim-logo" src={veclimLogo}></img>{" "}
			</div>
			<div className="login-boxes">
				<h3>Login Page</h3>
				<input
					className="email-field"
					type="email"
					placeholder="Email"
					value={username}
					onChange={handleUsernameChange}
					required
				/>
				<input
					className="password-field"
					type="password"
					placeholder="Password"
					value={password}
					onChange={handlePasswordChange}
					required
				/>
				<label className="checkbox-field">
					<input
						type="checkbox"
						checked={rememberLogin}
						onChange={handleRememberMeChange}
					/>
					Remember me
				</label>
				<button className="login-submit-button" onClick={handleLogin}>
					Login
				</button>
				<div>{displayWarning.message}</div>
			</div>
			<div className="register-text">
				{" "}
				If you don't have an account. You can get one from{" "}
				<Link to="/RegistrationPage">here</Link>
			</div>
		</div>
	);
}

export default LoginPage;
