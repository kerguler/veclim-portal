import { ALL_VECTORS } from 'vectors/registry';
import './DraftAccessGate.css';

function vectorLabel(vector) {
  return (
    vector.shortLabel || vector.label || vector.meta?.methods?.label || vector.id
  );
}

function dedupeById(vectors) {
  const seen = new Set();
  return vectors.filter((v) => {
    if (seen.has(v.id)) return false;
    seen.add(v.id);
    return true;
  });
}


function GrantedVectorsAccess({ isStaff, grantedVectorIds }) {
  const granted = isStaff
    ? dedupeById(ALL_VECTORS.filter((v) => v.status === 'draft'))
    : dedupeById(ALL_VECTORS.filter((v) => (grantedVectorIds || []).includes(v.id)));

  if (granted.length === 0) return null;

  return (
    <div className="draft-access-card collaborator-access-request">
      <h2>Vector access</h2>
      {isStaff && (
        <p className="draft-access-status">Full access to all draft vectors (staff)</p>
      )}
      {granted.map((vector) => (
        <div key={vector.id} className="collaborator-access-request__row">
          <span>{vectorLabel(vector)}</span>
          <span className="draft-access-status">Granted</span>
        </div>
      ))}
    </div>
  );
}

export default GrantedVectorsAccess;
