import React, { useEffect, useState } from "react";
import './MedicationsTable.css';
import { getDoctorDetailsByAddress, getMedicationsData } from "../../Services/getUsersServices";
import { BigNumber } from "ethers";

const Medications = () => {
  const [medications, setMedications] = useState([]);
  const [providerNames, setProviderNames] = useState({});

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const medicationsData = await getMedicationsData();
        console.log("Medications data: ", medicationsData);
        setMedications(medicationsData);

        // Fetch provider names
        const providers = medicationsData.map((med) => med.provider);
        const uniqueProviders = [...new Set(providers)];
        const providerDetails = {};

        for (const provider of uniqueProviders) {
          providerDetails[provider] = await getDoctorDetailsByAddress(provider);
        }
        console.log(':: ', providerDetails)
        setProviderNames(providerDetails);
      } catch (error) {
        console.error("Error fetching Medications: ", error);
      }
    };

    fetchMedications();
  }, []);

  const formatdate = (date) => {
    const formattedDate = date.split("-").reverse().join("/");
    return formattedDate;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Medications</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Medication Name</th>
            <th>Quantity</th>
            <th>Condition</th>
            <th>Provider</th>
            <th>Prescribed</th>
            <th>Renew By</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication, index) => (
            <tr key={index}>
              <td>
                {medication.meditionId && medication.meditionId._hex
                  ? BigNumber.from(medication.meditionId._hex).toNumber()
                  : "N/A"}
              </td>
              <td>{medication.name}</td>
              <td>
                {medication.quantity && medication.quantity._hex
                  ? BigNumber.from(medication.quantity._hex).toNumber()
                  : "N/A"}
              </td>
              <td>{medication.condition}</td>
              <td>{providerNames[medication.provider][1] || "Loading..."}</td>
              <td>
                {medication.prescribedDate && medication.prescribedDate._hex
                  ? new Date(BigNumber.from(medication.prescribedDate._hex).toNumber() * 1000).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{formatdate(medication.renewByDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medications;
