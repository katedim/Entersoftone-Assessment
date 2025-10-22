import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { useEffect } from "react";
import {
  fetchEmployees,
  resetFilters,
} from "../../features/employees/employeeSlice";
import HomeIcon from "@mui/icons-material/Home";

export default function EmployeeInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const status = useSelector((state: RootState) => state.employees.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  const employee = employees.find((emp) => emp.id === Number(id)) || null;

  return (
    <Box width="300px" margin="0 auto" mt="30px">
      {status === "loading" && <Typography>Loading...</Typography>}

      {status === "failed" && (
        <Box textAlign="center">
          <Typography color="error" mb={2}>
            Failed to load employee data.
          </Typography>
          <Button
            variant="outlined"
            endIcon={<HomeIcon />}
            onClick={() => navigate("/employees")}
          >
            Back
          </Button>
        </Box>
      )}

      {!employee && status === "succeeded" && (
        <Box textAlign="center">
          <Typography mb={2}>Employee not found.</Typography>
          <Button
            variant="outlined"
            endIcon={<HomeIcon />}
            onClick={() => navigate("/employees")}
          >
            Back
          </Button>
        </Box>
      )}

      {employee && (
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
              onClick={() => {
                dispatch(resetFilters());
                navigate("/employees");
              }}
            >
              Back to Employees
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
