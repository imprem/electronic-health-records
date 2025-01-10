import React, { useEffect, useState } from 'react';
import imgic from '../../image/imgic.png';
import { getAllAppointment, getDoctorDetails } from '../../Services/getUsersServices';
import { BigNumber } from 'ethers';

function DoctorDashboard() {
    const [docID, setDocId] = useState(0); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] =useState('');
    const [qualification, setQualification] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        try {
            const doc = await getDoctorDetails();
            console.log('### Doc :: ', doc);
            console.log('##@ ', doc[6]);

            setDocId(BigNumber.from(doc[0]?._hex || '0').toNumber());
            setName(doc[1] || 'N/A');
            setEmail(doc[3] || 'N/A');
            setGender(doc[2] || 'N/A');
            setQualification(doc[4] || 'N/A');
            setSpecialization(doc[5] || 'N/A');

            const appointment = await getAllAppointment();
            const filteredAppointments = appointment.filter(
                (appt) => appt[2] === doc[1] 
            );

            console.log('### Filtered Appointments :: ', filteredAppointments);
            setAppointments(filteredAppointments); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchAsyncData = async () => {
            await fetchData();
        };

        fetchAsyncData();
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
                    <p><strong>Doctor Id:</strong>{'DOC'+docID}</p>
                    <p><strong>Role:</strong> Doctor</p>
                    <p><strong>Email:</strong>{email}</p>
                    <p><strong>Gender:</strong>{gender}</p>
                    <p><strong>Qualification:</strong>{qualification}</p>
                    <p><strong>Specialization:</strong>{specialization}</p>
                </div>
            </div>

            {/* Insurance Section */}
            {/* <div className="card insurance-info"> */}
                {/* <h3>Insurance Information</h3>
                <p><strong>Medical Insurance:</strong> None</p>
                <p><strong>Vision Insurance:</strong> None</p>
                <p><strong>Dental Insurance:</strong> None</p> */}
            {/* </div> */}

            {/* Medical Records Section */}
            {/* <div className="card medical-records"> */}
                {/* <h3>Recent Medical Records</h3>
                <ul>
                    <li><strong>Last Visit:</strong> 12/10/2024</li>
                    <li><strong>Diagnosis:</strong> Hypertension</li>
                    <li><strong>Prescribed Medications:</strong> Amlodipine 5mg</li>
                    <li><strong>Next Follow-up:</strong> 01/15/2025</li>
                </ul> */}
            {/* </div> */}

            {/* Appointments Section */}
            <div className="card appointments">
                <h3>Upcoming Appointments</h3>
                <ul>
                    {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                        <li key={index}>
                        <strong>Patient Name:</strong> {appointment.patientName}{" "}
                        <strong>Date:</strong> <span>{appointment.date} at {appointment.time}</span>
                        </li>
                    ))
                    ) : (
                    <li>No upcoming appointments</li>
                )}
                </ul>
            </div>

            {/* Test Results Section */}
            {/* <div className="card test-results"> */}
                {/* <h3>Recent Test Results</h3> */}
                {/* <ul>
                    <li><strong>Blood Test (12/05/2024):</strong> Normal</li>
                    <li><strong>Cholesterol:</strong> Elevated</li>
                    <li><strong>Blood Pressure:</strong> 140/90 mmHg</li>
                </ul> */}
            {/* </div> */}
        </div>
    );
}

export default DoctorDashboard;