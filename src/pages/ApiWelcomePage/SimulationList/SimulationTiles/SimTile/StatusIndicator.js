import { useState } from 'react';
import { ReactComponent as OkIcon } from 'assets/icons/django/done-icon.svg';
import { ReactComponent as DownloadIcon } from 'assets/icons/django/download-icon.svg';
import { ReactComponent as ErrorIcon } from 'assets/icons/django/fail-icon.svg';
import CircularSpinner from 'components/spinner/CircularSpinner';
import './statusIndicator.css';
import { useDispatch } from 'react-redux';
import ToolTipComponent from 'components/ToolTipComponent/ToolTipComponent';

function StatusIndicator({ status, setDownloadResult }) {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  if (status === 'PENDING' || status === 'STARTED') {
    const isSmall =
      typeof window !== 'undefined' ? window.innerWidth < 500 : true;
    return (
      <ToolTipComponent placement="top" label="pending" delay={150}>
        <CircularSpinner
          size={isSmall ? 20 : 24} // match 20px / 24px
          strokeWidth={3}
          className="status-spinner"
        />
      </ToolTipComponent>
    );
  }

  if (status === 'FAILURE') {
    return (
      <ToolTipComponent placement="top" label="failure" delay={150}>
        <ErrorIcon className="status-icon red" />
      </ToolTipComponent>
    );
  }

  if (status === 'SUCCESS') {
    return (
      <ToolTipComponent
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
      </ToolTipComponent>
    );
  }

  return <div className="status-unknown">unknown</div>;
}

export default StatusIndicator;
