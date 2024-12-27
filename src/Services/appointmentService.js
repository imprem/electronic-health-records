import axios from "axios";

export const applyForAppointment = (selectedVisitType, selectedDoctor, location, time, date, comments, status, duration, userId) => {
    console.log("Visit Type ::", selectedVisitType);
    console.log('Doctor     ::', selectedDoctor);
    console.log('Location   ::', location);
    console.log("Date       ::", date);
    console.log("Time       ::", time);
    console.log('Comment    :: ', comments);
    console.log("Status     ::", status);
    console.log("duration   :: ", duration)
    console.log('Patient ID ::', userId);

    try{
        const response = axios.post(`${process.env.REACT_APP_API}/patients/createappointment`,
            {
                visitType: selectedVisitType,
                doctor: selectedDoctor,
                location,
                time,
                date,
                comments,
                status,
                duration,
                userId,
              }
        );
        console.log("Appointment Created Successfully:", response.data);
    }catch(error){
        console.log();
        return error;
    }
};