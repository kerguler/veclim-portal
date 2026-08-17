function ErrorComponent({ text, errorcode, onRetry }) {
	return (
		<div className='error-container'>
		<div>
				<p>{text}</p>
				{onRetry && (
					<button type='button' className='error-retry' onClick={onRetry}>
						Retry
					</button>
				)}
			</div>
		</div>
	);
}

export default ErrorComponent;
