import axios from 'axios';
import Swal from 'sweetalert2';
import { ethers } from 'ethers';
import { connectToMetaMask } from './connectToMetaMask';
import ehrabi from '../contractabi/EHRS.json';
import appointmentabi from '../contractabi/AppointmentManager.json';

let userAddress;
let provider;
let signer;
let deployedEHRContract;
let deployedAppointmentManager;

const initializeBlockchain = async () => {
    try {
        userAddress = await connectToMetaMask();
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        const ehrsContractAddress = process.env.REACT_APP_EHRS_CONTRACT_ADDRESS;
        if (!ehrsContractAddress) {
            throw new Error('Contract address not found in environment variables.');
        }

        // Initialize ehrs contract
        deployedEHRContract = new ethers.Contract(ehrsContractAddress, ehrabi.abi, signer);
        console.log("EHR Contract Initialization done...");

        const appointmentsContractAddress = process.env.REACT_APP_APPOINTMENT_CONTRACT_ADDRESS;
        if (!appointmentsContractAddress) {
            throw new Error('Contract address not found in environment variables.');
        }
        // Initialize AppointmentManager contract
        deployedAppointmentManager = new ethers.Contract(appointmentsContractAddress, appointmentabi.abi, signer);
        console.log('Appointment Manager Initialization done...');
    } catch (error) {
      console.error('Initialization failed:', error);
      userAddress = null;
    }
};

initializeBlockchain();

export const getAllDoctors = async () => {
    console.log('### Fatching all Doctors !!');
    const allDoctor = await deployedEHRContract.getAllDoctor();
    console.log('### All Doctors :: ',allDoctor);
    return allDoctor;
}

export const getAllNurses = async () => {
    console.log('### Fatching all Nurses !!');
    const allNurses = await deployedEHRContract.getAllNurses();
    console.log('### All Nurses :: ', allNurses);
    return allNurses;
}

export const getAllPatients = async () => {
    console.log('### Fatching all Patients !!');
    const allPatients = await deployedEHRContract.getAllPatient();
    console.log('### All Patients :: ',allPatients);
    return allPatients;
}

export const getPatientsByAddress = async () => {
    console.log('### Get Patient By Address :: ', userAddress);
    const patient = await deployedEHRContract.getPatientDetails(userAddress);
    return patient;
}

export const getDoctorDetails = async () => {
    console.log('### Get Doctor By Address :: ', userAddress);
    const doctor = await deployedEHRContract.getDoctorDetails(userAddress);
    return doctor;
}

export const getMedicationsData = async () => {
    console.log('### Get Medications By Address :: ', userAddress);
    const medications = await deployedEHRContract.getPrescribedMedications(userAddress);
    return medications;
}

export const getDoctorDetailsByAddress = async (doctorAddress) => {
    console.log('### Get Doctor By Address :: ', doctorAddress);
    const doctor = await deployedEHRContract.getDoctorDetails(doctorAddress);
    return doctor;
}