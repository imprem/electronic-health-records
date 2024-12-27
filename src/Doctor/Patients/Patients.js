import React, { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { getAllPatients } from "../../Services/getUsersServices";
import { useNavigate } from "react-router-dom";

function Patients() {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientsData = await getAllPatients();
                console.log("Patients data: ", patientsData);
                setPatients(patientsData);
            } catch (error) {
                console.error("Error fetching patients: ", error);
            }
        };
        fetchPatients();
    }, []);

    const handleAttend = (user) => {
        const patientDetails = {
            id: user.id && user.id._hex ? BigNumber.from(user.id._hex).toNumber() : "N/A",
            name: user.name || "N/A",
            gender: user.gender || "N/A",
            age: user.age && user.age._hex ? BigNumber.from(user.age._hex).toNumber() : "N/A",
            patientAddress: user.patientAddress || "N/A",
        };
        navigate("/doctor/attend-patient", { state: { patientDetails } });
    };

    return (
        <div className="app-container">
            <div className="content-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.length > 0 ? (
                            patients.map((user, index) => (
                                <tr key={index}>
                                    <td>
                                        {user.id && user.id._hex
                                            ? BigNumber.from(user.id._hex).toNumber()
                                            : "N/A"}
                                    </td>
                                    <td>{user.name || "N/A"}</td>
                                    <td>{user.gender || "N/A"}</td>
                                    <td>{user.email || "N/A"}</td>
                                    <td>
                                        {user.age && user.age._hex
                                            ? BigNumber.from(user.age._hex).toNumber()
                                            : "N/A"}
                                    </td>
                                    <td>{user.patientAddress || "N/A"}</td>
                                    <td>
                                        <button
                                            className="action-button accept"
                                            onClick={() => handleAttend(user)}
                                        >
                                            <span role="img" aria-label="accept">
                                                ✅
                                            </span>{" "}
                                            Attend
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No patients found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Patients;