import React, { useState } from "react";

function Doc_scheduling() {
    const [appointments, setAppointments] = useState([
        {
            APPOINTMENT_ID: "1",
            PATIENT: "Arjun kk",
            DOCTOR: "Dr. Ranjeet",
            TIME: "10:00 AM",
            DURATION: 30,
            STATUS: "Pending",
        },
        {
            APPOINTMENT_ID: "2",
            PATIENT: "Ram sing",
            DOCTOR: "Dr. Ranjeet",
            TIME: "12:00 AM",
            DURATION: 30,
            STATUS: "Pending",
        },
    ]);

    return (
        <div className="scheduling-container">
            <div className="appointments-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient Name</th>
                            <th>Doctor</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt, index) => (
                            <tr key={index}>
                                <td>{appt.APPOINTMENT_ID}</td>
                                <td>{appt.PATIENT}</td>
                                <td>{appt.DOCTOR}</td>
                                <td>
                                    {appt.TIME} ({appt.DURATION} min duration)
                                </td>
                                <td>{appt.STATUS}</td>
                                <td>
                                    <button className="action-button accept">
                                        <span role="img" aria-label="accept">
                                            ✅
                                        </span>{" "}
                                        Accept
                                    </button>
                                    <button className="action-button reject">
                                        <span role="img" aria-label="reject">
                                            ❌
                                        </span>{" "}
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Doc_scheduling;