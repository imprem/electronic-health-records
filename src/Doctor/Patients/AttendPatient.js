import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './AttendPatient.css';
import { addMedication } from '../../Services/attendPatientService';
import Swal from 'sweetalert2';
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { addTestResult } from "../../Services/addUsersServices";
import jsPDF from "jspdf";

function AttendPatient() {
    const location = useLocation();
    const patientDetails = location.state?.patientDetails;

    const [testResult, setTestResult] = useState("");
    const [comment, setComment] = useState("");
    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState("");
    const ipfs = create({ host: "localhost", port: 5001, protocol: "http" });

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
        if (!file) {
            Swal.fire({
              title: 'Error',
              text: 'Please select a file to upload.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
        }

        try{
            Swal.fire({
                title: 'Please wait',
                text: 'File uploading...',
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading(); // Show the loading spinner
                },
            });

            const fileBuffer = await file.arrayBuffer(); // Read file as ArrayBuffer
            const result = await ipfs.add(Buffer.from(fileBuffer)); // Upload to IPFS
            // setIpfsHash(result.cid.toString());
            const ipfs_hash_code = result.cid.toString();
            console.log('result.cid.toString() :: ', result.cid.toString());
            await addTestResult(patientDetails.patientAddress, ipfs_hash_code);
            Swal.fire({
                title: 'Success!',
                text: `File uploaded successfully!`,
                allowOutsideClick: false,
                icon: 'success',
            });
            await new Promise(resolve => setTimeout(resolve, 3000));
        }catch(error){
            console.error("Error uploading file to IPFS:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to upload file.',
                allowOutsideClick: false,
                icon: 'error',
            });
        }    

        try{
            // Simulate submitting test result and medicine details
            console.log('Patient Details :: ', patientDetails);
            console.log("Test Result:", testResult);
            console.log('Comment ', comment)
            console.log("Medicine Details:", medicineDetails);
            const txResult = await addMedication(patientDetails.id, patientDetails.name, patientDetails.gender, patientDetails.age, patientDetails.patientAddress, medicineDetails);
            
            // Generate PDF
            const doc = new jsPDF();
            doc.text(`Patient ID: ${patientDetails.id}`, 10, 10);
            doc.text(`Name: ${patientDetails.name}`, 10, 20);
            doc.text(`Gender: ${patientDetails.gender}`, 10, 30);
            doc.text(`Age: ${patientDetails.age}`, 10, 40);
            doc.text(`Address: ${patientDetails.patientAddress}`, 10, 50);
            doc.text(`Test Results: ${JSON.stringify(testResult)}`, 10, 60);
            doc.text(`Comment: ${comment}`, 10, 70);
            doc.text(`Medication Details:`, 10, 80);
            doc.text(`- Medicine Name: ${medicineDetails.Mname}`, 10, 90);
            doc.text(`- Dose: ${medicineDetails.dose}`, 10, 100);
            doc.text(`- Quantity: ${medicineDetails.quantity}`, 10, 110);
            doc.text(`- Condition: ${medicineDetails.condition}`, 10, 120);
            doc.text(`- Prescribed Date: ${medicineDetails.prescribedDate}`, 10, 130);

            const pdfBlob = doc.output("blob");

        // Upload PDF to IPFS
        const pdfBuffer = await pdfBlob.arrayBuffer();
        const pdfResult = await ipfs.add(Buffer.from(pdfBuffer));
        const pdfHash = pdfResult.cid.toString();
        console.log("PDF uploaded to IPFS with hash:", pdfHash);
        await addTestResult(patientDetails.patientAddress, pdfHash); 
        Swal.fire({
            title: 'Success!',
            text: `Data and PDF uploaded successfully! PDF IPFS Hash: ${pdfHash}`,
            icon: 'success',
            allowOutsideClick: false,
        });
        }catch(error){
            
        }
    };

    const submitTestResults = () => {
        if (!testResult) {
            alert("Please enter test results before submitting.");
        } else {
            console.log("Test Results Submitted:", testResult);
            // Add logic to save test results
        }
    };
    
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        console.log("Uploaded File:", file);
        setFile(file);
        // Add logic to store or process the file
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

            {/* Section 3: Add Test Result */}
            <div className="section test-results">
                <h2>Add Test Result</h2>

                {/* Test Type Selection */}
                <div className="form-group">
                    <label>Test Type:</label>
                    <select
                        value={testResult.testType || ""}
                        onChange={(e) => setTestResult({ ...testResult, testType: e.target.value })}
                    >
                        <option value="" disabled>Select Test Type</option>
                        <option value="Blood Test">Blood Test</option>
                        <option value="X-Ray">X-Ray</option>
                        <option value="MRI">MRI</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

    {/* Structured Test Result Parameters */}
    <div className="test-result-parameters">
        <div className="form-group">
            <label>Blood Pressure:</label>
            <input 
                type="text" 
                placeholder="e.g., 120/80 mmHg" 
                onChange={(e) => setTestResult({ ...testResult, bloodPressure: e.target.value })} 
            />
        </div>
        <div className="form-group">
            <label>Glucose Level:</label>
            <input 
                type="text" 
                placeholder="e.g., 5.5 mmol/L" 
                onChange={(e) => setTestResult({ ...testResult, glucose: e.target.value })} 
            />
        </div>
    </div>

    {/* File Upload for Test Report */}
    <div className="form-group">
        <label>Upload Test Report:</label>
        <input 
            type="file" 
            accept=".pdf, .png, .jpg, .jpeg" 
            onChange={(e) => handleFileUpload(e)} 
        />
    </div>

    {/* Submit Button */}
    <button 
        type="button" 
        onClick={() => submitTestResults()} 
        className="submit-button">
        Submit Test Results
    </button>

    {/* Test Result Preview */}
    {/* <div className="test-result-preview">
        <h3>Test Result Preview</h3>
        {testResult ? (
            <pre>{JSON.stringify(testResult, null, 2)}</pre>
        ) : (
            <p>No test results entered.</p>
        )}
    </div> */}
</div>

            {/* Section 3: Add Comment */}
            <div className="section test-results">
                <h2>Add Comment</h2>
                <textarea
                    rows="4"
                    placeholder="Enter test results here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>

            {/* Section 4: Add Medicine Details */}
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