import { useEffect } from 'react';

function IuBendaScripts({ id, type, children }) {
	const loadIubendaScript = () => {
		const existingScript = document.getElementById('iubenda-script');

		if (!existingScript) {
			const script = document.createElement('script');
			script.id = 'iubenda-script';
			script.src = 'https://cdn.iubenda.com/iubenda.js'; // Replace with the correct iubenda script URL

			script.async = true;

			document.body.appendChild(script);
		}
	};
	useEffect(() => {
		loadIubendaScript();
		return () => {};
	}, []);
	let typler;
	let url;
	if (type === 'privacy') {
		typler = 'Privacy Policy';
		url = `https://www.iubenda.com/privacy-policy/${id}`;
	} else if (type === 'cookie') {
		typler = 'Cookie Policy';
		url = `https://www.iubenda.com/privacy-policy/${id}/cookie-policy`;
	}
	const className = 'iubenda-white iubenda-noiframe iubenda-embed';

	return (
		<span style={{ marginRight: '5px' }}>
			<a title={typler} className={className} href={url}>
				{children}
			</a>
		</span>
	);
}

export default IuBendaScripts;
