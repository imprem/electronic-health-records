import React, { useState } from 'react';
import './MedicalBills.css'

const Medical_bills = () => {
  const [bills, setBills] = useState([
    { id: 1, amount: 45.0, status: 'Paid', physician: 'Stephanie Branch', description: 'Annual Physical', date: '05/01/2020' },
    { id: 2, amount: 388.2, status: 'Overdue', physician: 'Stephanie Branch', description: 'ACL Reconstruction', date: '05/04/2020' },
    { id: 3, amount: 56.0, status: 'Overdue', physician: 'Jimmy Sullivan', description: 'MMR Immunization', date: '05/10/2020' },
    { id: 4, amount: 30.0, status: 'Due 05/30/2020', physician: 'Melissa Meizer', description: 'Annual Tests', date: '05/15/2020' },
    { id: 5, amount: 900.0, status: 'Due 05/30/2020', physician: 'Stephanie Branch', description: 'Eye Surgery', date: '05/20/2020' },
    { id: 6, amount: 87.0, status: 'Due 05/30/2020', physician: 'Cris Velaskez', description: 'Ear Consultation', date: '05/21/2020' },
  ]);

  const handlePayBill = (id) => {
    alert(`Paying bill with ID: ${id}`);
  };

  return (
    <div className="medical-bills">
      <h2>Medical Bills</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Amount Due</th>
            <th>Status</th>
            <th>Physician</th>
            <th>Description</th>
            <th>Date of Service</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td style={{ color: bill.status.includes('Overdue') ? 'red' : '' }}>
                ${bill.amount.toFixed(2)}
              </td>
              <td style={{ color: bill.status.includes('Overdue') ? 'red' : 'green' }}>{bill.status}</td>
              <td>{bill.physician}</td>
              <td>{bill.description}</td>
              <td>{bill.date}</td>
              <td>
                <button onClick={() => handlePayBill(bill.id)}>Pay Bill</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medical_bills;