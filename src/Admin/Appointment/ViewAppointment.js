import React from "react";

const ViewAppointment = ({ appt, onClose }) => {
    console.log('### View Appointment :: ', appt);
    
    const isoToDateInput = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split('T')[0]; // Convert to yyyy-mm-dd
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>View Appointment</h2>
                <form>
                    <label>
                        Patient Name:
                        <input type="text" name="name" value={appt.PATIENT} readOnly />
                    </label>
                    <label>
                        Doctor:
                        <input type="text" name="doctor" value={appt.DOCTOR} readOnly />
                    </label>
                    <label>
                        Time:
                        <input type="time" name="time" value={appt.TIME} readOnly />
                    </label>
                    <label>
                        Duration (minutes):
                        <input type="number" name="duration" value={appt.DURATION} readOnly />
                    </label>
                    <label>
                        Visit Type:
                        <input type="text" name="type" value={appt.TYPE} readOnly />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="appointment_date"
                            value={isoToDateInput(appt.APPOINTMENT_DATE)}
                            readOnly
                        />
                    </label>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewAppointment;