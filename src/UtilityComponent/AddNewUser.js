import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { AddNewPatient } from '../Services/addUsersServices'

const AddNewUser = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    console.log("Form data submitted:", formData);
    await AddNewPatient(formData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Patient
      </Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
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
          label="Phone Number"
          name="contactNumber"
          variant="outlined"
          fullWidth
          value={formData.contactNumber}
          onChange={handleChange}
        />
        <TextField
          label="Age"
          name="age"
          variant="outlined"
          fullWidth
          value={formData.age}
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewUser;