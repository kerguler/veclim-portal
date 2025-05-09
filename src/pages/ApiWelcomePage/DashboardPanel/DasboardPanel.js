import './DashboardPanel.css';
function DashboardPanel({ flexNo, children }) {
	return (
		<div
			className='db-panel wrapper'
			style={
				flexNo === '0' ? { width: '30%' } : { flexGrow: `${flexNo}` }
			}
		>
			{children}
		</div>
	);
}

export default DashboardPanel;
