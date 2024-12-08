import React, { useState } from 'react';
import Calendar from "react-calendar";
import './Scheduling.css';

function Scheduling() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const appointments = [
      { id: 54875847, name: "Caroline Smith", provider: "Stephanie Branch", time: "09:00 AM", duration: 30, type: "Urgent" },
      { id: 48390099, name: "Jim Carry", provider: "Stephanie Branch", time: "10:00 AM", duration: 30, type: "Follow-Up" },
      { id: 574587458, name: "Sebastian Pereiro", provider: "Jimmy Sullivan", time: "10:00 AM", duration: 40, type: "Follow-Up" },
      { id: 54654700, name: "Nicole Smith", provider: "Melissa Meizer", time: "11:20 AM", duration: 30, type: "Chronic Care" },
      { id: 34343433, name: "Jimmy Chu", provider: "Stephanie Branch", time: "12:00 PM", duration: 25, type: "Annual Medicare Wellness" },
      { id: 65676778, name: "Cassandra Brooks", provider: "Cris Velaskez", time: "2:00 PM", duration: 30, type: "New Symptom" },
    ];
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    return (
        <div className="scheduling-container">
          <h1>Scheduling</h1>
    
          <div className="scheduling-header">
            <div className="calendar-section">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="custom-calendar"
              />
            </div>
    
            <div className="day-overview">
              <h2>{selectedDate.toDateString()}</h2>
              <div className="day-schedule">
                {appointments.map((appt, index) => (
                  <div key={index} className="appointment-block">
                    <p><strong>{appt.name}</strong></p>
                    <p>{appt.type}</p>
                    <p>{appt.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          <div className="appointments-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient Name</th>
                  <th>Provider</th>
                  <th>Time</th>
                  <th>Visit Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.id}</td>
                    <td>{appt.name}</td>
                    <td>{appt.provider}</td>
                    <td>{appt.time} ({appt.duration} min duration)</td>
                    <td>{appt.type}</td>
                    <td>
                      <button className="action-button view">👁️</button>
                      <button className="action-button edit">✏️</button>
                      <button className="action-button delete">❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
}

export default Scheduling;