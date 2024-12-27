import React, { useState, useEffect } from 'react';
import './Adminuser.css'
import { getAllDoctors, getAllNurses, getAllPatients } from '../../Services/getUsersServices';
import { BigNumber } from "ethers";

function AdminUsers() {
    const tabs = ["Patients", "Doctors", "Nurses"];
    const [selectedTab, setSelectedTab] = useState("Doctors");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [doctors, setDoctors] = useState();
    const [nurses, setNurses] = useState();
    const [patients, setPatients] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        console.log('The Selected tab is:: ', selectedTab);
        if(selectedTab == 'Doctors'){
          const getdoctors = await getAllDoctors();
          console.log('Doctors data: ', getdoctors);
          setDoctors(getdoctors);
        }else if (selectedTab === 'Nurses') {
          const nursesData = await getAllNurses();
          console.log('Nurses data: ', nursesData);
          setNurses(nursesData);
        } else if (selectedTab === 'Patients') {
          const patientsData = await getAllPatients();
          console.log('Patients data: ', patientsData);
          setPatients(patientsData);
        }
      } catch (err) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <div className="app-container">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`tab-button ${selectedTab === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="content-container">
        {loading && <p>Loading {selectedTab} data...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div>
            <h2>{selectedTab} Data:</h2>
              {selectedTab === 'Doctors' && doctors ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Email</th>
                      <th>Qualifications</th>
                      <th>Specialization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((user, index) => (
                      <tr key={index}>
                        <td>{BigNumber.from(user.docID._hex).toNumber()}</td>
                        <td>{user.name}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                        <td>{user.qualifications}</td>
                        <td>{user.specialization}</td> 
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : selectedTab === 'Nurses' && nurses ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Qualifications</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                  {nurses.map((user, index) => (
                    <tr key={index}>
                      <td>{BigNumber.from(user.nurseID._hex).toNumber()}</td>
                      <td>{user.name}</td>
                      <td>{user.gender}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.qualifications}</td>
                      <td>{user.department}</td> 
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : selectedTab === 'Patients' && patients ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                  {patients.map((user, index) => (
                    <tr key={index}>
                      <td>{BigNumber.from(user.id._hex).toNumber()}</td>
                      <td>{user.name}</td>
                      <td>{user.gender}</td>
                      <td>{user.email}</td>
                      <td>{BigNumber.from(user.age._hex).toNumber()}</td>
                      <td>{user.patientAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : (
                <pre>{JSON.stringify('loading...', null, 2)}</pre>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;