import React from 'react';
import { NavLink } from 'react-router-dom';
import './Docsidebar.css';

const Doc_sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink 
        to="/doctor" 
        end 
        className={({ isActive }) => (isActive ? 'active-link' : '')}
      >
        Dashboard
      </NavLink>
      <NavLink 
        to="/doctor/patients" 
        className={({ isActive }) => (isActive ? 'active-link' : '')}
      >
        Patients
      </NavLink>
      <NavLink 
        to="/doctor/scheduling" 
        className={({ isActive }) => (isActive ? 'active-link' : '')}
      >
        Scheduling
      </NavLink>
      {/* <NavLink to="/doctor/report" className={({ isActive }) => (isActive ? 'active-link' : '')}>
        Reports
      </NavLink> */}

      <NavLink 
        to="/logout" 
        className={({ isActive }) => (isActive ? 'active-link' : '')}
      >
        Logout
      </NavLink>
      {/* style={{ marginTop: 'auto', color: 'red' }} */}
    </div>
  );
};

export default Doc_sidebar;