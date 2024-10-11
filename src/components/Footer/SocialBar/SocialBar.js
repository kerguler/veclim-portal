import mailIcon from "assets/images/mail-blue.webp";
import faceIcon from "assets/images/facebook-blue.webp";
import twitIcon from "assets/images/twitter-X.webp";
import linkIcon from "assets/images/linkedin-blue.webp";
import tubeIcon from "assets/images/youtube-blue.webp";
import LanguageChanger from "components/Footer/LanguageChanger/LanguageChanger";
import "./SocialBar.css";

function SocialBar() {
	return (
		<>
			<div className="icon-bar">
				<a
					href="https://www.facebook.com/veclim"
					target="_blank"
					rel="noreferrer"
				>
					<img alt="facebook" src={faceIcon} />
				</a>
				<a
					href="https://twitter.com/veclimCyI"
					target="_blank"
					rel="noreferrer"
				>
					<img alt="twitter" src={twitIcon} />
				</a>
				<a
					href="https://www.linkedin.com/company/veclim"
					target="_blank"
					rel="noreferrer"
				>
					<img alt="linkedin" src={linkIcon} />
				</a>
				<a
					href="https://www.youtube.com/@albopictus"
					target="_blank"
					rel="noreferrer"
				>
					<img alt="youtube" src={tubeIcon} />
				</a>
				<a href="mailto:k.erguler@cyi.ac.cy" target="_blank" rel="noreferrer">
					<img alt="mail" src={mailIcon} />
				</a>
				<LanguageChanger />
			</div>
		</>
	);
}

export default SocialBar;
