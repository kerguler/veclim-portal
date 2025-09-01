// components/Spinner/CircularSpinner.js
import React, { forwardRef } from 'react';
import './spinner.css';

const CircularSpinner = forwardRef(function CircularSpinner(
  { size = 24, strokeWidth = 3, className = '', label = 'Loading…', ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={`spinner ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label={label}
      {...rest} // <-- pass onMouseEnter/Leave etc. from Tooltip
    >
      <svg
        className="spinner__svg"
        viewBox="0 0 50 50"
        focusable="false"
        aria-hidden="true"
      >
        <circle
          className="spinner__track"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          opacity="0.2"
          strokeWidth={strokeWidth}
        />
        <circle
          className="spinner__arc"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
});

export default CircularSpinner;
