import CookieConsent, {
	Cookies,
	getCookieConsentValue,
} from "react-cookie-consent";
import { useEffect, useState } from "react";
import "./consentPlugin.css";

import Modal from "./Modal/Modal";

const GTM_ID = "GTM-TTX96326";
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

function loadGTM() {
	if (window.dataLayer) return;
	window.dataLayer = [];
	window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
	const script = document.createElement("script");
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
	document.head.appendChild(script);
}

function clearAnalyticsCookies() {
	const host = window.location.hostname;
	const parts = host.split(".");
	const domains = [undefined, host, "." + host];
	if (parts.length > 2) domains.push("." + parts.slice(-2).join("."));
	document.cookie
		.split(";")
		.map((c) => c.split("=")[0].trim())
		.filter((name) => /^(_ga|_gid|_gat)/.test(name))
		.forEach((name) => {
			domains.forEach((domain) => {
				Cookies.remove(name, domain ? { path: "/", domain } : { path: "/" });
			});
		});
}

function CookieHandler() {
	const [visible, setVisible] = useState("byCookieValue");

	useEffect(() => {
		const isConsent = getCookieConsentValue();
		if (isConsent === "true") {
			loadGTM();
		}
		const open = () => setVisible("show");
		window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
		return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
	}, []);

	const handleAcceptCookie = () => {
		loadGTM();
		setVisible("byCookieValue");
	};

	const handleDeclineCookie = () => {
		const trackingWasLoaded = Boolean(window.dataLayer);
		clearAnalyticsCookies();
		setVisible("byCookieValue");
		if (trackingWasLoaded) window.location.reload();
	};

	return (
		<CookieConsent
			visible={visible}
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
