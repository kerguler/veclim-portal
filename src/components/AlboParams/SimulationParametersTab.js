import SliderRow from './SliderRow';
import SimDataMessenger from './SimDataMessenger';
export function SimulationParametersTab({ direction }) {
  return (
    <>
      <SliderRow direction={direction} />
      {/* <SimDataMessenger direction={direction} /> */}
    </>
  );
}
