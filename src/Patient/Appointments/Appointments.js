import React, { useState } from "react";
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
import Applyappointments from "./Applyappointments"; // Import your Applyappointments component

const Appointments = () => {
  const [filter, setFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const appointments = [
    {
      id: 1,
      visitType: "Urgent",
      clinician: "Dr. Branch",
      provider: "Stephanie Branch",
      location: "SOUTH MEDICAL CENTER",
      date: "05/28/2020",
      duration: "30 min",
      comments: "ASAP",
      insurance: "Check",
      status: "Pending",
    },
    {
      id: 2,
      visitType: "Follow-Up",
      clinician: "Dr. Collins",
      provider: "Stephanie Branch",
      location: "SOUTH MEDICAL CENTER",
      date: "05/29/2020",
      duration: "30 min",
      comments: "-",
      insurance: "Check",
      status: "Pending",
    },
    {
      id: 3,
      visitType: "Follow-Up",
      clinician: "Dr. Sallivan",
      provider: "Jimmy Sallivan",
      location: "NORTH MEDICAL CENTER",
      date: "06/03/2020",
      duration: "30 min",
      comments: "-",
      insurance: "Check",
      status: "Pending",
    },
    {
      id: 4,
      visitType: "Chronic Care",
      clinician: "Dr. Meizer",
      provider: "Melissa Meizer",
      location: "SOUTH MEDICAL CENTER",
      date: "06/07/2020",
      duration: "45 min",
      comments: "-",
      insurance: "Check",
      status: "Unconfirmed",
    },
    {
      id: 5,
      visitType: "Annual Medicare Wellness",
      clinician: "Dr. Branch",
      provider: "Stephanie Branch",
      location: "SOUTH MEDICAL CENTER",
      date: "06/10/2020",
      duration: "60 min",
      comments: "-",
      insurance: "Check",
      status: "Unconfirmed",
    },
    {
      id: 6,
      visitType: "New Symptom",
      clinician: "Dr. Velaskez",
      provider: "Cris Velaskez",
      location: "NORTH MEDICAL CENTER",
      date: "06/15/2020",
      duration: "30 min",
      comments: "-",
      insurance: "Check",
      status: "Unconfirmed",
    },
  ];

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
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Unconfirmed">Unconfirmed</MenuItem>
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
            {appointments
              .filter((appointment) =>
                filter ? appointment.status === filter : true
              )
              .map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>{appointment.visitType}</TableCell>
                  <TableCell>{appointment.clinician}</TableCell>
                  <TableCell>{appointment.location}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.duration}</TableCell>
                  <TableCell>{appointment.comments}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color:
                          appointment.status === "Pending"
                            ? "green"
                            : "orange",
                      }}
                    >
                      {appointment.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Applyappointments */}
      <Dialog open={openDialog} onClose={() => {}} fullWidth>
        <Applyappointments onClose={handleDialogClose} />
      </Dialog>
    </Box>
  );
};

export default Appointments;