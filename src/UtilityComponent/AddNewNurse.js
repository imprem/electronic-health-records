import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddNewNurse = ({ onClose }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Nurse
      </Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nurse Name" variant="outlined" fullWidth />
        <TextField label="Department" variant="outlined" fullWidth />
        <TextField label="Contact Number" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Shift Timings" variant="outlined" fullWidth />
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

export default AddNewNurse;
