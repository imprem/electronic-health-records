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

export const addMedication = async (id, name, gender, age, patientAddress, medicineDetails) => {
    console.log('### Attend Patient !!!');
    console.log('Id :: ', id);
    console.log('Name :: ', name);
    console.log('Gender  :: ', gender);
    console.log('Age :: ', age);
    console.log('Patient Address :: ', patientAddress);
    console.log('MedicineDetails :: ', medicineDetails);
    console.log('medicineDetails name           :: ', medicineDetails.Mname);
    console.log('medicineDetails.dose           :: ', medicineDetails.dose);
    console.log('medicineDetails.quantity       :: ', medicineDetails.quantity);
    console.log('medicineDetails.condition      :: ', medicineDetails.condition);
    console.log('medicineDetails.prescribedDate :: ', medicineDetails.prescribedDate);
    console.log('Address ========> ', userAddress);

    try{
        Swal.fire({
            title: 'Processing...',
            text: 'Please confirm the transaction in MetaMask and wait while we register the patient.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // console.log(deployedEHRContract);
        const txResponse = await deployedEHRContract.prescribeMedication(patientAddress, medicineDetails.Mname, medicineDetails.quantity, medicineDetails.condition, medicineDetails.prescribedDate);

        // Wait for the transaction to be mined
        await txResponse.wait();
        
        Swal.close();
        Swal.fire({
            title: 'Success!',
            text: `Medication added successfully. Transaction hash: ${txResponse.hash}`,
            allowOutsideClick: false,
            icon: 'success',
        });
        
        console.log('Transaction hash:', txResponse.hash);
        
        return {
            success: true,
            txHash: txResponse.hash,
        };
    }catch(error){

    }
}
