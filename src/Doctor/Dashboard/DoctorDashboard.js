import React, { useEffect, useState } from 'react';
import imgic from '../../image/imgic.png';
import { getDoctorDetails } from '../../Services/getUsersServices';
import { BigNumber } from 'ethers';

function DoctorDashboard() {
    const [docID, setDocId] = useState(0); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] =useState('');
    const [qualification, setQualification] = useState('');
    const [specialization, setSpecialization] = useState('');

    const fetchData = async () => {
        const doc = await getDoctorDetails();
        console.log('### Doc :: ', doc);
        setDocId(BigNumber.from(doc[0]?._hex || '0').toNumber());
        setName(doc[1] || 'N/A');
        setEmail(doc[3] || 'N/A');
        setGender(doc[2] || 'N/A');
        setQualification(doc[4] || 'N/A');
        setSpecialization(doc[5] || 'N/A');
    }

    useEffect(() => {

        fetchData();
    }, []);

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
                    <li><strong>Patient Name : Arjun sinsh</strong> 01/15/2025 at 10:30 AM</li>
                    <li><strong>Annual Eye Checkup:</strong> 02/20/2025 at 02:00 PM</li>
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