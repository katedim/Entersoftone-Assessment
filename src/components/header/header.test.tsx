import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
  it('renders the title and logo', () => {
    render(<Header />);
    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(screen.getByAltText('EnterSoftOne')).toBeInTheDocument();
  });
});
