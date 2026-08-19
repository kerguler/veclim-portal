import CookieConsent, {
	Cookies,
	getCookieConsentValue,
} from "react-cookie-consent";
import { useEffect } from "react";
import "./consentPlugin.css";

// const Modal = lazy(() => import("../Modal"));
import Modal from "./Modal/Modal";

const GTM_ID = "GTM-TTX96326";

function loadGTM() {
	if (window.dataLayer) return;
	window.dataLayer = [];
	window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
	const script = document.createElement("script");
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
	document.head.appendChild(script);
}

function CookieHandler() {
	useEffect(() => {
		const isConsent = getCookieConsentValue();
		if (isConsent === "true") {
			handleAcceptCookie();
		}
	}, []);
	const handleAcceptCookie = () => {
		loadGTM();
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
