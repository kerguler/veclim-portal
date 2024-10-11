import CookieConsent, {
	Cookies,
	getCookieConsentValue,
} from "react-cookie-consent";
import { useEffect } from "react";
import * as ReactGA from "react-ga";
import "./consentPlugin.css";

// const Modal = lazy(() => import("../Modal"));
import Modal from "./Modal/Modal";
function CookieHandler() {
	useEffect(() => {
		const isConsent = getCookieConsentValue();
		if (isConsent === "true") {
			handleAcceptCookie();
		}
	}, []);
	const handleAcceptCookie = () => {
		ReactGA.initialize("GTM-TTX96326");
	};
	const handleDeclineCookie = () => {
		Cookies.remove("_ga");
		Cookies.remove("_gat");
		Cookies.remove("_gid");
	};

	return (
		<CookieConsent
			declineButtonText="Decline"
			buttonText="Consent"
			declineButtonClasses="decline"
			buttonClasses="button-consent"
			enableDeclineButton
			onAccept={handleAcceptCookie}
			onDecline={handleDeclineCookie}
		>
			<Modal></Modal>
		</CookieConsent>
	);
}

export default CookieHandler;
