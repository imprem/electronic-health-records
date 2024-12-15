import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Scheduling.css";
import axios from "axios";
import ViewAppointment from "./ViewAppointment";
import EditAppointment from "./EditAppointment";
import CreateAppointment from "./CreateAppointment";

function Scheduling() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const fetchAppointments = (date) => {
        const formattedDate = date.toISOString().split("T")[0];
        console.log('formattedDate::', formattedDate);
        axios
            .get(`${process.env.REACT_APP_API}/appointmentsbydate?date=${formattedDate}`)
            .then((response) => setAppointments(response.data))
            .catch((error) => console.error("Error fetching appointments:", error));
    };

    useEffect(() => {
        fetchAppointments(selectedDate);
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleViewAppointment = (appt) => {
        setSelectedAppointment(appt);
    };

    const closeViewModal = () => {
        setSelectedAppointment(null);
    };

    const openEditModal = (appt) => {
        setCurrentAppointment(appt);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentAppointment(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentAppointment({ ...currentAppointment, [name]: value });
        console.log('On Change :: ', currentAppointment)
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios
            .put(
                `${process.env.REACT_APP_API}/editappointment/${currentAppointment.APPOINTMENT_ID}`,
                currentAppointment
            )
            .then((response) => {
                console.log(response.data);
                fetchAppointments(selectedDate);
                closeEditModal();
            })
            .catch((error) => console.error("Error updating appointment:", error));
    };

    const deleteByID = (appt) => {
      console.log("### Appointment Id :: ", appt.APPOINTMENT_ID);
      axios.delete(`${process.env.REACT_APP_API}/deleteappointment/${appt.APPOINTMENT_ID}`)
      .then((response) => {
        console.log(response.data)
        fetchAppointments(selectedDate);
      })
      .catch(error => console.error(error));
    }

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };
    
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        console.log('The current Appointment :: ', currentAppointment)
        axios.post(`${process.env.REACT_APP_API}/createappointment`, currentAppointment)
          .then((response) => {
            fetchAppointments(selectedDate); // Refresh appointments
            closeCreateModal();
        })
          .catch((error) => {
            console.error('Error creating appointment:', error);
        });
    };

    return (
        <div className="scheduling-container">
            <div className="scheduling-header">
                <h1 className="scheduling-title">Scheduling</h1>
                <button className="create-button" onClick={openCreateModal}>Create New Appointment</button>
            </div>
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
                                <p>
                                    <strong>{appt.PATIENT}</strong>
                                </p>
                                <p>{appt.TYPE}</p>
                                <p>{appt.TIME}</p>
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
                            <th>Doctor</th>
                            <th>Time</th>
                            <th>Visit Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr key={appt.id}>
                                <td>{appt.APPOINTMENT_ID}</td>
                                <td>{appt.PATIENT}</td>
                                <td>{appt.DOCTOR}</td>
                                <td>
                                    {appt.TIME} ({appt.DURATION} min duration)
                                </td>
                                <td>{appt.TYPE}</td>
                                <td>
                                    <button className="action-button view" onClick={() => handleViewAppointment(appt)}>👁️</button>
                                    <button className="action-button edit" onClick={() => openEditModal(appt)}>✏️</button>
                                    <button className="action-button delete" onClick={() => deleteByID(appt)}>❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedAppointment && (
                    <ViewAppointment appt={selectedAppointment} onClose={closeViewModal} />
                )}
            </div>
            {isEditModalOpen && currentAppointment && (
                <EditAppointment
                    appt={currentAppointment}
                    onClose={closeEditModal}
                    onSubmit={handleEditSubmit}
                    onInputChange={handleInputChange}
                />
            )}

            {/* Create Modal */}
            {isCreateModalOpen && (
                <CreateAppointment
                    appointment={currentAppointment}
                    onClose={closeCreateModal}
                    onSubmit={handleCreateSubmit}
                    onInputChange={handleInputChange}
                />
            )}
        </div>
    );
}

export default Scheduling;