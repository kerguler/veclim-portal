// HoverMenuMethods.js
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './hoverMenuMethods.css';
import { useSelector } from 'react-redux';
import { getVector } from 'vectors/registry';

const HoverMenuMethods = ({ mainDivRef, onClose }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  const vectorNames = useSelector((state) => state.vector.vectorNames);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    onClose(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOnDoc = (event) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('click', handleClickOnDoc, true);
    return () => {
      window.removeEventListener('click', handleClickOnDoc, true);
    };
  }, []);

  // 🔑 Deduplicate vector ids once
  const uniqueVectorIds = useMemo(
    () => Array.from(new Set(vectorNames)),
    [vectorNames]
  );

  // Build menu items from registry/meta
  const methodItems = uniqueVectorIds
    .map((id) => {
      const vec = getVector(id);
      const methods = vec?.meta?.methods;
      if (!methods || !methods.route || !methods.label) return null;
      return {
        id,
        route: methods.route,
        label: methods.label,
      };
    })
    .filter(Boolean);

  return (
    <div ref={menuRef} className="hover-menu-wrapper">
      <div onClick={handleMenuToggle} style={{ cursor: 'pointer' }}>
        METHODS
      </div>
      {isMenuOpen && methodItems.length > 0 && (
        <div className="hover-menu">
          {methodItems.map((item) => (
            <Link key={item.id} onClick={handleLinkClick} to={item.route}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HoverMenuMethods;
