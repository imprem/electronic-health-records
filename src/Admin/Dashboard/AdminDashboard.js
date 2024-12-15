import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Dialog } from "@mui/material";
import AddNewPractice from '../../UtilityComponent/AddNewPractice';
import AddNewUser from '../../UtilityComponent/AddNewUser';
import AddNewPrescription from '../../UtilityComponent/AddNewPrescription';
import AddNewLab from '../../UtilityComponent/AddNewLab';
import AddNewDoctor from '../../UtilityComponent/AddNewDoctor';
import AddNewNurse from '../../UtilityComponent/AddNewNurse';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [activeComponent, setActiveComponent] = useState(0);

  const handleOpenDialog = (component) => {
    if (component) {
      setActiveComponent(component);
      setOpenDialog(true);
    } else {
      console.error("Component is undefined!");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveComponent(null);
  };

  const dashboardData = [
    // { title: "Your Practice", buttonText: "Add a New Practice", key: 1 },
    { title: "Your Patients", buttonText: "Add a New User", key: 2 },
    // { title: "E-Prescribing", buttonText: "Add a New Prescription", key: 3 },
    // { title: "Labs", buttonText: "Add a New Lab", key: 4 },
    { title: "Doctors", buttonText: "Add a New Doctor", key: 5 },
    { title: "Nurses", buttonText: "Add a New Nurse", key: 6 },
  ];

  const getPopup = () => {
    if (activeComponent === 0) {
      return <Typography sx={{ padding: 3 }}>No component loaded!</Typography>;
    }

    switch (activeComponent) {
      case 1:
        return <AddNewPractice onClose={handleCloseDialog} />;
      case 2:
        return <AddNewUser onClose={handleCloseDialog} />;
      case 3:
        return <AddNewPrescription onClose={handleCloseDialog} />;
      case 4:
        return <AddNewLab onClose={handleCloseDialog} />;
      case 5:
        return <AddNewDoctor onClose={handleCloseDialog} />;
      case 6:
        return <AddNewNurse onClose={handleCloseDialog} />;
        default:
          return (
            <Box sx={{ padding: 3, textAlign: 'center' }}>
              <Typography>No component loaded!</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseDialog}
                sx={{ marginTop: 2 }}
              >
                Cancel
              </Button>
            </Box>
          );  
    }
  };

  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom className="dashboard-title">Dashboard</Typography>
      <Grid container spacing={3}>
        {dashboardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box className="dashboard-card">
              <Typography variant="h6" gutterBottom>{item.title}</Typography>
              <Button
                variant="contained"
                color="primary"
                className="dashboard-button"
                onClick={() => handleOpenDialog(item.key)}
              >
                {item.buttonText}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => {}} fullWidth>
        {getPopup()}
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;