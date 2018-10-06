pragma solidity ^0.4.24;

contract CryptoSource {
  mapping (string => bool) private attestations;

  function registerAttestation(string assetHash) {
    attestations[assetHash] = true;
  }

  function checkIfRegistered(string assetHash) constant returns (bool) {
    return attestations[assetHash];
  }

}
