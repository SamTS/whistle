pragma solidity ^0.4.24;

contract CryptoSource {
  mapping (string => bool) private proofs;

  function registerAttestation(string assetHash) {
    proofs[assetHash] = true;
  }

  function checkIfRegistered(string assetHash) constant returns (bool) {
    return proofs[assetHash];
  }

}
