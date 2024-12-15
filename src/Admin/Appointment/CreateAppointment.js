import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateAppointment({ onClose, onSubmit, onInputChange }) {
    // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // const openCreateModal = () => {
    //     setIsCreateModalOpen(true);
    // };
    
    // const closeCreateModal = () => {
    //     setIsCreateModalOpen(false);
    // };

    // const handleCreateSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post(`${process.env.REACT_APP_API}/createappointment`)
    //       .then((response) => {
    //         fetchAppointments(selectedDate); // Refresh appointments
    //         closeCreateModal();
    //     })
    //       .catch((error) => {
    //         console.error('Error creating appointment:', error);
    //     });
    // };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create New Appointment</h2>
                <form onSubmit={onSubmit}>
                    <label>
                        Patient Name:
                        <input
                            type="text"
                            name="name"
                            onChange={onInputChange}
                        />
                    </label>
                    <label>
                        Doctor:
                        <input
                            type="text"
                            name="doctor"
                            onChange={onInputChange}
                        />
                    </label>
                    <label>
                        Time:
                        <input
                            type="time"
                            name="time"
                            onChange={onInputChange}
                        />
                    </label>
                    <label>
                        Duration (minutes):
                        <input
                            type="number"
                            name="duration"
                            onChange={onInputChange}
                        />
                    </label>
                    <label>
                        Visit Type:
                        <input
                            type="text"
                            name="type"
                            onChange={onInputChange}
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="appointment_date"
                            onChange={onInputChange}
                        />
                    </label>
                    <div className="modal-actions">
                        <button type="submit">Create</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAppointment;