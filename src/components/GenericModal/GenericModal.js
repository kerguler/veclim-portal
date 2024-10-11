import ReactDOM from "react-dom";
import "./genericModal.css";
// import { AiOutlineCloseCircle } from "react-icons/ai/";
// import { IconContext } from "react-icons/lib";
function GenericModal({ onClose, title, content, accept, decline }) {
	const handleDismiss = () => {
		onClose(true);
	};

	return ReactDOM.createPortal(
		<div>
			<div onClick={handleDismiss} className="modal-background-generic"></div>

			<div className="modal-content-wrapper">
				<div className="modal-close-button" onClick={handleDismiss}></div>
				<div className="modal-content-generic">
					{" "}
					{title}
					{content}
				</div>
				<div className="modal-action-bar">
					{accept && (
						<div
							className="modal-button-generic accept"
							onClick={handleDismiss}
						>
							{" "}
							<p>Consent</p>
						</div>
					)}
					{decline && (
						<div
							className="modal-button-generic decline"
							onClick={handleDismiss}
						>
							<p>Consent</p>
						</div>
					)}
				</div>
			</div>
		</div>,
		document.querySelector(".modal-container")
	);
}

export default GenericModal;
