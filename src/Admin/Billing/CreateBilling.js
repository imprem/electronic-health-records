import React from "react";

const CreateBilling = ({onSubmit, onClose, onChange}) => {

    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add a new bill</h3>
                <form>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="APPOINTMENT_DATE"
                        onChange={onChange}
                    />

                    <label>Patient:</label>
                    <input
                        type="text"
                        name="PATIENT"
                        onChange={onChange}
                    />

                    <label>Doctor:</label>
                    <input
                        type="text"
                        name="DOCTOR"
                        onChange={onChange}
                    />

                    <label>Billed:</label>
                    <input
                        type="number"
                        name="BILLED"
                        onChange={onChange}
                    />

                    <label>Insurance Paid:</label>
                    <input
                        type="number"
                        name="INS_PAID"
                        onChange={onChange}
                    />

                    <label>Patient Paid:</label>
                    <input
                        type="number"
                        name="PT_PAID"
                        onChange={onChange}
                    />

                    <label>Note:</label>
                    <input
                        type="text"
                        name="NOTE"
                        onChange={onChange}
                    />
                </form>

                <div className="modal-actions">
                    <button onClick={onSubmit} className="save-button">
                        Save
                    </button>
                    <button onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateBilling;