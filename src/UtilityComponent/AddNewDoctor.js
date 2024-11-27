import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddNewDoctor = ({ onClose }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Doctor
      </Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Doctor Name" variant="outlined" fullWidth />
        <TextField label="Specialization" variant="outlined" fullWidth />
        <TextField label="Contact Number" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Address" variant="outlined" fullWidth multiline rows={2} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewDoctor;
