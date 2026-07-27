import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as OkIcon } from 'assets/icons/django/done-icon.svg';
import { ReactComponent as DownloadIcon } from 'assets/icons/django/download-icon.svg';
import { ReactComponent as ErrorIcon } from 'assets/icons/django/fail-icon.svg';
import CircularSpinner from 'components/spinner/CircularSpinner';
import './statusIndicator.css';
import { useDispatch } from 'react-redux';
import ToolTipComponent from 'components/ToolTipComponent/ToolTipComponent';

const POPUP_WIDTH = 220;
const POPUP_MARGIN = 8;
const POPUP_GAP = 6;

function StatusIndicator({
  status,
  setDownloadResult,
  isFailureState,
  errorMessage,
}) {
  const [hovered, setHovered] = useState(false);
  const [showError, setShowError] = useState(false);
  const [popupPos, setPopupPos] = useState(null);
  const errorBtnRef = useRef(null);
  const dispatch = useDispatch();

  const openPopup = useCallback(() => {
    const rect = errorBtnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    let left = centerX - POPUP_WIDTH / 2;
    left = Math.max(
      POPUP_MARGIN,
      Math.min(left, window.innerWidth - POPUP_WIDTH - POPUP_MARGIN)
    );
    setPopupPos({ top: rect.bottom + POPUP_GAP, left });
    setShowError(true);
  }, []);

  const closePopup = useCallback(() => setShowError(false), []);

  useEffect(() => {
    if (!showError) return;
    window.addEventListener('scroll', closePopup, true);
    window.addEventListener('resize', closePopup);
    return () => {
      window.removeEventListener('scroll', closePopup, true);
      window.removeEventListener('resize', closePopup);
    };
  }, [showError, closePopup]);

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

  if (isFailureState || status === 'FAILURE' || status === 'FAILED') {
    const errorTrigger = (
      <span className="status-error-wrap">
        <button
          type="button"
          ref={errorBtnRef}
          className="status-btn"
          onClick={() => (showError ? closePopup() : openPopup())}
          aria-label="Show error details"
        >
          <ErrorIcon className="status-icon red" />
        </button>
        {showError &&
          popupPos &&
          createPortal(
            <div
              className="status-error-popup"
              role="tooltip"
              style={{ top: popupPos.top, left: popupPos.left }}
            >
              {errorMessage || 'The simulation failed.'}
            </div>,
            document.body
          )}
      </span>
    );

    // Only show the "click for error details" hover hint while the reason
    // popup isn't already open. The hint tooltip (ToolTipComponent) only
    // closes on mouseleave, not on click — if it stayed mounted while
    // showError is true, clicking to close the reason popup would close
    // THAT popup but leave the hint bubble sitting there (the mouse hasn't
    // moved), which looks exactly like "the popup won't turn off". Once
    // the reason is already showing, the hint is redundant anyway.
    if (showError) return errorTrigger;

    return (
      <ToolTipComponent
        placement="top"
        label="click for error details"
        delay={100}
      >
        {errorTrigger}
      </ToolTipComponent>
    );
  }

  if (status === 'SUCCESS' || status === 'COMPLETED') {
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
