import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { getAllDoctors, getAllPatients } from "../../Services/getUsersServices";
import { createAppointments } from "../../Services/patientServices";

function CreateAppointment({ onClose, onSubmit }) {
    const [allDoctors, setAllDoctors] = useState([]);
    const [allPatients, setAllPatients] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedPatient, setSelectedPatient] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [comments, setComments] = useState("");
    const [duration, setDuration] = useState(0);
    const [status, setStatus] = useState("Pending");
    const [patientAddress, setPatientAddress] = useState("");

    // Fetch doctors and patients
    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctors = await getAllDoctors();
                setAllDoctors(doctors);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
            try {
                const patients = await getAllPatients();
                setAllPatients(patients);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchData();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createAppointments(selectedPatient, selectedDoctor, isoToDateInput(selectedDate), timeTodateInput(selectedTime), duration, comments);
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
            <Typography variant="h6" gutterBottom>Create New Appointment</Typography>
                <Box component="form" className="apply-appointments-form">
                    {/* Clinician Field */}
                    <Select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} displayEmpty fullWidth sx={{ minWidth: 120 }}>
                        <MenuItem value="" disabled>Select Patient</MenuItem>
                        {allPatients.map((type, index) => (
                            <MenuItem key={index} value={type.name}>
                            {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {/* Clinician Field */}
                    <Select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} displayEmpty fullWidth sx={{ minWidth: 120 }}>
                        <MenuItem value="" disabled>Select Doctor</MenuItem>
                        {allDoctors.map((type, index) => (
                            <MenuItem key={index} value={type.name}>
                            {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {/* Date Picker */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Select Date" value={selectedDate} onChange={(date) => setSelectedDate(date)} renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                    {/* Time Picker */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker label="Select Time" value={selectedTime} onChange={(time) => setSelectedTime(time)} renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                    <TextField label="Duration" variant="outlined" onChange={(e) => setDuration(e.target.value)} fullWidth/>
                    {/* Comments Field */}
                    <TextField label="Comments" variant="outlined" fullWidth multiline minRows={4} maxRows={6} className="comments-field" onChange={(e) => setComments(e.target.value)}/>
                    <TextField label="Status" value={status} variant="outlined" fullWidth InputProps={{ readOnly: true }} className="readonly-input" />
                    {/* Buttons */}
                    <Box className="form-buttons">
                        <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!selectedDate || !selectedTime}>Save</Button>
                    </Box>
            </Box>
        </Box>
    );
}

export default CreateAppointment;