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

import "./EmployeesTable.scss";

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
    <Box className="employees-table-container">
      <SearchFilter />

      {status === "loading" && <Typography>Loading...</Typography>}
      {status === "failed" && (
        <Typography color="error">Failed to load employees.</Typography>
      )}

      {status === "succeeded" && (
        <TableContainer component={Paper} className="table-container">
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="employees-table-header-cell">
                  Full Name
                </TableCell>
                <TableCell className="employees-table-header-cell">
                  Department
                </TableCell>
                <TableCell className="employees-table-header-cell">
                  Email
                </TableCell>
                <TableCell className="employees-table-header-cell">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp: Employee) => (
                  <TableRow
                    key={emp.id}
                    className="table-row"
                    hover
                    onClick={() => navigate(`/employee/${emp.id}`)}
                  >
                    <TableCell>{emp.fullName}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        {emp.status}
                        <Box
                          className={`status-dot ${emp.status.replace(
                            /\s/g,
                            "-"
                          )}`}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="no-employees">
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
