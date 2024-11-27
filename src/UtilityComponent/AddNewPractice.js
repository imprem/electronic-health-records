import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function AddNewPractice({onClose}) {
  console.log("onClose function received:");
  return (
    <Box sx={{ padding: 7 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Practice
      </Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Practice Name" variant="outlined" fullWidth />
        <TextField label="Address" variant="outlined" fullWidth />
        <TextField label="Phone Number" variant="outlined" fullWidth />
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
}

export default AddNewPractice;
