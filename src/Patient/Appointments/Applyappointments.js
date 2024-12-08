import React, { useState } from "react";
import "./Applyappointments.css";
import { Box, TextField, Button, Typography, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const Applyappointments = ({ onClose = () => {} }) => {
  const [visitType, setVisitType] = useState("");
  const [status, setStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const visitTypeOptions = [
    "Urgent",
    "New Symptom Visit",
    "Annual Medicare Wellness Visit",
    "Follow-Up Visit",
    "Chronic Care Visit",
  ];

  const statusOptions = ["Pending", "Unconfirmed"];

  const handleSubmit = () => {
    console.log("Visit Type:", visitType);
    console.log("Status:", status);
    console.log("Date:", selectedDate);
    console.log("Time:", selectedTime);
    onClose(); // Close the dialog on save
  };

  return (
    <Box className="apply-appointments-container">
      <Typography variant="h6" gutterBottom>
        Apply for Appointment
      </Typography>
      <Box component="form" className="apply-appointments-form">
        {/* Visit Type Dropdown */}
        <Select
          value={visitType}
          onChange={(e) => setVisitType(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="" disabled>
            Select Visit Type
          </MenuItem>
          {visitTypeOptions.map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>

        {/* Clinician Field */}
        <TextField label="Clinician" variant="outlined" fullWidth />

        {/* Location Field */}
        <TextField label="Location" variant="outlined" fullWidth />

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* Time Picker */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Select Time"
            value={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* Comments Field */}
        <TextField
          label="Comments"
          variant="outlined"
          fullWidth
          multiline
          minRows={4}
          maxRows={6}
          className="comments-field"
        />

        {/* Status Dropdown */}
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="" disabled>
            Select Status
          </MenuItem>
          {statusOptions.map((stat, index) => (
            <MenuItem key={index} value={stat}>
              {stat}
            </MenuItem>
          ))}
        </Select>

        {/* Buttons */}
        <Box className="form-buttons">
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!visitType || !status || !selectedDate || !selectedTime}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Applyappointments;