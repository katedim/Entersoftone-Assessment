import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Employee } from '../../employeeType';

interface EmployeesState {
  employees: Employee[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  search: string;
  department: string;
}

const initialState: EmployeesState = {
  employees: [],
  status: 'idle',
  error: null,
  search: '',
  department: '',
};
export const fetchEmployees = createAsyncThunk<Employee[]>(
  'employees/fetchEmployees',
  async () => {
    const response = await fetch('/data/employees.json');
    const data = await response.json();
    return data.employees;
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setDepartment(state, action: PayloadAction<string>) {
      state.department = action.payload;
    },
    resetFilters(state) {
      state.search = '';
      state.department = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export const { setSearch, setDepartment, resetFilters } = employeeSlice.actions;
export default employeeSlice.reducer;
