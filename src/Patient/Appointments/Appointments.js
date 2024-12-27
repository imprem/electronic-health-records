import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  Dialog,
  Paper,
} from "@mui/material";
import Applyappointments from "./Applyappointments";
import axios from "axios";

const Appointments = () => {
  const [filter, setFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentss, setAppointments] = useState([]);
  const [userId, setUserID] = useState(0);

  const fetchAppointments = async (user_id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/patient/getappointment/${user_id}`
      );
      console.log("Appointments fetched: ", response.data);
      if (Array.isArray(response.data)) {
        setAppointments(response.data);
      } else {
        console.error("Invalid data format: Expected an array");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user_address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
        const response = await axios.get(
          `${process.env.REACT_APP_API}/user/getuserid/${user_address}`
        );
        setUserID(response.data);
        console.log("User ID fetched: ", response.data);
        fetchAppointments(response.data);
      } catch (error) {
        console.error("Error fetching user ID:", error.message);
      }
    };

    fetchUserId();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = async () => {
    setOpenDialog(false);
    await fetchAppointments(userId);
  };

  const isoToDateInput = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Select
          value={filter}
          onChange={handleFilterChange}
          displayEmpty
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Scheduled">Scheduled</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
          Apply For Appointment
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Visit Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Clinician</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Duration</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Comments</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(appointmentss) && appointmentss.length > 0 ? (
              appointmentss
                .filter((appt) =>
                  filter ? appt.STATUS.toLowerCase() === filter.toLowerCase() : true
                )
                .map((appt) => (
                  <TableRow key={appt.APPOINTMENT_ID}>
                  <TableCell>{appt.APPOINTMENT_ID}</TableCell>
                  <TableCell>{appt.VISIT}</TableCell>
                  <TableCell>{appt.DOCTOR_NAME}</TableCell>
                  <TableCell>{appt.LOCATION}</TableCell>
                  <TableCell>{isoToDateInput(appt.APPOINTMENT_DATE)}</TableCell>
                  <TableCell>{appt.DURATION}</TableCell>
                  <TableCell>{appt.COMMENTS}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                      color: appt.STATUS === "Scheduled" ? "green" : "orange",
                    }}
                    >
                      {appt.STATUS}
                    </Typography>
                  </TableCell>
                </TableRow>
                ))
                ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No Appointments Found
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Applyappointments */}
      <Dialog 
        open={openDialog} 
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleDialogClose();
          }
        }}
        fullWidth>
        <Applyappointments onClose={handleDialogClose} userId={userId} />
      </Dialog>
    </Box>
  );
};

export default Appointments;