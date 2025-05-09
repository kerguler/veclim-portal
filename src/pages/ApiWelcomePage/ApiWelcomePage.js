import { useSelector } from 'react-redux';
import './ApiWelcomePage.css';
import './base-styles.css';
import AddSimulation from './AddSimulation/AddSimulation';
import SimulationList from './SimulationList/SimulationList';
import InfoPanel from './InfoPanel/InfoPanel';
import HeadingComponent from './Heading/HeadingComponent';
import DashboardPanel from './DashboardPanel/DasboardPanel';
function ApiWelcomePage() {
	const blinkers = useSelector((state) => state.dashboard.blinkers);
	const user = useSelector((state) => state.dashboard.user);

	return (
		<div className='welcome-wrapper'>
			<HeadingComponent />

			<div className='margin-t13 flex-row full-width '>
				<DashboardPanel flexNo='0'>
					<InfoPanel />
				</DashboardPanel>
				{blinkers.displaySimList && (
					<DashboardPanel flexNo='1'>
						<SimulationList username={user.username} />
					</DashboardPanel>
				)}
				{blinkers.displayVEClimModelList && (
					<DashboardPanel flexNo='1'>
						<SimulationList username={user.username} />
					</DashboardPanel>
				)}

				{blinkers.displayAddSimulation && (
					<DashboardPanel flexNo='1'>
						<AddSimulation />
					</DashboardPanel>
				)}
				{blinkers.displayAddVEClimModel && (
					<DashboardPanel flexNo='1'>
						<AddSimulation />
					</DashboardPanel>
				)}
			</div>
		</div>
	);
}

export default ApiWelcomePage;
