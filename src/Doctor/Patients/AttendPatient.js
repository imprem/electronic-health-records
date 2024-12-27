import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './AttendPatient.css';
import { addMedication } from '../../Services/attendPatientService';

function AttendPatient() {
    const location = useLocation();
    const patientDetails = location.state?.patientDetails;

    const [testResult, setTestResult] = useState("");
    const [medicineDetails, setMedicineDetails] = useState({
        Mname: "",
        dose: "",
        quantity: 0,
        condition: "",
        prescribedDate: "",
    });

    const handleMedicineChange = (e) => {
        const { name, value } = e.target;
        setMedicineDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate submitting test result and medicine details
        console.log("Test Result:", testResult);
        console.log("Medicine Details:", medicineDetails);
        await addMedication(patientDetails.id, patientDetails.name, patientDetails.gender, patientDetails.age, patientDetails.patientAddress, medicineDetails);
        // Add logic to save data to blockchain or backend
        // alert("Patient details submitted successfully!");
    };

    return (
        <div className="attend-patient-container">
            <h1>Attend Patient</h1>

            {/* Section 1: Personal Information */}
            <div className="section personal-information">
                <h2>Personal Information</h2>
                {patientDetails ? (
                    <div className="patient-details">
                        <p><strong>ID:</strong> {patientDetails.id}</p>
                        <p><strong>Name:</strong> {patientDetails.name}</p>
                        <p><strong>Gender:</strong> {patientDetails.gender}</p>
                        <p><strong>Age:</strong> {patientDetails.age}</p>
                        <p><strong>Address:</strong> {patientDetails.patientAddress}</p>
                    </div>
                ) : (
                    <p>No patient data available.</p>
                )}
            </div>

            {/* Section 2: Add Test Result */}
            <div className="section test-results">
                <h2>Add Test Result</h2>
                <textarea
                    rows="4"
                    placeholder="Enter test results here..."
                    value={testResult}
                    onChange={(e) => setTestResult(e.target.value)}
                />
            </div>

            {/* Section 3: Add Medicine Details */}
            <div className="section medicine-details">
                <h2>Add Medicine Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Medicine Name:</label>
                        <input
                            type="text"
                            name="Mname"
                            value={medicineDetails.name}
                            onChange={handleMedicineChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Dose:</label>
                        <input
                            type="text"
                            name="dose"
                            value={medicineDetails.dose}
                            onChange={handleMedicineChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={medicineDetails.quantity}
                            onChange={handleMedicineChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Condition:</label>
                        <input
                            type="text"
                            name="condition"
                            value={medicineDetails.condition}
                            onChange={handleMedicineChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Prescribed Date:</label>
                        <input
                            type="date"
                            name="prescribedDate"
                            value={medicineDetails.prescribedDate}
                            onChange={handleMedicineChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AttendPatient;