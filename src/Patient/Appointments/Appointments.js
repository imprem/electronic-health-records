import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Button, Dialog, Paper,} from "@mui/material";
import Applyappointments from "./Applyappointments";
import axios from "axios";
import { getAllAppointment, getPatientsByAddress } from "../../Services/getUsersServices";
import { BigNumber } from 'ethers';

const Appointments = () => {
  const [filter, setFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentss, setAppointments] = useState([]);
  const [userId, setUserID] = useState(0);

  const fetchAppointments = async () => {
    try {
      const appointment = await getAllAppointment();
      console.log('SSSSSSSS ### :: ', appointment);

      const patients = await getPatientsByAddress();
      console.log('Patient details :: ', patients[1]);
      const patientName = patients[1];
      console.log('Patient details :: ', patientName);
      const filteredAppointments = appointment.filter(
        (appt) => appt[1] === patientName 
      );
  
      console.log(' =======> Filtered Appointments :: ', filteredAppointments);
      setAppointments(filteredAppointments); 

    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

useEffect(() => {
  const fetchData = async () => {
    try {
      await fetchAppointments();
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

  fetchData(); // Call the async function
}, []); // Dependencies remain the same

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
        {/* <Select
          value={filter}
          onChange={handleFilterChange}
          displayEmpty
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Scheduled">Scheduled</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select> */}
        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
          Apply For Appointment
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Appointment ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Clinician</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
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
                  <TableRow key={appt}>
                  <TableCell>{BigNumber.from(appt.appointmentID._hex).toNumber()}</TableCell>
                  <TableCell>{appt.doctorName}</TableCell>
                  <TableCell>{isoToDateInput(appt.date)}</TableCell>
                  <TableCell>{appt.time}</TableCell>
                  <TableCell>{BigNumber.from(appt.duration).toNumber()}</TableCell>
                  <TableCell>{appt.comments}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                      color: appt.status === "Scheduled" ? "green" : "orange",
                    }}
                    >
                      {appt.status}
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