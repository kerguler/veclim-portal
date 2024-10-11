import logoCyI from "assets/images/logos/logoCyI.png";
import logoCAREC from "assets/images/logos/logoEMME-CARE.png";
import logoWT from "assets/images/logos/logoWellcomeTrust.png";
import "./LogoBar.css";

function LogoBar() {
	return (
		<>
			<div className="footer-logo-div">
				<a
					className="logo"
					href="https://cyi.ac.cy"
					target="_blank"
					rel="noreferrer"
				>
					<img alt="CyI" src={logoCyI} />
				</a>
				<a
					className="logo"
					href="https://emme-care.cyi.ac.cy"
					target="_blank"
					rel="noreferrer"
				>
					<img alt="EMME-CARE" src={logoCAREC} />
				</a>
				<a
					className="logo"
					href="https://wellcome.org"
					target="_blank"
					rel="noreferrer"
				>
					<img alt="Wellcome Trust" src={logoWT} />
				</a>
			</div>
		</>
	);
}

export default LogoBar;
