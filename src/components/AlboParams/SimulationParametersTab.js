import SliderRow from './SliderRow';
import SimDataMessenger from './SimDataMessenger';
import SwitcherArrows from 'components/panel/SwitcherArrows';
export function SimulationParametersTab({ direction }) {
  return (
    <>

      <SliderRow direction={direction} />
      <SimDataMessenger direction={direction} />
    </>
  );
}
