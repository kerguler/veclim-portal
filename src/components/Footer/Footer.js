import LogoBar from "./LogoBar/LogoBar";
import SocialBar from "./SocialBar/SocialBar";
import "./Footer.css";

function Footer() {
	return (
		<div className="footer-container">
			<div className="footer">
				<LogoBar />
				<SocialBar />
			</div>
		</div>
	);
}

export default Footer;
