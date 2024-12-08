import React from "react";
import "./MedicalRecordsTable.css";

const medicalRecords = [
  {
    date: "03/20/2020",
    name: "Prolactin",
    noteType: "History and Physical",
    author: "Dr. Branch",
    lastUpdated: "04/28/2020",
    lastUpdatedBy: "Stephanie Branch",
  },
  {
    date: "03/29/2020",
    name: "Bilirubin, total",
    noteType: "Cardiology consultation",
    author: "Dr. Branch",
    lastUpdated: "04/29/2020",
    lastUpdatedBy: "Stephanie Branch",
  },
  {
    date: "04/20/2020",
    name: "DHEA-sulphate",
    noteType: "History and Physical",
    author: "Dr. Sallivan",
    lastUpdated: "05/03/2020",
    lastUpdatedBy: "Jimmy Sallivan",
  },
  {
    date: "05/10/2020",
    name: "Free Urinary Cortisol",
    noteType: "History and Physical",
    author: "Dr. Meizer",
    lastUpdated: "05/27/2020",
    lastUpdatedBy: "Melissa Meizer",
  },
  {
    date: "05/15/2020",
    name: "Alcohol",
    noteType: "History and Physical",
    author: "Dr. Branch",
    lastUpdated: "05/28/2020",
    lastUpdatedBy: "Stephanie Branch",
  },
  {
    date: "05/20/2020",
    name: "Globuline",
    noteType: "Cardiology consultation",
    author: "Dr. Velaskez",
    lastUpdated: "05/28/2020",
    lastUpdatedBy: "Cris Velaskez",
  },
];

const MedicalRecordsTable = () => {
  return (
    <div>
      <h2>Medical Records</h2>
      <table className="records-table">
        <thead>
          <tr>
            <th className="header">Date</th>
            <th className="header">Name</th>
            <th className="header">Note Type</th>
            <th className="header">Author</th>
            <th className="header">Last Updated</th>
            <th className="header">Last Updated By</th>
            <th className="header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords.map((record, index) => (
            <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td className="cell">{record.date}</td>
              <td className="cell">{record.name}</td>
              <td className="cell">{record.noteType}</td>
              <td className="cell">{record.author}</td>
              <td className="cell">{record.lastUpdated}</td>
              <td className="cell">{record.lastUpdatedBy}</td>
              <td className="cell">
                <button className="action-button">👁</button>
                <button className="action-button">⬇</button>
                <button className="action-button">🖨</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecordsTable;