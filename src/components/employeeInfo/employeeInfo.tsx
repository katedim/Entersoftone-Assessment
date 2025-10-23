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
import "./EmployeeInfo.scss";

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
    <Box className="employee-info-container">
      {status === "loading" && <Typography>Loading...</Typography>}

      {status === "failed" && (
        <Box className="error-box">
          <Typography color="error" mb={2}>
            Failed to load employee data.
          </Typography>
          <Button
            variant="outlined"
            endIcon={<HomeIcon />}
            onClick={() => {
                dispatch(resetFilters());
                navigate("/employees");
            }}
          >
            Back
          </Button>
        </Box>
      )}

      {!employee && status === "succeeded" && (
        <Box className="not-found-box">
          <Typography mb={2}>Employee not found.</Typography>
          <Button
            variant="outlined"
            endIcon={<HomeIcon />}
            onClick={() => {
                dispatch(resetFilters());
                navigate("/employees");
            }}
          >
            Back
          </Button>
        </Box>
      )}

      {employee && (
        <Card>
          <CardContent className="employee-card">
            {employee.image && (
              <Box
                component="img"
                src={employee.image}
                alt={employee.fullName}
                className="employee-image "
              />
            )}
            <Typography gutterBottom variant="h5" component="div">
              {employee.fullName}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary" data-label="Department">
             {employee.department}
            </Typography>
            <Typography variant="body2" color="text.secondary" data-label="Email">
              {employee.email}
            </Typography>
            <Box className="status-wrapper">
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              data-label="Status"
            >
              <Box className="status-line">
                {employee.status}
                <Box className={`status-dot ${employee.status.replace(/\s/g, "-")}`} />
              </Box>
            </Typography>
          </Box>
            <Typography variant="body2" color="text.secondary" data-label="Hire Date">
              {new Date(employee.hireDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" data-label="Notes">
              {employee.notes}
            </Typography>
            <Button
              variant="contained"
              className="employee-back-button"
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
