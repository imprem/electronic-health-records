import React, { useEffect, useState } from "react";
import { getAllAppointment, getDoctorDetails } from "../../Services/getUsersServices";
import { BigNumber } from 'ethers';
import { updateAppointmentStatus } from "../../Services/patientServices";

function Doc_scheduling() {
    const [allAppointment, setAllAppointment] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const fetchAppointments = async () => {
        try{
          const appointment = await getAllAppointment();
          console.log('appointment :: ', appointment);
          setAllAppointment(appointment);
          
          const doctor = await getDoctorDetails();
          console.log('Doctor name :: ', doctor[1]);

          const filteredAppointments = appointment.filter(
            (appt) => appt[2] === doctor[1] 
          );
      
          console.log(' =======> Filtered Appointments :: ', filteredAppointments);
          setAppointments(filteredAppointments); 
        }catch(error){
          console.log('Error Fetching doctoe', error);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleAccept = async (appt) => {
        console.log('### Accept button is clicked!!!');
        const appiAddress = appt.appiAddress;
        const newStatus = 'Scheduled';
        console.log('appiAddress :: ', appiAddress);
        await updateAppointmentStatus(appiAddress, newStatus);
    };

    const handleReject = async (appt) => {
        console.log('### Reject button is clicked!!!');
        const appiAddress = appt.appiAddress;
        const newStatus = 'Cancelled';
        console.log('appiAddress :: ', appiAddress);
        await updateAppointmentStatus(appiAddress, newStatus);
    };

    return (
        <div className="scheduling-container">
            <div className="appointments-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt, index) => (
                            <tr key={index}>
                                <td>{BigNumber.from(appt.appointmentID._hex).toNumber()}</td>
                                <td>{appt.patientName}</td>
                                <td>{appt.date}</td>
                                <td>
                                    {appt.time} ({BigNumber.from(appt.duration._hex).toNumber()} min duration)
                                </td>
                                <td>{appt.status}</td>
                                <td>
                                    <button className="action-button accept" onClick={() => handleAccept(appt)}>
                                        <span role="img" aria-label="accept">
                                            ✅
                                        </span>{" "}
                                        Accept
                                    </button>
                                    <button className="action-button reject" onClick={() => handleReject(appt)}>
                                        <span role="img" aria-label="reject">
                                            ❌
                                        </span>{" "}
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Doc_scheduling;