import React from "react";
import './MedicationsTable.css'

const medications = [
  {
    id:1,
    name: "Albuterol HFA",
    dose: "2 puffs",
    frequency: "q4h prn",
    quantity: "-",
    refills: 12,
    condition: "Asthma",
    provider: "Dr. Michell Rodriguez",
    prescribed: "02/10/2018",
    renewBy: "04/15/2020",
  },
  {
    id:2,
    name: "Aspirin",
    dose: "80 mg",
    frequency: "1 daily",
    quantity: "-",
    refills: 12,
    condition: "Diabetes",
    provider: "Dr. Michell Rodriguez",
    prescribed: "03/03/2018",
    renewBy: "04/15/2020",
  },
  {
    id:3,
    name: "Beclomethasone HFA",
    dose: "2 puffs",
    frequency: "1 bid",
    quantity: "-",
    refills: 12,
    condition: "Asthma",
    provider: "Dr. Michell Rodriguez",
    prescribed: "03/03/2018",
    renewBy: "04/15/2020",
  },
  {
    id:4,
    name: "Carvedilol",
    dose: "12.5 mg",
    frequency: "1 daily",
    quantity: "90",
    refills: 3,
    condition: "Hypertension",
    provider: "Dr. Michell Rodriguez",
    prescribed: "03/05/2018",
    renewBy: "04/15/2020",
  },
  {
    id:5,
    name: "Chlorthalidone",
    dose: "25 mg",
    frequency: "1 daily",
    quantity: "90",
    refills: 3,
    condition: "Hypertension",
    provider: "Dr. Michell Rodriguez",
    prescribed: "03/05/2018",
    renewBy: "04/15/2020",
  },
  {
    id:6,
    name: "Citalopram",
    dose: "25 mg",
    frequency: "1 daily",
    quantity: "90",
    refills: 3,
    condition: "Depression",
    provider: "Dr. John Doe",
    prescribed: "12/10/2018",
    renewBy: "04/15/2020",
  },
  {
    id:7,
    name: "Gabapentin",
    dose: "600 mg",
    frequency: "1 bid",
    quantity: "180",
    refills: 11,
    condition: "Neuropathic pain",
    provider: "Dr. Michell Rodriguez",
    prescribed: "12/22/2018",
    renewBy: "04/15/2020",
  },
  {
    id:8,
    name: "Insulin Glargine",
    dose: "29 units",
    frequency: "1 daily",
    quantity: "180",
    refills: 11,
    condition: "Diabetes",
    provider: "Dr. Ivan Jones",
    prescribed: "03/19/2019",
    renewBy: "04/15/2020",
  },
];

const Medications = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Medications</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Medication Name</th>
            <th>Dose</th>
            <th>Frequency</th>
            <th>Quantity</th>
            <th>Refills</th>
            <th>Condition</th>
            <th>Provider</th>
            <th>Prescribed</th>
            <th>Renew By</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication, index) => (
            <tr key={index}>
              <td>{medication.id}</td>
              <td>{medication.name}</td>
              <td>{medication.dose}</td>
              <td>{medication.frequency}</td>
              <td>{medication.quantity}</td>
              <td>{medication.refills}</td>
              <td>{medication.condition}</td>
              <td>{medication.provider}</td>
              <td>{medication.prescribed}</td>
              <td>{medication.renewBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medications;