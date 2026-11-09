import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getVector } from 'vectors/registry';
import './RouteNotice.css';

const SHOW_MS = 4500;

function RouteNotice() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!location.state?.unknownVector) return;
    const fallback = getVector('albopictus');
    const name = fallback?.shortLabel || fallback?.label || 'the default vector';
    const rawId = String(location.state.unknownVectorId || '').trim();
    const id = rawId.length > 30 ? `${rawId.slice(0, 30)}…` : rawId;
    setMessage(
      id
        ? `The vector "${id}" does not exist. Showing ${name} instead.`
        : `That vector doesn't exist. Showing ${name} instead.`
    );
    navigate(location.pathname + location.search, { replace: true, state: null });
  }, [location, navigate]);

  useEffect(() => {
    if (!message) return undefined;
    const t = setTimeout(() => setMessage(null), SHOW_MS);
    return () => clearTimeout(t);
  }, [message]);

  if (!message) return null;

  return (
    <div
      className="route-notice"
      role="status"
      onClick={() => setMessage(null)}
    >
      {message}
    </div>
  );
}

export default RouteNotice;
