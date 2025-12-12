import './PlainInfo.css';

function PlainInfo({ children }) {

  return (
    <>
        <div className="plain-container-wrap">
          <div className="plain-container">
            <div className="plain-text">{children}</div>
          </div>
        </div>
    </>
  );
}

export default PlainInfo;
