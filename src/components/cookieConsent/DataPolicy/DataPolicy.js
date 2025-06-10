import './dataPolicy.css';
function DataPolicy() {
	return (
		<span className='data-policy-wrapper'>
			<span className='data-policy-button'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='32'
					height='32'
					viewBox='0 0 35 35'
				>
					<path
						fill='#1CC691'
						fillRule='evenodd'
						d='M16 7a4 4 0 0 1 2.627 7.016L19.5 25h-7l.873-10.984A4 4 0 0 1 16 7z'
					/>
				</svg>

				<span className='data-policy-white data-policy-embed'>
					{' '}
					data policy{' '}
				</span>
			</span>
		</span>
	);
}
export default DataPolicy;
