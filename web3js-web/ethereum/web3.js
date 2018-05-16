import Web3 from 'web3';

let w3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we are in the browser and metamask is running
  w3 = new Web3(window.web3.currentProvider);
} else {
  // we are on the server or user not running metamask
  const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/XI3pB6V9mTgtXBRb8CyM');
  w3 = new Web3(provider);
}

const web3 = w3;
export default web3;
