import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddNewUser = ({ onClose = () => {} }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a New User
      </Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Full Name" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
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
};

export default AddNewUser;
