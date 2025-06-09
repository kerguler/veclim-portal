import React, { useState, useRef, useLayoutEffect } from "react";
import "./MoreText.css";

const MoreText = ({ children, maxHeight = 24 }) => {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const contentRef = useRef();

  useLayoutEffect(() => {
    if (contentRef.current) {
      setOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, [children, maxHeight]);

  return (
    <>
      <div
        ref={contentRef}
        style={{
          maxHeight: expanded ? "none" : maxHeight,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        {children}
      </div>
      {overflowing && (
        <p>
        <a
          onClick={() => setExpanded(!expanded)}
          className="more-text"
        >
          {expanded ? "...less" : "...more"}
        </a>
        </p>
      )}
    </>
  );
};

export default MoreText;
