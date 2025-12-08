// MethodsNavItem.js
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getVector } from 'vectors/registry';
import './hoverMenuMethods.css'; // reuse styles if you like

const MethodsNavItem = ({ onClose }) => {
  const navigate = useNavigate();

  // this is the same slice you already use in LeftPanel
  const vectorName = useSelector(
    (state) => state.fetcher.fetcherStates.vectorName
  );

  const handleClick = () => {
    const vec = getVector(vectorName);
    const route =
      vec?.meta?.methods?.route || `/Methods/${vectorName || 'default'}`;

    if (onClose) onClose(false);
    navigate(route);
  };

  return (
    <div className="hover-menu-wrapper">
      <div
        type="button"
        className="navbar-link" style={{cursor:"pointer"}} // whatever class you use for other items
        onClick={handleClick}
      >
        METHODS
      </div>
    </div>
  );
};

export default MethodsNavItem;
