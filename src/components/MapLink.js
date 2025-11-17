// components/MapLink.js
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setReadyToView } from 'store';

function MapLink({ session, tile, children, ...rest }) {
  const dispatch = useDispatch();

  const to =
    tile != null
      ? `/MapPage?session=${session}&tile=${tile}`
      : `/MapPage?session=${session}`;

  const handleClick = (e) => {
    // if the parent wants to do something too, let it
    if (rest.onClick) {
      rest.onClick(e);
    }

    // tell the app we're about to change view; map will re-enable readyToView
    // once useFetcherStates finishes loading tiles/panels.
    dispatch(setReadyToView(false));
  };

  return (
    <Link {...rest} to={to} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default MapLink;
