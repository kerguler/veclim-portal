import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './tooltip.css';

function composeHandlers(a, b) {
  return (e) => {
    a?.(e);
    b?.(e);
  };
}

const Tooltip = ({ children, label, placement = 'top', delay = 150 }) => {
  const childRef = useRef(null); // ref to the actual trigger DOM node
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timerRef = useRef(null);
  console.log('');
  const show = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    clearTimeout(timerRef.current);
    setOpen(false);
  };

  const updatePosition = () => {
    const el = childRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pad = 8;
    let top = rect.top - pad;
    let left = rect.left + rect.width / 2;

    if (placement === 'bottom') top = rect.bottom + pad;
    if (placement === 'left') {
      top = rect.top + rect.height / 2;
      left = rect.left - pad;
    }
    if (placement === 'right') {
      top = rect.top + rect.height / 2;
      left = rect.right + pad;
    }

    setCoords({ top, left });
  };

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open, placement, label]);

  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => updatePosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [open]);

  // If child is a React element, clone it and attach handlers+ref (no wrapper).
  if (React.isValidElement(children)) {
    const { onMouseEnter, onMouseLeave, ref: origRef } = children.props;

    const setRefs = (node) => {
      childRef.current = node;
      // preserve any original ref on the child
      if (typeof origRef === 'function') origRef(node);
      else if (origRef && typeof origRef === 'object') origRef.current = node;
    };

    return (
      <>
        {React.cloneElement(children, {
          ref: setRefs,
          onMouseEnter: composeHandlers(onMouseEnter, show),
          onMouseLeave: composeHandlers(onMouseLeave, hide),
        })}
        {open &&
          createPortal(
            <div
              className={`tt-portal tt-${placement}`}
              style={{ top: coords.top, left: coords.left }}
              role="tooltip"
            >
              <div className="tt-bubble">{label}</div>
            </div>,
            document.body
          )}
      </>
    );
  }

  // Fallback: if child is text/fragment, wrap minimally (no size assumptions).
  return (
    <>
      <span
        ref={childRef}
        className="tt-anchor"
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {children}
      </span>
      {open &&
        createPortal(
          <div
            className={`tt-portal tt-${placement}`}
            style={{ top: coords.top, left: coords.left }}
            role="tooltip"
          >
            <div className="tt-bubble">{label}</div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
