import ToolTipComponent from 'components/ToolTipComponent/ToolTipComponent';
import './RiskIndicator.css';

function RiskIndicator({ props }) {
  return (
    <div className="risk-indicator-container">
      <h1>{props.name}</h1>{' '}
      <div className="risk-indicator-item">
        {' '}
        <ToolTipComponent label={props.text} placement="top">
          <div className={'risk-indicator-' + props.value} />
        </ToolTipComponent>
      </div>{' '}
    </div>
  );
}

function AccuracyIndicator({ props }) {
  var labels = [
    '?', //"Unknown",
    '~', //"Pending",
    '✔', //"Valid"
  ];
  return (
    <div className="risk-indicator-container">
      <h1>{props.name}</h1>
      <div className="risk-indicator-item">
        <div className={'risk-indicator-acc risk-indicator-acc-' + props.value}>
          <ToolTipComponent label={props.text}>
            {labels[props.value]}{' '}
          </ToolTipComponent>
        </div>
      </div>
    </div>
  );
}

export { RiskIndicator, AccuracyIndicator };
