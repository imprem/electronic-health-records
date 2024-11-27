import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddNewLab = ({ onClose }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Lab
      </Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Lab Name" variant="outlined" fullWidth />
        <TextField label="Location" variant="outlined" fullWidth />
        <TextField label="Contact Number" variant="outlined" fullWidth />
        <TextField label="Services Offered" variant="outlined" fullWidth multiline rows={3} />
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

export default AddNewLab;
