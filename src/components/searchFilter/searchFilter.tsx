import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import './SearchFilter.scss';

export default function SearchFilter() {
  const [departments, setDepartments] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    fetch('/data/employees.json')
      .then((res) => res.json())
      .then((data) => {
        const allDepartments = (data.employees as { department: string }[]).map(emp => emp.department);
        const uniqueDepartments = Array.from(new Set(allDepartments));
        setDepartments(uniqueDepartments.sort());
      })
      .catch((err) => console.error('Failed to load departments:', err));
  }, []);

  return (
    <Box className="employee-filter">
      <TextField
        fullWidth
        label="Search by name or email"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="employee-filter__search"
      />

      <FormControl fullWidth className="employee-filter__select">
        <InputLabel>Department</InputLabel>
        <Select
          value={selectedDepartment}
          label="Department"
          onChange={(e) => setSelectedDepartment(e.target.value)}
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
