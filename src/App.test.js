import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  // const element = screen.getByText(/BREED_NAME/i);
  // expect(element).toBeInTheDocument();
});
