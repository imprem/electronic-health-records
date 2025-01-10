import React, { useEffect, useState } from "react";
import "./MedicalRecordsTable.css";
import { getPatientsByAddress, deleteMedicalRecord } from "../../Services/getUsersServices";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import PdfModel from "./PdfModel";

const MedicalRecordsTable = () => {
  const [patientRecords, setPatientRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [currentPdf, setCurrentPdf] = useState(null);
  // const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const patient = await getPatientsByAddress();
      console.log('Patient Records: ', patient[6]);
      setPatientRecords(patient[6]);
    } catch (error) {
      console.error("Error fetching patient records:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const viewFile = async (hash) => {
    const url = `https://ipfs.io/ipfs/${hash}`;
    const proxyUrl = `http://localhost:8081/${url}`; // Use custom proxy
  
    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      setCurrentPdf(pdfUrl);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching the PDF:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPdf(null);
  };

  // Function to delete a file (remove IPFS hash from state)
  const deleteFile = (index) => {
    try{
      deleteMedicalRecord(index);
      const newRecords = [...patientRecords];
      newRecords.splice(index, 1);
      setPatientRecords(newRecords);
    }catch(err){
      console.error("Error while deleting file:", err);
    } 
  };

  console.log('===H=> ', patientRecords);
  // Function to download the file directly
  const downloadFile = (hash) => {
    console.log('Download the file directly!!!');
    const url = `https://ipfs.io/ipfs/${hash}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = `${hash}.pdf`; // Set a default filename
    link.click();
  };
  console.log(patientRecords);
  return (
    <div className="container">
      <h2>Patient Medical Records</h2>
      <div className="file-container">
        {patientRecords.map((hash, index) => (
          <div key={index} className="file">
            {/* File Icon */}
            <div className="file-icon">📄</div>

            {/* File Hash */}
            <div className="file-hash">{hash}</div>

            {/* Button Container */}
            <div className="button-container">
              {/* View Button */}
              <button
                className="view-button"
                onClick={() => viewFile(hash)}
              >
                View
              </button>
               {/* Download Button */}
               <button
                className="download-button"
                onClick={() => downloadFile(hash)}
              >
                Download
              </button>
              {/* Delete Button */}
              <button
                className="delete-button"
                onClick={() => deleteFile(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for displaying PDF */}
      <PdfModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={currentPdf}
    />
    </div>
  );
};

export default MedicalRecordsTable;