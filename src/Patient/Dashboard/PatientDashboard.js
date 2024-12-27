import React, { useEffect, useState } from 'react';
import './PatientDashboard.css';
import { getAllPatients, getDoctorDetails, getPatientsByAddress } from '../../Services/getUsersServices';
import { BigNumber } from 'ethers';
import imgic from '../../image/imgic.png';

function PatientDashboard() {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientsData = await getPatientsByAddress();
                console.log('Patients Data By Address :: ', patientsData);

                const doctorData = await getDoctorDetails();
                console.log('Doctor data By Address :: ', doctorData);

                setName(patientsData[1] || 'N/A');
                setEmail(patientsData[4] || 'N/A');
                setAddress(patientsData[5]?.address || 'N/A'); // Adjust based on actual structure
                setAge(BigNumber.from(patientsData[2]?._hex || '0').toNumber());
                setId(BigNumber.from(patientsData[0]?._hex || '0').toNumber());

                setPatients(patientsData);
            } catch (err) {
                console.error('Failed to load data: ', err);
            }
        };
        fetchData();
    }, [name]);

    return (
        <div className="profile-dashboard">
            {/* Profile Section */}
            <div className="card profile-card">
                <img
                    src={imgic} // Replace with actual image URL
                    alt="Profile"
                    className="profile-image"
                />
                <div className="profile-details">
                    <h2>{name}</h2>
                    <p className="status active">Active</p>
                    <p><strong>Patient Id:</strong>{id}</p>
                    <p><strong>Role:</strong> patients</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone:</strong> +91 0000 0000 00</p>
                    <p><strong>Address:</strong> 1 Main Street, Austin, TX, 78730</p>
                    <p><strong>Age:</strong>{age}</p>
                </div>
            </div>

            {/* Insurance Section */}
            <div className="card insurance-info">
                <h3>Insurance Information</h3>
                <p><strong>Medical Insurance:</strong> None</p>
                <p><strong>Vision Insurance:</strong> None</p>
                <p><strong>Dental Insurance:</strong> None</p>
            </div>

            {/* Medical Records Section */}
            <div className="card medical-records">
                <h3>Recent Medical Records</h3>
                <ul>
                    <li><strong>Last Visit:</strong> 12/10/2024</li>
                    <li><strong>Diagnosis:</strong> Hypertension</li>
                    <li><strong>Prescribed Medications:</strong> Amlodipine 5mg</li>
                    <li><strong>Next Follow-up:</strong> 01/15/2025</li>
                </ul>
            </div>

            {/* Appointments Section */}
            <div className="card appointments">
                <h3>Upcoming Appointments</h3>
                <ul>
                    <li><strong>Dr. Stephanie Branch:</strong> 01/15/2025 at 10:30 AM</li>
                    <li><strong>Annual Eye Checkup:</strong> 02/20/2025 at 02:00 PM</li>
                </ul>
            </div>

            {/* Test Results Section */}
            <div className="card test-results">
                <h3>Recent Test Results</h3>
                <ul>
                    <li><strong>Blood Test (12/05/2024):</strong> Normal</li>
                    <li><strong>Cholesterol:</strong> Elevated</li>
                    <li><strong>Blood Pressure:</strong> 140/90 mmHg</li>
                </ul>
            </div>
        </div>
    );
}

export default PatientDashboard;