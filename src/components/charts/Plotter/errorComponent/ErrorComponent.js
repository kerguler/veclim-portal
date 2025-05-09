function ErrorComponent({ text, errorcode }) {
	return (
		<div className='error-container'>
			<p>{text}</p>
		</div>
	);
}

export default ErrorComponent;
