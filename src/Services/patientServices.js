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
        
        const ehrsContractAddress = process.env.REACT_APP_EHRS_CONTRACT_ADDRESS;
        if (!ehrsContractAddress) {
            throw new Error('EHR contract address not found in environment variables.');
        }

        // Initialize EHR contract
        deployedEHRContract = new ethers.Contract(ehrsContractAddress, ehrabi.abi, signer);
        console.log("EHR Contract Initialization done...");

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

export const createAppointment = async (doctorAddress, date, time, duration, status, comments) => {
    const userAddress1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const doctorAddress1 = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';
    const date1 ='121';
    const time1 = '10:10';
    const duration1 ='10';
    const comments1 ='hhhh';

    console.log('### Create Appointment ::');
    console.log('Patient Address ::', userAddress1);
    console.log('Doctor Address  ::', doctorAddress1);
    console.log('Date            ::', date1);
    console.log('Time            ::', time1);
    console.log('Duration        ::', duration1);
    console.log('Status          ::', status);
    console.log('Comments        ::', comments1);

    if (!deployedAppointmentManager || !deployedAppointmentManager.createAppointment) {
        console.error('AppointmentManager contract is not initialized properly.');
        return { success: false, error: 'Contract not initialized.' };
    }

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
        // const txResponse = await deployedAppointmentManager.createAppointment(
        //     userAddress,
        //     doctorAddress,
        //     date,
        //     time,
        //     duration,
        //     comments,
        //     { gasLimit: ethers.utils.hexlify(500000) } // Gas limit as a hex value
        // );

        const txResponse = await deployedAppointmentManager.createAppointment(
            userAddress1,
            doctorAddress1,
            date1,
            time1,
            duration1,
            comments1,
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