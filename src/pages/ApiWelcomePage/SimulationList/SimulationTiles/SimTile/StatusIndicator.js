import { useState } from 'react';
import Tooltip from 'components/Tooltip/Tooltip';
import { ReactComponent as OkIcon } from 'assets/icons/django/done-icon.svg';
import { ReactComponent as DownloadIcon } from 'assets/icons/django/download-icon.svg';
import { ReactComponent as ErrorIcon } from 'assets/icons/django/fail-icon.svg';
import CircularSpinner from 'components/spinner/CircularSpinner';
import './statusIndicator.css';

function StatusIndicator({ status, setDownloadResult }) {
  const [hovered, setHovered] = useState(false);

  // Spinner branch (PENDING / STARTED)
  if (status === 'PENDING' || status === 'STARTED') {
    const isSmall =
      typeof window !== 'undefined' ? window.innerWidth < 500 : true;
    return (
      <Tooltip placement="top" label="pending" delay={150}>
        <CircularSpinner
          size={isSmall ? 20 : 24} // match 20px / 24px
          strokeWidth={3}
          className="status-spinner"
        />
      </Tooltip>
    );
  }

  // Failure branch
  if (status === 'FAILURE') {
    return (
      <Tooltip placement="top" label="failure" delay={150}>
        <ErrorIcon className="status-icon red" />
      </Tooltip>
    );
  }

  // Success branch (layered OK / Download, no reflow)
  if (status === 'SUCCESS') {
    return (
      <Tooltip
        placement="top"
        label={hovered ? 'download' : 'success'}
        delay={200}
      >
        <button
          type="button"
          className={`status-btn ${hovered ? 'is-hovered' : ''}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => hovered && setDownloadResult()} // call without arg
          aria-label={hovered ? 'Download results' : 'Success'}
        >
          <span className="status-icon-wrap">
            <OkIcon className="status-icon status-icon-layer ok green" />
            <DownloadIcon className="status-icon status-icon-layer download " />
          </span>
        </button>
      </Tooltip>
    );
  }

  return <div className="status-unknown">unknown</div>;
}

export default StatusIndicator;
