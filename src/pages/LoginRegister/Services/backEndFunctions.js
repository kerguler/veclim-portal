
export const registerUser = async (registerMutation, userData) => {
	try {
		const response = await registerMutation(userData).unwrap();
		return response;
	} catch (error) {
		console.error("Failed to register:", error);
		throw error;
	}
};

export const loginUser = async (loginMutation, userData) => {
	try {
		const response = await loginMutation(userData).unwrap();
		return response;
	} catch (error) {
		console.error("Failed to login:", error);
		throw error;
	}
};
export const logoutUser = async (logout) => {
	try {
		const response = await logout().unwrap();
		return response;
	} catch (error) {
		console.error("Failed to logout:", error);
		throw error;
	}
};
