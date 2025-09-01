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
import Tooltip from 'components/Tooltip/Tooltip';
import './SearchLocationIcon.css';
import { useEffect, useRef } from 'react';
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
      <Tooltip label="Search among some capitals" placement="top">
        <img
          alt="search-icon"
          className="locate-me-icon"
          onClick={handleSearchIconClick}
          src={searchIcon}
        />{' '}
      </Tooltip>

      {/* <ToolTip>Search among some capitals</ToolTip> */}
      {searchBarState && <LiveSearchCaps />}
    </div>
  );
}

export default SearchLocationIcon;
