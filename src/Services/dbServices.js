import axios from 'axios';

export const getUserDetailsByPublickey = async (account) => {
    try{
        console.log("AAAAAAAAAAAAAAAA:: ",account);
        const response = await axios.get(`${process.env.REACT_APP_API}/getUserbypublickey`, { params: { account } });
        return response;
    }catch(error){
        console.error(error);
        return error;
    }
}