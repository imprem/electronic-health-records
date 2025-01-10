import Swal from 'sweetalert2';
import { ethers } from 'ethers';
import { connectToMetaMask } from './connectToMetaMask';
import ehrabi from '../contractabi/EHRS.json';
import appointmentabi from '../contractabi/AppointmentManager.json';

let userAddress = null;
let provider = null;
let signer = null;
let deployedEHRContract = null;
let deployedAppointmentManager = null;

const initializeBlockchain = async () => {
    try {
        userAddress = await connectToMetaMask();
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        // const ehrsContractAddress = process.env.REACT_APP_EHRS_CONTRACT_ADDRESS;
        // if (!ehrsContractAddress) {
        //     throw new Error('EHR contract address not found in environment variables.');
        // }

        // Initialize EHR contract
        // deployedEHRContract = new ethers.Contract(ehrsContractAddress, ehrabi.abi, signer);
        // console.log("EHR Contract Initialization done...");

        const appointmentsContractAddress = process.env.REACT_APP_APPOINTMENT_CONTRACT_ADDRESS;
        if (!appointmentsContractAddress) {
            throw new Error('Appointment Manager contract address not found in environment variables.');
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

export const createAppointments = async (selectedPatient, selectedDoctor, date, time, duration, comments) => {
    console.log('### Create New Appointment handle submit');
    console.log('Doctor Name     :: ', selectedDoctor);
    console.log('Patient Name    :: ', selectedPatient);
    console.log('Time            :: ', time);
    console.log('Date            :: ', date);
    console.log('Duration        :: ', duration);
    console.log('Comments        :: ', comments);

    try {
        Swal.fire({
            title: 'Processing...',
            text: 'Please confirm the transaction in MetaMask and wait while we register the appointment.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Call the smart contract function
        const txResponse = await deployedAppointmentManager.scheduleAppointment(userAddress, selectedPatient, selectedDoctor, date, time, duration, comments,
            { gasLimit: ethers.utils.hexlify(500000) } // Gas limit as a hex value
        );
       
        // Wait for the transaction to be mined
        const receipt = await txResponse.wait();

        Swal.close();
        Swal.fire({
            title: 'Success!',
            text: `Appointment registered successfully. Transaction hash: ${receipt.transactionHash}`,
            allowOutsideClick: false,
            icon: 'success',
        });

        console.log('Transaction hash:', receipt.transactionHash);
        return {
            success: true,
            txHash: receipt.transactionHash,
        };
    } catch (error) {
        Swal.close();
        Swal.fire({
            title: 'Error!',
            text: 'Error during Add Appointment',
            allowOutsideClick: false,
            icon: 'error',
        });

        console.error('Error during Add Appointment:', error);
        return { success: false, error: error };
    }
}

export const updateAppointmentStatus = async (appiAddress, newStatus) => {
    console.log('### Update Appointment Status !!');
    console.log('Appointment address :: ', appiAddress);
    console.log('New Status :: ', newStatus);

    try{
        Swal.fire({
            title: 'Processing...',
            text: 'Please confirm the transaction in MetaMask and wait while we register the appointment.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Call the smart contract function
        const txResponse = await deployedAppointmentManager.updateAppointmentStatus(appiAddress, newStatus,
            { gasLimit: ethers.utils.hexlify(500000) } // Gas limit as a hex value
        );
       
        // Wait for the transaction to be mined
        const receipt = await txResponse.wait();

        Swal.close();
        Swal.fire({
            title: 'Success!',
            text: `Status successfully updated. Transaction hash: ${receipt.transactionHash}`,
            allowOutsideClick: false,
            icon: 'success',
        });

        console.log('Transaction hash:', receipt.transactionHash);
        return {
            success: true,
            txHash: receipt.transactionHash,
        };
    }catch(error){
        Swal.close();
        Swal.fire({
            title: 'Error!',
            text: 'Error during Update ststus!!',
            allowOutsideClick: false,
            icon: 'error',
        });

        console.error('Error during Update ststus:', error);
        return { success: false, error: error };
    }
};