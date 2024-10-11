import "./ToolTip.css";
function ToolTip({ children }) {
  return (
    <div className="tooltip">
      <div >{children}</div>
    </div>
  );
}

export default ToolTip;
