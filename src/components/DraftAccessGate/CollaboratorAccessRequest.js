import { useState } from 'react';
import { useRequestDraftAccessMutation } from 'store';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';
import { ALL_VECTORS } from 'vectors/registry';
import './DraftAccessGate.css';

// lets a logged-in, non-staff user ask for access to any draft vector,
// without first having to hit that vector's gated page
function CollaboratorAccessRequest({
  grantedVectorIds,
  pendingVectorIds,
  refetchIsStaff,
}) {
  const [requestDraftAccess, { isLoading }] = useRequestDraftAccessMutation();
  const { refresh: refreshCsrf } = useCsrf();
  const [justRequested, setJustRequested] = useState({});

  const seen = new Set();
  const draftVectors = ALL_VECTORS.filter((v) => {
    if (v.status !== 'draft') return false;
    if ((grantedVectorIds || []).includes(v.id)) return false;
    if (seen.has(v.id)) return false; // registry can list a vector more than once
    seen.add(v.id);
    return true;
  });

  if (draftVectors.length === 0) return null;

  const handleRequest = async (vectorId) => {
    try {
      await refreshCsrf();
      await requestDraftAccess(vectorId).unwrap();
      setJustRequested((prev) => ({ ...prev, [vectorId]: true }));
      refetchIsStaff?.();
    } catch (e) {
      // request failed, button stays so they can retry
    }
  };

  return (
    <div className="draft-access-card collaborator-access-request">
      <h2>Request collaborator access</h2>
      {draftVectors.map((vector) => {
        const isPending =
          justRequested[vector.id] || (pendingVectorIds || []).includes(vector.id);
        return (
          <div key={vector.id} className="collaborator-access-request__row">
            <span>
              {vector.shortLabel ||
                vector.label ||
                vector.meta?.methods?.label ||
                vector.id}
            </span>
            {isPending ? (
              <span className="draft-access-status">Pending review</span>
            ) : (
              <button
                type="button"
                className="draft-access-btn"
                onClick={() => handleRequest(vector.id)}
                disabled={isLoading}
              >
                Request access
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CollaboratorAccessRequest;
