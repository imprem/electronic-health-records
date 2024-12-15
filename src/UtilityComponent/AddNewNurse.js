import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { AddNewNurses } from '../Services/dbServices';

const AddNewNurse = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    contactNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    qualifications: "",
    yearsOfExperience: "",
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Invalid email address.");
      return;
    }

    setIsSubmitting(true);
    console.log("Submitted Data:", formData);
    await AddNewNurses(formData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Nurse
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Nurse Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Department"
          name="department"
          variant="outlined"
          fullWidth
          value={formData.department}
          onChange={handleChange}
        />
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.dateOfBirth}
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
        <TextField
          label="Years of Experience"
          name="yearsOfExperience"
          type="number"
          variant="outlined"
          fullWidth
          value={formData.yearsOfExperience}
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

export default AddNewNurse;