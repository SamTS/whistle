pragma solidity ^0.4.24;

contract CryptoSource {
  mapping (bytes32 => bool) private proofs;

  address[] accountList;

  mapping (address => TalkerAccount) accounts;

  struct TalkerAccount {
    mapping (bytes32 => Proof) proofs;
    bytes32[] proofList;
    bool exists;
  }

  //data hash is used as key, can't have a proof without a key
  struct Proof {
    uint datePosted;
    //dateAfter represents date
    uint dateAfter;
    bool verified;
  }

  event AnnounceValidation(
    address talker,
    bytes32 dataHash,
    string data
  );

  event postToBlog(
    address talker,
    string title,
    string content
  );

  //overly simple dummy function, for now
  function signUp()
  public
  {
    //todo there must be a nicer way to do this
    if(!accounts[msg.sender].exists){

      accountList.push(msg.sender);

      TalkerAccount storage emptyAccount;
      emptyAccount.exists = true;
      accounts[msg.sender] = emptyAccount;
    }
  }

  //sets up a prediction by adding the hash
  function registerProof(bytes32 _dataHash, uint _dateAfter)
  public
  {
    require(!checkIfRegistered(_dataHash));
    signUp();

    proofs[_dataHash] = true;
    Proof memory newProof = Proof(block.timestamp, _dateAfter, false);

    accounts[msg.sender].proofs[_dataHash] = newProof;
    accounts[msg.sender].proofList.push(_dataHash);
  }

  //sets up the data by
  function confirmProof(bytes32 _dataHash, string _realData)
  public
  {
    require(block.timestamp > accounts[msg.sender].proofs[_dataHash].dateAfter);

    //todo make sure abi.encodePacked doesn't mess with the hash compared to web3
    bytes32 trialHash = keccak256(abi.encodePacked(_realData));

    require(trialHash == _dataHash);
    accounts[msg.sender].proofs[_dataHash].verified = true;
    emit AnnounceValidation(msg.sender, _dataHash, _realData);
  }

  function postBlog(string _title, string _content)
  public
  {
    emit postToBlog(msg.sender, _title, _content);
  }

  function checkIfRegistered(bytes32 assetHash)
  public
  constant
  returns (bool)
  {
    return proofs[assetHash];
  }

  function getAccountsLength()
  public
  constant //change to view
  returns (uint)
  {
    return accountList.length;
  }

  function getSpecificAccount(uint _index)
  public
  constant //change to view
  returns (address)
  {
    return accountList[_index];
  }

  function getProofLengthForAccount(address _accountAddress)
  public
  constant
  returns (uint)
  {
    return accounts[_accountAddress].proofList.length;
  }

  function getProofHashFromIndexAccount(uint _proofIndex, address _accountAddress)
  public
  constant
  returns (bytes32)
  {
    return accounts[_accountAddress].proofList[_proofIndex];
  }

  function getProofInfoFromHashAccount(bytes32 _proofHash, address _accountAddress)
  public
  constant
  returns (uint, uint, bool)
  {
    return (accounts[_accountAddress].proofs[_proofHash].datePosted ,accounts[_accountAddress].proofs[_proofHash].dateAfter ,accounts[_accountAddress].proofs[_proofHash].verified );
  }
}
