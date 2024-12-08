import React from 'react';
import './PatientDashboard.css'
function PatientDashboard() {

    return(
<div className="profile-dashboard">
      {/* Profile Section */}
      <div className="profile-card">
        <img
          src="https://via.placeholder.com/150" // Replace with actual image URL
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-details">
          <h2>Helen Voizhicki</h2>
          <span className="status active">Active</span>
          <p>Role: Patient</p>
          <p>Email: helenvoizhicki@gmail.com</p>
          <p>Phone: +7 (291) 255 58 43</p>
          <p>Work: LoremIpsum Group</p>
          <p>Address: 1 Main Street, Austin, TX, 78730</p>
          <p>Age: 34</p>
          <p>Birth Date: 02/20/1987</p>
          <p>Status: Divorced</p>
          <p>Preferred Provider: Dr. Stephanie Branch</p>
        </div>
      </div>

      {/* Insurance Section */}
      <div className="insurance-info">
        <p>Medical Insurance: None</p>
        <p>Vision Insurance: Yes</p>
        <p>Dental Insurance: Yes</p>
      </div>
    </div>
    );
}

export default PatientDashboard;