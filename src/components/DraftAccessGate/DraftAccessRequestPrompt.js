import { useState } from 'react';
import { useRequestDraftAccessMutation } from 'store';

function DraftAccessRequestPrompt({
  vectorId,
  vectorLabel,
  pendingVectorIds,
  refetchIsStaff,
}) {
  const [requestDraftAccess, { isLoading }] = useRequestDraftAccessMutation();
  const [justRequested, setJustRequested] = useState(false);

  const isPending = justRequested || (pendingVectorIds || []).includes(vectorId);

  const handleRequest = async () => {
    try {
      await requestDraftAccess(vectorId).unwrap();
      setJustRequested(true);
    } catch (e) {
      // request failed, button stays so they can retry
    }
  };

  return (
    <div className="draft-access-card">
      <h2>Not available yet</h2>
      <p>{vectorLabel || vectorId} is still a draft model, not public yet.</p>

      {isPending ? (
        <p className="draft-access-status">Request sent, pending review.</p>
      ) : (
        <button
          type="button"
          className="draft-access-btn"
          onClick={handleRequest}
          disabled={isLoading}
        >
          {isLoading ? 'Requesting…' : 'Request collaborator access'}
        </button>
      )}

      <button type="button" className="draft-access-link" onClick={refetchIsStaff}>
        Check again
      </button>
    </div>
  );
}

export default DraftAccessRequestPrompt;
