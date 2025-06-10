import { useEffect, useState } from "react";
import ToolTip from "components/Tooltip/ToolTip";
import { ReactComponent as OkIcon } from "assets/icons/django/done-icon.svg";
import { ReactComponent as ErrorIcon } from "assets/icons/django/fail-icon.svg";
import { ReactComponent as PendingIcon } from "assets/icons/django/pending-icon.svg";
import { ReactComponent as DownloadIcon } from "assets/icons/django/download-icon.svg";
import { useRef } from "react";
function StatusIndicator({ status, setDownloadResult }) {
	const iconRef = useRef(null);
	let displayedContent = null;
	const [displayDownloadIcon, setDisplayDownloadIcon] = useState(false);
	const handleSuccessClick = () => {
		setDownloadResult(true);
	};

	const handleMouseOver = () => {
		setDisplayDownloadIcon(true);
	};

	if (status === "PENDING") {
		displayedContent = (
			<div className='tooltip-element'>
				<ToolTip>pending</ToolTip>
				<PendingIcon className='sim-icon icon-img blue' />
			</div>
		);
	} else if (status === "SUCCESS") {
		displayedContent = (
			<div
				className='tooltip-element'
				onMouseEnter={() => setDisplayDownloadIcon(true)}
				onMouseLeave={() => setDisplayDownloadIcon(false)}
			>
				<ToolTip>
					{displayDownloadIcon ? "download" : "success"}
				</ToolTip>

				<OkIcon
					className={`sim-icon icon-img green ${displayDownloadIcon ? "hidden" : ""}`}
				/>
				<DownloadIcon
					onClick={handleSuccessClick}
					className={`sim-icon icon-img ${displayDownloadIcon ? "" : "hidden"}`}
				/>
			</div>
		);
	} else if (status === "FAILURE") {
		displayedContent = (
			<div className='tooltip-element'>
				<ToolTip>failure</ToolTip>
				<ErrorIcon className='sim-icon icon-img red' />
			</div>
		);
	} else if (status === "STARTED") {
		displayedContent = (
			<div className='tooltip-element'>
				<ToolTip>Started</ToolTip>
				<PendingIcon className='sim-icon icon-img blue' />
			</div>
		);
	} else {
		return <div>unknown status</div>;
	}
	return displayedContent;
}

export default StatusIndicator;
