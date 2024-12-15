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
        signer = await provider.getSigner();
        
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
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
    console.log('###Adding new Doctor!!');
    console.log("Name               :: ", formData.name);
    console.log("Specialization     :: ", formData.specialization);
    console.log("Phone              :: ", formData.contactNumber);
    console.log("Email              :: ", formData.email);
    console.log("Date of Birth      :: ", formData.dateOfBirth);
    console.log("Gender             :: ", formData.gender);
    console.log("Qualifications     :: ", formData.qualifications);
    console.log("YearsOfExperience  :: ", formData.yearsOfExperience);
    console.log("ClinicHospitalName :: ", formData.clinicHospitalName);
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

        const requestBody = {
            ...formData,
            userAddress,
        };

        const [apiResponse, txResponse] = await Promise.all([
            axios.post(`${process.env.REACT_APP_API}/addnewdoctor`, requestBody),
            deployedEHRContract.addDoctor(userAddress, formData.name, formData.gender, formData.email, formData.qualifications, formData.specialization)
        ]);

        await txResponse.wait();
        Swal.close();

        Swal.fire({
            title: 'Success!',
            text: `Doctor added successfully. Transaction hash: ${txResponse.hash}`,
            allowOutsideClick: false,
            icon: 'success',
        });

        console.log('Doctor registered successfully:', apiResponse);
        console.log('Transaction hash:', txResponse.hash);

        return {
            success: true,
            apiResponse,
            txHash: txResponse.hash
        };
    }catch (error){
        Swal.close();
        Swal.fire({
            title: 'Error!',
            text: error.message || 'An error occurred while adding new doctor!!.',
            allowOutsideClick: false,
            icon: 'error',
        });
        console.log('An error occurred while adding new doctor!!', error);
        return error;
    }
}

// ###Adding new Nurse!!
export const AddNewNurses = async (formData) => {
    console.log('###Adding new Nurse!!');
    console.log("Name               :: ", formData.name);
    console.log("Department         :: ", formData.department);
    console.log("Phone              :: ", formData.contactNumber);
    console.log("Email              :: ", formData.email);
    console.log("Date of Birth      :: ", formData.dateOfBirth);
    console.log("Gender             :: ", formData.gender);
    console.log("Qualifications     :: ", formData.qualifications);
    console.log("YearsOfExperience  :: ", formData.yearsOfExperience);
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

        const requestBody = {
            ...formData,
            userAddress,
        };

        const [apiResponse, txResponse] = await Promise.all([
            axios.post(`${process.env.REACT_APP_API}/addnewnurses`, requestBody),
            deployedEHRContract.addNurse(userAddress, formData.name, formData.gender, formData.email, formData.phone,  formData.department, formData.qualifications)
        ]);

        await txResponse.wait();
        Swal.close();

        Swal.fire({
            title: 'Success!',
            text: `Nurse added successfully. Transaction hash: ${txResponse.hash}`,
            allowOutsideClick: false,
            icon: 'success',
        });

        console.log('Nurse registered successfully:', apiResponse);
        console.log('Transaction hash:', txResponse.hash);

        return {
            success: true,
            apiResponse,
            txHash: txResponse.hash
        };
    } catch (error){
        Swal.close();
        Swal.fire({
            title: 'Error!',
            text: error.message || 'An error occurred while adding new nurses!!.',
            allowOutsideClick: false,
            icon: 'error',
        });
        console.log('An error occurred while adding new nurses!!', error);
        return error;
    }
}

// ###Adding new Patient!!
export const AddNewPatient = async (formData) => {
    console.log('###Adding new Patient!!');
    console.log("Name               :: ", formData.name);
    console.log("Department         :: ", formData.department);
    console.log("Phone              :: ", formData.contactNumber);
    console.log("Email              :: ", formData.email);
    console.log("Date of Birth      :: ", formData.dateOfBirth);
    console.log("Gender             :: ", formData.gender);
    console.log("Qualifications     :: ", formData.qualifications);
    console.log("YearsOfExperience  :: ", formData.yearsOfExperience);
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

        const requestBody = {
            ...formData,
            userAddress,
        };

        const [apiResponse, txResponse] = await Promise.all([
            axios.post(`${process.env.REACT_APP_API}/addnewpatients`, requestBody),
            deployedEHRContract.addNurse(userAddress, formData.name, formData.gender, formData.email, formData.phone,  formData.department, formData.qualifications)
        ]);

        await txResponse.wait();
        Swal.close();

        Swal.fire({
            title: 'Success!',
            text: `Patient added successfully. Transaction hash: ${txResponse.hash}`,
            allowOutsideClick: false,
            icon: 'success',
        });

        console.log('Patient registered successfully:', apiResponse);
        console.log('Transaction hash:', txResponse.hash);

        return {
            success: true,
            apiResponse,
            txHash: txResponse.hash
        };
    } catch (error){
        Swal.close();
        Swal.fire({
            title: 'Error!',
            text: error.message || 'An error occurred while adding new patient!!.',
            allowOutsideClick: false,
            icon: 'error',
        });
        console.log('An error occurred while adding new patient!!', error);
        return error;
    }
}