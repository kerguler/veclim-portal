import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
	name: "login",
	initialState: {
		username: "",
		password: "",
		rememberLogin: false,
		csrfToken: "",
		details: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		apiRegisterResponse: {
			response: null,
			status: "",
			message: "",
			// token: '',
			userName: "",
			userId: null,
		},
	},
	reducers: {
		setCsrfToken(state, action) {
			state.csrfToken = action.payload;
		},
		setApiRegisterResponse(state, action) {
			state.apiRegisterResponse = action.payload;
		},
		setDetails(state, action) {
			state.details = action.payload;
		},
		setUsername(state, action) {
			state.username = action.payload;
		},
		setPassword(state, action) {
			state.password = action.payload;
		},
		setRememberLogin(state, action) {
			state.rememberLogin = action.payload;
		},
	},
});

export const {
	setUsername,
	setPassword,
	setRememberLogin,
	setDetails,
	setApiRegisterResponse,
	setCsrfToken,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
