function SimDate({ sim }) {
	const date = new Date(sim.created_at);
	// Helper to ensure two-digit formatting:
	const pad = (num) => String(num).padStart(2, "0");

	// If you want local time:
	const day = pad(date.getDate());
	const month = pad(date.getMonth() + 1);
	const year = String(date.getFullYear()).slice(-2); // last two digits
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());

	const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
	return (
		<div className='sim-date'>
			<p>{formattedDate}</p>
		</div>
	);
}

export default SimDate;
