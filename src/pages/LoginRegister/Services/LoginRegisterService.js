import { setApiRegisterResponse } from "store";
import { store } from "store";
class LoginRegisterService {
	static validateEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}


	
}

export default LoginRegisterService;
