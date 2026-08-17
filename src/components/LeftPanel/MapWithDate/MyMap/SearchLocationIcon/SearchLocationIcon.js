// import { IconContext } from "react-icons/lib";
// import { AiOutlineSearch } from "react-icons/ai";
import searchIcon from 'assets/icons/search_icon.png';
import LiveSearchCaps from 'components/LeftPanel/MapWithDate/MyMap/SearchLocationIcon/LiveSearchCaps/LiveSearchCaps';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleShowSearchBar,
  setShowSearchBar,
  setLocationRequested,
} from 'store';
import ToolTipComponent from 'components/ToolTipComponent/ToolTipComponent';
import './SearchLocationIcon.css';
import { useEffect, useRef } from 'react';

// If the network drops mid-load before this icon's own request finishes,
// the browser shows the native "broken image" glyph plus the alt text
// spilling out next to it. Swap to a small inline SVG (no network needed)
// instead of leaving that broken state on screen.
const SEARCH_ICON_FALLBACK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
  );

function SearchLocationIcon() {
  //TODO: handle the closing of the settings menu
  const dispatch = useDispatch();

  const searchBarState = useSelector((state) => {
    return state.searchBar.showSearchBar;
  });
  const searchContainerRef1 = useRef(null);
  const handleSearchIconClick = (event) => {
    event.stopPropagation();
    dispatch(toggleShowSearchBar());
    dispatch(setLocationRequested(false));
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      event.stopPropagation();
      if (searchContainerRef1.current) {
        const bounds = searchContainerRef1.current.getBoundingClientRect();
        const isBeyondBounds =
          event.clientX < bounds.left ||
          event.clientX > bounds.right + 30 ||
          event.clientY < bounds.top - 30 ||
          event.clientY > bounds.bottom + 30;
        if (isBeyondBounds) {
          dispatch(setShowSearchBar(false));
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dispatch]);
  return (
    <div ref={searchContainerRef1} className="search-icon">
      <ToolTipComponent label="Search among some capitals" placement="top">
        <img
          alt="search-icon"
          className="locate-me-icon"
          onClick={handleSearchIconClick}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = SEARCH_ICON_FALLBACK;
          }}
          src={searchIcon}
        />{' '}
      </ToolTipComponent>

      {searchBarState && <LiveSearchCaps />}
    </div>
  );
}

export default SearchLocationIcon;
