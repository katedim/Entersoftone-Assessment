import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Employee } from "../../employeeType";

export default function EmployeeInfo() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/employees.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.employees.find(
          (emp: Employee) => emp.id === Number(id)
        );
        setEmployee(found || null);
      })
      .catch((error) => console.error("Failed to fetch employee info:", error));
  }, [id]);

  if (!employee) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box width="300px" margin="0 auto" mt="30px">
      <Card>
        <CardContent sx={{ textAlign: "center" }}>
          {employee.image && (
            <Box
              component="img"
              src={employee.image}
              alt={employee.fullName}
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                mb: 2,
                mx: "auto",
                display: "block",
              }}
            />
          )}
          <Typography gutterBottom variant="h5" component="div">
            {employee.fullName}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            Department: {employee.department}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {employee.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {employee.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hire Date: {new Date(employee.hireDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Notes: {employee.notes}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate("/employees")}
          >
            Back to Employees
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
