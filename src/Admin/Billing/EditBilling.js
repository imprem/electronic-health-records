import React from "react";

const EditBilling = ({ record, onSave, onClose, onChange }) => {

    const isoToDateInput = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split("T")[0];
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Billing Record</h3>
                <form>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="APPOINTMENT_DATE"
                        value={isoToDateInput(record.APPOINTMENT_DATE)}
                        onChange={onChange}
                    />

                    <label>Patient:</label>
                    <input
                        type="text"
                        name="PATIENT"
                        value={record.PATIENT}
                        onChange={onChange}
                    />

                    <label>Doctor:</label>
                    <input
                        type="text"
                        name="DOCTOR"
                        value={record.DOCTOR}
                        onChange={onChange}
                    />

                    <label>Billed:</label>
                    <input
                        type="number"
                        name="BILLED"
                        value={record.BILLED}
                        onChange={onChange}
                    />

                    <label>Insurance Paid:</label>
                    <input
                        type="number"
                        name="INS_PAID"
                        value={record.INS_PAID}
                        onChange={onChange}
                    />

                    <label>Patient Paid:</label>
                    <input
                        type="number"
                        name="PT_PAID"
                        value={record.PT_PAID}
                        onChange={onChange}
                    />

                    <label>Note:</label>
                    <input
                        type="text"
                        name="NOTE"
                        value={record.NOTE}
                        onChange={onChange}
                    />
                </form>

                <div className="modal-actions">
                    <button onClick={onSave} className="save-button">
                        Save
                    </button>
                    <button onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBilling;