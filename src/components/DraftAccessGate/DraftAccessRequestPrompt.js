import { useState } from 'react';
import { useRequestDraftAccessMutation } from 'store';
import useCsrf from 'pages/LoginRegister/Services/useCsrf';
import useIsStaff from 'customHooks/useIsStaff';

function DraftAccessRequestPrompt({
  vectorId,
  vectorLabel,
  pendingVectorIds,
  refetchIsStaff,
}) {
  const [requestDraftAccess, { isLoading }] = useRequestDraftAccessMutation();
  const { refresh: refreshCsrf } = useCsrf();
  const [justRequested, setJustRequested] = useState(false);
  const { deniedVectors } = useIsStaff();

  const retryAfterDays = deniedVectors[vectorId] || 0;
  const isDenied = vectorId in deniedVectors && retryAfterDays > 0;
  const isPending =
    !isDenied && (justRequested || (pendingVectorIds || []).includes(vectorId));

  const handleRequest = async () => {
    try {
      await refreshCsrf();
      await requestDraftAccess(vectorId).unwrap();
      setJustRequested(true);
      refetchIsStaff?.();
    } catch (e) {
      // request failed, button stays so they can retry
    }
  };

  return (
    <div className="draft-access-card">
      <h2>Not available yet</h2>
      <p>{vectorLabel || vectorId} is still a draft model, not public yet.</p>

      {isDenied ? (
        <p className="draft-access-status draft-access-status--denied">
          Your request was declined. You can request again in {retryAfterDays}{' '}
          {retryAfterDays === 1 ? 'day' : 'days'}.
        </p>
      ) : isPending ? (
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
