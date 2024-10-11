import { useEffect } from "react";
import useCsrf from "pages/LoginRegister/Services/useCsrf";
import { useLogoutMutation } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCsrfToken } from "store";
import { logoutUser } from "pages/LoginRegister/Services/backEndFunctions";
import { setBlinkers } from "store";
import { setUser } from "store";
import "./HeadingComponent.css";
function HeadingComponent() {
	const dispatch = useDispatch();
	const [logout] = useLogoutMutation();
	const navigate = useNavigate();
	let username = localStorage.getItem("username");
	useCsrf(true);
	const blinkers = useSelector((state) => state.dashboard.blinkers);

	const handleLogout = async () => {
		try {
			const response = await logoutUser(logout);
			console.log(response);
			localStorage.removeItem("csrfToken");
			localStorage.removeItem("username");
			localStorage.removeItem("password");
			localStorage.removeItem("rememberLogin");
			dispatch(setCsrfToken(null));
			navigate("/login");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (username) {
			dispatch(setUser({ userName: username }));
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<div className="fixed heading-div  primary1">
			<div className=" flex-row center-v">
				<h1>API WELCOME PAGE </h1>
				{blinkers.displayUsername || <>user {username}</>}
				<div onClick={handleLogout} className="logout">
					Logout
				</div>
			</div>
		</div>
	);
}

export default HeadingComponent;
