import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../../features/employees/employeeSlice';
import EmployeesTable from './employeesTable';
import { BrowserRouter } from 'react-router-dom';

const mockEmployees = [
  {
    id: 1,
    fullName: 'Michael Scott',
    department: 'Management',
    email: 'michael.scott@dundermifflin.com',
    status: 'available',
    hireDate: new Date('2005-04-15'),
    notes: 'Regional Manager, World\'s Best Boss',
    image: '/images/michael_scott.jpg',
  },
  {
    id: 2,
    fullName: 'Dwight Schrute',
    department: 'Sales',
    email: 'dwight.schrute@dundermifflin.com',
    status: 'busy',
    hireDate: new Date('2003-06-01'),
    notes: 'Assistant to the Regional Manager',
    image: '/images/dwight_schrute.jpg',
  },
];

function renderWithProviders() {
  const store = configureStore({
    reducer: { employees: employeeReducer },
    preloadedState: {
      employees: {
        employees: mockEmployees,
        status: 'succeeded'  as 'succeeded',
        search: '',
        department: '',
        error: null,
      },
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <EmployeesTable />
      </BrowserRouter>
    </Provider>
  );
}

describe('EmployeesTable', () => {
  it('renders employee names in the table', () => {
    renderWithProviders();
    expect(screen.getByText('Michael Scott')).toBeInTheDocument();
    expect(screen.getByText('Dwight Schrute')).toBeInTheDocument();
  });
});
