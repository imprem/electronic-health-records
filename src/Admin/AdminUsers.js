import React, { useState, useEffect } from 'react';
import './Adminuser.css'
import axios from "axios";

function AdminUsers() {
    const tabs = ["Patients", "Doctors", "Nurses"];
    const [selectedTab, setSelectedTab] = useState("Doctors");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          setError("");
          try {
            console.log('hhhhhhh:: ', selectedTab);
            // const response = await axios.get(`${process.env.REACT_APP_API}/usersbyrole/${selectedTab.toLowerCase()}`);
            const response = await axios.get(`${process.env.REACT_APP_API}/usersbyrole`, {
                params: {
                    role: selectedTab.toLowerCase()
                }
            });
            setData(response.data);
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

      <div className="data-container">
        {loading && <p>Loading {selectedTab}...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && data.length > 0 && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Account Address</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={index}>
                  <td>{user.NAME}</td>
                  <td>{user.ROLE}</td>
                  <td>{user.EMAIL}</td>
                  <td>{user.GENDER}</td>
                  <td>{user.PHONE}</td>
                  <td>{user.PASSWORD}</td>
                  <td>{user.USER_ACCOUNT_ADDRESS}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && !error && data.length === 0 && <p>No data found for {selectedTab}.</p>}
      </div>

    </div>
  );
}

export default AdminUsers;