import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddNewPrescription = ({ onClose = () => {} }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Prescription
      </Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Patient Name" variant="outlined" fullWidth />
        <TextField label="Medicine Name" variant="outlined" fullWidth />
        <TextField label="Dosage (e.g., 2x/day)" variant="outlined" fullWidth />
        <TextField label="Duration (e.g., 7 days)" variant="outlined" fullWidth />
        <TextField label="Additional Instructions" variant="outlined" fullWidth multiline rows={3} />
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

export default AddNewPrescription;