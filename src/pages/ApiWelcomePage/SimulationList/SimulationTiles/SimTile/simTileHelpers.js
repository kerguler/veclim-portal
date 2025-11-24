import { setDisplaySimulationPanel } from 'store';
import { setPanelInterfere } from 'store';
import { setDataArrived } from 'store';
import { setInvalidateSimData } from 'store';

class simTileHelpers {
  static handleDownload = (result) => {
    try {
      const fileContent = JSON.stringify(result, null, 2);
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${result.id}_download.txt`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  static handleDeleteSimulation = async (deleteSimulation, id) => {
    console.log('delete', id);
    try {
      const response = deleteSimulation({ id: id });
    } catch (err) {
      console.log(err);
    }
  };

  static handleViewSimulationResults = async (
    results,
    setSimResult,
    dispatch,
    direction
  ) => {
    setSimResult(results);
    dispatch(setInvalidateSimData(false));
    dispatch(setDataArrived({ direction: direction, value: true }));
    dispatch(
      setDisplaySimulationPanel({
        direction: direction,
        // value: "activity_forecast",
        value: 'activity_forecast',
      })
    );
    dispatch(setPanelInterfere({ direction, value: -1 }));
  };
}
export default simTileHelpers;
