import './RiskIndicator.css';

import Tooltip from 'components/ToolTipComponent/ToolTipComponent';

function RiskIndicator({ props }) {
  return (
    <div className="risk-indicator-container">
      <h1>{props.name}</h1>{' '}
      <div className="risk-indicator-item">
        {' '}
        <Tooltip label={props.text} placement="top">
          <div className={'risk-indicator-' + props.value} />
        </Tooltip>
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
          <Tooltip label={props.text}>{labels[props.value]} </Tooltip>
        </div>
      </div>
    </div>
  );
}

export { RiskIndicator, AccuracyIndicator };
