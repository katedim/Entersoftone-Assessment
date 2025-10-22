import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Paper,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SearchFilter from "../searchFilter/searchFilter";
import { fetchEmployees } from "../../features/employees/employeeSlice";
import type { RootState, AppDispatch } from "../../app/store";
import type { Employee } from "../../employeeType";

export default function EmployeesTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { employees, status, search, department } = useSelector(
    (state: RootState) => state.employees
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesDepartment =
      department === "" || emp.department === department;
    return matchesSearch && matchesDepartment;
  });

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <SearchFilter />

      {status === "loading" && <Typography>Loading...</Typography>}
      {status === "failed" && (
        <Typography color="error">Failed to load employees.</Typography>
      )}

      {status === "succeeded" && (
        <TableContainer component={Paper} sx={{ maxHeight: "400px" }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp: Employee) => (
                  <TableRow
                    key={emp.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/employee/${emp.id}`)}
                  >
                    <TableCell>{emp.fullName}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No employees found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
