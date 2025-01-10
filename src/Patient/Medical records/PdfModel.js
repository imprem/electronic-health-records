import React from "react";
import './Model.css';

const PdfModel = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;
   
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          <iframe
            src={content}
            style={{ width: '100%', height: '500px', border: 'none' }}
            title="Policy Document"
          />
        </div>
      </div>
    );
  };
   
export default PdfModel;