import axios from 'axios';
import Swal from 'sweetalert2';
import { ethers } from 'ethers';
import { connectToMetaMask } from './connectToMetaMask';
import ehrabi from '../contractabi/EHRS.json';

let userAddress;
let provider;
let signer;
let deployedEHRContract;

const initializeBlockchain = async () => {
    try {
        userAddress = await connectToMetaMask();
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        const contractAddress = process.env.REACT_APP_EHRS_CONTRACT_ADDRESS;
        if (!contractAddress) {
            throw new Error('Contract address not found in environment variables.');
        }

        // Initialize contract
        deployedEHRContract = new ethers.Contract(contractAddress, ehrabi.abi, signer);
        console.log("EHR Contract Initialization done...");
    } catch (error) {
      console.error('Initialization failed:', error);
      userAddress = null;
    }
};

initializeBlockchain();

// ### Getting user details from user using public key
export const getUserDetailsByPublickey = async (account) => {
    try{
        console.log('Getting user details from user using public key !!');
        console.log('Account :: ', account);
        const response = await axios.get(`${process.env.REACT_APP_API}/getUserbypublickey`, { params: { account } });
        return response;
    }catch(error){
        console.error('Get user by public :: ', error);
        return error;
    }
}

// ###Adding new Doctor!!
export const AddRecord = async (formData) => {
    console.log('### Adding new Doctor!!');
    console.log("Name               :: ", formData.name);
    console.log("Specialization     :: ", formData.specialization);
    console.log("Phone              :: ", formData.contactNumber);
    console.log("Email              :: ", formData.email);
    console.log("Gender             :: ", formData.gender);
    console.log("Qualifications     :: ", formData.qualifications);
    console.log("Customer Address   :: ", userAddress);

    try {
        Swal.fire({
            title: 'Processing...',
            text: 'Please confirm the transaction in MetaMask and wait while we register the doctor.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Call the smart contract's addDoctor method
        const txResponse = await deployedEHRContract.addDoctor(
            userAddress,
            formData.name,
            formData.gender,
            formData.email,
            formData.qualifications,
            formData.specialization,
            {
                gasLimit: 500000, // Optional: Adjust if needed
            }
        );

        // Wait for the transaction to be mined
        const receipt = await txResponse.wait();

        Swal.close();
        Swal.fire({
            title: 'Success!',
            text: `Doctor registered successfully. Transaction hash: ${receipt.transactionHash}`,
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

        // Extract detailed error message
        let errorMessage = 'An unknown error occurred.';
        if (error.data && error.data.message) {
            errorMessage = error.data.message; // Revert reason from blockchain
        } else if (error.message) {
            errorMessage = error.message; // General error message
        }

        // Handle known errors
        if (errorMessage.includes('Doctor already exists')) {
            errorMessage = 'Doctor already exists. Please try with a new entry.';
        }

        Swal.fire({
            title: 'Error!',
            text: errorMessage,
            allowOutsideClick: false,
            icon: 'error',
        });

        console.error('Error during AddRecord:', errorMessage);
        return { success: false, error: errorMessage };
    }
};

// ###Adding new Nurse!!
export const AddNewNurses = async (formData) => {
    console.log('###Adding new Nurse!!');
    console.log("Customer Address   :: ", userAddress);
    console.log("Name               :: ", formData.name);
    console.log("Gender             :: ", formData.gender);
    console.log("Email              :: ", formData.email);
    console.log("Phone              :: ", formData.contactNumber);
    console.log("Department         :: ", formData.department);
    console.log("Qualifications     :: ", formData.qualifications);

    try {
        Swal.fire({
            title: 'Processing...',
            text: 'Please confirm the transaction in MetaMask and wait while we register the doctor.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Call the smart contract's addDoctor method
        const txResponse = await deployedEHRContract.addNurse(
            userAddress,
            formData.name,
            formData.gender,
            formData.email,
            formData.contactNumber,
            formData.department,
            formData.qualifications,
            {
                gasLimit: 500000, // Optional: Adjust if needed
            }
        );
        // Wait for the transaction to be mined
        const receipt = await txResponse.wait();

        Swal.close();
        Swal.fire({
            title: 'Success!',
            text: `Nurse registered successfully. Transaction hash: ${receipt.transactionHash}`,
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

        // Extract detailed error message
        let errorMessage = 'An unknown error occurred.';
        if (error.data && error.data.message) {
            errorMessage = error.data.message; // Revert reason from blockchain
        } else if (error.message) {
            errorMessage = error.message; // General error message
        }

        // Handle known errors
        if (errorMessage.includes('Nurse already exists')) {
            errorMessage = 'Nurse already exists. Please try with a new entry.';
        }

        Swal.fire({
            title: 'Error!',
            text: errorMessage,
            allowOutsideClick: false,
            icon: 'error',
        });
        console.error('Error during Add nurses Record:', errorMessage);
        return { success: false, error: errorMessage };
    }
}

// ###Adding new Patient!!
export const AddNewPatient = async (formData) => {
    console.log('###Adding new Patient!!');
    console.log("Name               :: ", formData.name);
    console.log("Phone              :: ", formData.contactNumber);
    console.log("Email              :: ", formData.email);
    console.log("Gender             :: ", formData.gender);
    console.log("Customer Address   :: ", userAddress);

    try {
        Swal.fire({
            title: 'Processing...',
            text: 'Please confirm the transaction in MetaMask and wait while we register the patient.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Send the transaction with a manual gas limit if needed
        const txResponse = await deployedEHRContract.addPatient(
            userAddress,
            formData.name,
            formData.age,
            formData.gender,
            formData.email,
            {
                gasLimit: 500000, // Optional, adjust as needed
            }
        );

        // Wait for the transaction to be mined
        await txResponse.wait();

        Swal.close();
        Swal.fire({
            title: 'Success!',
            text: `Patient added successfully. Transaction hash: ${txResponse.hash}`,
            allowOutsideClick: false,
            icon: 'success',
        });

        console.log('Transaction hash:', txResponse.hash);

        return {
            success: true,
            txHash: txResponse.hash,
        };
    } catch (error) {
        Swal.close();
        let errorMessage = 'An unknown error occurred.';
        if (error.data && error.data.message) {
            errorMessage = error.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        if (errorMessage.includes('Patient already exists')) {
            errorMessage = 'Patient already exists. Please try with a new patient.';
        }
        Swal.fire({
            title: 'Error!',
            text: errorMessage,
            allowOutsideClick: false,
            icon: 'error',
        });
        console.error('Error during AddNewPatient:', error);
        return { success: false, error: errorMessage };
    }
};