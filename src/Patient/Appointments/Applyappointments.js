import React, { useEffect, useState } from "react";
import "./Applyappointments.css";
import { Box, TextField, Button, Typography, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import axios from "axios";
// import { applyForAppointment } from '../../Services/appointmentService';
// import { createAppointments } from "../../Services/patientServices";
import { getAllDoctors, getPatientsByAddress } from "../../Services/getUsersServices";
import { createAppointments } from "../../Services/patientServices";

const Applyappointments = ({ onClose = () => {}, userId }) => {
  const [visitType, setVisitType] = useState([]);
  const [doctors, setDoctor] = useState([]);

  const [selectedVisitType, setSelectedVisitType] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patient, setPatients] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");
  const [status, setStatus] = useState("Pending");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [comments, setComments] = useState("");
  const [duration, setDuration] = useState(0);

  const fetchDoctor = async () => {
    try{
      const doctors = await getAllDoctors();
      setAllDoctors(doctors);
      
      const patients = await getPatientsByAddress();
      console.log('Patient details :: ', patients[1]);
      const patientName = patients[1];
      setPatients(patientName);
    }catch(error){
      console.log('Error Fetching doctoe', error);
    }
  }

  useEffect(() => {
    fetchDoctor();
  }, []);

  useEffect(() => {
    const filterDoctor = allDoctors.find((doctor) => doctor.name === selectedDoctor);
    if(filterDoctor){
      setDoctorAddress(filterDoctor.doctorAddress);
    }else{
      setDoctorAddress("");
    }
  }, [selectedDoctor]);

  const handleSubmit = async () => {
    console.log('Doctor     ::', selectedDoctor);
    console.log('Patient     ::', patient);
    console.log("Date       ::", isoToDateInput(selectedDate));
    console.log("Time       ::", timeTodateInput(selectedTime));
    console.log('Comment    ::', comments);
    console.log("Status     ::", status);
    console.log("duration   ::", duration)
    await createAppointments(patient, selectedDoctor, isoToDateInput(selectedDate), timeTodateInput(selectedTime), duration, comments);
    onClose();
  };

  const isoToDateInput = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  const timeTodateInput = (isTime) => {
    const date = new Date(isTime);
    return date.toLocaleTimeString("en-GB", { hour12: false });
  }

  return (
    <Box className="apply-appointments-container">
      <Typography variant="h6" gutterBottom>
        Apply for Appointment
      </Typography>
      <Box component="form" className="apply-appointments-form">
        {/* Clinician Field */}
        <Select 
          value={selectedDoctor}
           onChange={(e) => setSelectedDoctor(e.target.value)}
           displayEmpty
          fullWidth
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="" disabled>
            Select Doctor
          </MenuItem>
          {allDoctors.map((type, index) => (
            <MenuItem key={index} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>

        <TextField label="Patient name" value={patient} variant="outlined" fullWidth InputProps={{ readOnly: true }} className="readonly-input" />
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

        <TextField label="Duration" variant="outlined" onChange={(e) => setDuration(e.target.value)} fullWidth/>

        {/* Comments Field */}
        <TextField
          label="Comments"
          variant="outlined"
          fullWidth
          multiline
          minRows={4}
          maxRows={6}
          className="comments-field"
          onChange={(e) => setComments(e.target.value)}
        />
        <TextField label="Status" value={status} variant="outlined" fullWidth InputProps={{ readOnly: true }} className="readonly-input" />

        {/* Buttons */}
        <Box className="form-buttons">
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Applyappointments;