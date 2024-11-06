import Web3 from 'web3';

export const connectToMetaMask = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];
      console.log("Public address ", userAddress);
      console.log('MetaMask is connected!');
      return userAddress;
    } catch (error) {
      console.error('User rejected the request', error);
      throw new Error('User rejected the request');
    }
  } else {
    alert('MetaMask is not installed.');
    throw new Error('MetaMask is not installed');
  }
};