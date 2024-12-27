import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { AddRecord } from '../Services/addUsersServices';

const AddNewDoctor = ({ onClose }) => {

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    contactNumber: "",
    email: "",
    gender: "",
    qualifications: "",
  });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.specialization || !formData.email) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Invalid email address.");
      return;
    }    
    // Submit form data to API
    setIsSubmitting(true);
    console.log("Submitted Data:", formData);
    await AddRecord(formData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Doctor
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
        <TextField
          label="Doctor Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Specialization"
          name="specialization"
          variant="outlined"
          fullWidth
          value={formData.specialization}
          onChange={handleChange}
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          variant="outlined"
          fullWidth
          value={formData.contactNumber}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          select
          label="Gender"
          name="gender"
          variant="outlined"
          fullWidth
          SelectProps={{ native: true }}
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </TextField>
        <TextField
          label="Qualifications"
          name="qualifications"
          variant="outlined"
          fullWidth
          value={formData.qualifications}
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewDoctor;