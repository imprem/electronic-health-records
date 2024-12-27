import React from 'react';
import { NavLink } from 'react-router-dom';
import './Patientsidebar.css';

const Patient_sidebar = () => {
    return (
        <div className="sidebar">
          <NavLink 
            to="/patients" 
            end 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Profile
          </NavLink>
          <NavLink 
            to="/patients/appointments" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Appointments
          </NavLink>
          <NavLink to="/patients/medications" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Medications
          </NavLink>
          <NavLink 
            to="/patients/medical_bills" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Medical Bills
          </NavLink>
          <NavLink to="/patients/medical_records" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Medical records
          </NavLink>
          <NavLink 
            to="/logout" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Logout
          </NavLink>
          {/* style={{ marginTop: 'auto', color: 'red' }} */}
        </div>
    );
}

export default Patient_sidebar;