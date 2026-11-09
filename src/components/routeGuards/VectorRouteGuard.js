import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { hasVector } from 'vectors/registry';

const FALLBACK_VECTOR = 'albopictus';
const noticeState = (id) => ({ unknownVector: true, unknownVectorId: id });

export function MethodsRouteGuard({ children }) {
  const { vecId } = useParams();
  if (vecId && !hasVector(vecId)) {
    return (
      <Navigate
        to={`/Methods/${FALLBACK_VECTOR}`}
        replace
        state={noticeState(vecId)}
      />
    );
  }
  return children;
}

export function MapRouteGuard({ children }) {
  const [params] = useSearchParams();
  const id = params.get('session');
  if (id && !hasVector(id)) {
    return (
      <Navigate
        to={`/MapPage?session=${FALLBACK_VECTOR}`}
        replace
        state={noticeState(id)}
      />
    );
  }
  return children;
}
