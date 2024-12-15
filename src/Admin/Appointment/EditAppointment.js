import React from "react";

const EditAppointment = ({ appt, onClose, onSubmit, onInputChange }) => {
    // Helper function to convert ISO date to yyyy-mm-dd
    const isoToDateInput = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split("T")[0];
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Appointment</h2>
                <form onSubmit={onSubmit}>
                    <label>
                        Patient Name:
                        <input
                            type="text"
                            name="PATIENT"
                            value={appt.PATIENT || ""}
                            onChange={onInputChange}
                        />
                    </label>
                    <label>
                        Doctor:
                        <input
                            type="text"
                            name="DOCTOR"
                            value={appt.DOCTOR || ""}
                            onChange={onInputChange}
                        />
                    </label>
                    <label>
                        Time:
                        <input
                            type="time"
                            name="TIME"
                            value={appt.TIME || ""}
                            onChange={onInputChange}
                        />
                    </label>
                    <label>
                        Duration (minutes):
                        <input
                            type="number"
                            name="DURATION"
                            value={appt.DURATION || ""}
                            onChange={onInputChange}
                        />
                    </label>
                    <label>
                        Visit Type:
                        <input
                            type="text"
                            name="TYPE"
                            value={appt.TYPE || ""}
                            onChange={onInputChange}
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="APPOINTMENT_DATE"
                            value={appt.APPOINTMENT_DATE ? isoToDateInput(appt.APPOINTMENT_DATE) : ""}
                            onChange={onInputChange}
                        />
                    </label>
                    <div className="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAppointment;