import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Paper,
  TableRow,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Employee } from "../../employeeType";
import SearchFilter from "../searchFilter/searchFilter"; 

export default function EmployeesTable() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Employee[]>([]);


  useEffect(() => {
    fetch('/data/employees.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setEmployees(data.employees))
      .catch(error => console.error('There has been a problem while fetching data:', error));
  }, []);

    return (
            <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      {/* Render SearchFilter before the table */}
      <SearchFilter />
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
            {employees.map((emp) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    );
  };

