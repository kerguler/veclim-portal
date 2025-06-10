import { render, screen } from '@testing-library/react';
import FloatPanel from '../components/FloatPanel';

test('Example 1 renders successfully', () => {
	render(<FloatPanel />);

	const element = screen.getByText('/Read More/i');

	expect(element).toBeInTheDocument();
});
