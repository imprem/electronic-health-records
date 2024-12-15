import React, { useState, useEffect } from "react";
import './Adminbilling.css';
import axios from "axios";
import EditBilling from "./EditBilling";

function AdminBilling() {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [records, setRecords] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);

    const fetchBillingData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/billing`);
            console.log('Billing records:', response.data);
            setRecords(response.data);
        } catch (err) {
            console.error("Error fetching billing records:", err.message);
        }
    };
    
    useEffect(() => {
        fetchBillingData();
    }, []);

    // Delete
    const deleteByID = async (id) => {
        try {
            console.log(" Delete the record by ID :: ", id);
            await axios.delete(`${process.env.REACT_APP_API}/billing/delete/${id}`);
            fetchBillingData();
            console.log(`Record with ID ${id} deleted successfully`);
        } catch (err) {
            console.error("Error deleting record:", err.message);
        }
    };

    // View appointment details
    const handleViewAppointment = (appt) => {
        console.log("Viewing appointment:", appt);
    };

    const isoToDateInput = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split("T")[0];
    };

    // Edit
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setCurrentRecord({ ...currentRecord, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API}/billing/update/${currentRecord.BILL_ID}`, currentRecord);
            fetchBillingData();
            closeEditModal();
            console.log("Record updated successfully");
        } catch (err) {
            console.error("Error updating record:", err.message);
        }
    };

    const openEditModal = (record) => {
        setCurrentRecord(record);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentRecord(null);
    };

    return (
        <div className="table-container">
            <h2>Billing</h2>
            <div className="filter-section">
                <select
                    className="filter-select"
                    onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                </select>
                <button className="add-button">Add a New Bill</button>
            </div>

            <table className="billing-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Patient</th>
                        <th>Provider</th>
                        <th>Billed</th>
                        <th>Ins Paid</th>
                        <th>Pt Paid</th>
                        <th>Note</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td>{record.BILL_ID}</td>
                            <td>{isoToDateInput(record.APPOINTMENT_DATE)}</td>
                            <td>{record.PATIENT}</td>
                            <td>{record.DOCTOR}</td>
                            <td className="billed">${record.BILLED}</td>
                            <td>${record.INS_PAID}</td>
                            <td className="pt-paid">${record.PT_PAID}</td>
                            <td>{record.NOTE}</td>
                            <td className="action-icons">
                                <button
                                    className="action-button view"
                                    onClick={() => handleViewAppointment(record)}
                                >
                                    👁️
                                </button>
                                <button
                                    className="action-button edit"
                                    onClick={() => openEditModal(record)}
                                >
                                    ✏️
                                </button>
                                <button
                                    className="action-button delete"
                                    onClick={() => deleteByID(record.BILL_ID)}
                                >
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {isEditModalOpen && currentRecord && (
                <EditBilling
                    record={currentRecord}
                    onSave={handleSaveChanges}
                    onClose={closeEditModal}
                    onChange={handleFieldChange}
                />
            )}
        </div>
    );
}

export default AdminBilling;