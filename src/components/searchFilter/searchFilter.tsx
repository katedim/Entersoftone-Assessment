import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { setSearch, setDepartment } from '../../features/employees/employeeSlice';
import './SearchFilter.scss';
import type { SelectChangeEvent } from '@mui/material/Select';

export default function SearchFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector((state: RootState) => state.employees.search);
  const selectedDepartment = useSelector((state: RootState) => state.employees.department);

   const employees = useSelector((state: RootState) => state.employees.employees);

   const departments = Array.from(
    new Set(employees.map((emp) => emp.department))
  ).sort();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleDepartmentChange = (e: SelectChangeEvent) => {
    dispatch(setDepartment(e.target.value));
  };

  return (
    <Box className="employee-filter">
      <TextField
        fullWidth
        label="Search by name or email"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        className="employee-filter__search"
      />

      <FormControl fullWidth className="employee-filter__select">
        <InputLabel>Department</InputLabel>
        <Select
          value={selectedDepartment}
          label="Department"
          onChange={handleDepartmentChange}
        >
          <MenuItem value="">All Departments</MenuItem>
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
