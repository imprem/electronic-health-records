import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink 
        to="/admin" 
        end 
        className={({ isActive }) => (isActive ? 'active-link' : '')}
      >
        Dashboard
      </NavLink>
      <NavLink 
        to="/admin/user" 
        className={({ isActive }) => (isActive ? 'active-link' : '')}
      >
        User
      </NavLink>
      <NavLink 
        to="/admin/scheduling" 
        className={({ isActive }) => (isActive ? 'active-link' : '')}
      >
        Scheduling
      </NavLink>
      <NavLink 
        to="/admin/billing" 
        className={({ isActive }) => (isActive ? 'active-link' : '')}
      >
        Billing
      </NavLink>
      {/* <NavLink to="/admin/report" className={({ isActive }) => (isActive ? 'active-link' : '')}>
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

export default Sidebar;