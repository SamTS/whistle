import constants    from 'core/types'
import contract     from 'truffle-contract'
import CryptoSource from 'contracts/CryptoSource.json'
import sha256       from 'sha256'

export function addProof(proof) {
  const proofHash = window.web3.sha3(proof)
  return {
    type: constants.ADD_PROOF,
    proof,
    proofHash
  }
}

function checkIfProofRegistered(CryptoSourceContract, proofHash, resolve, reject) {
  CryptoSourceContract.deployed().then((poe) => {
    return poe.checkIfRegistered(proofHash)
  })
    .then((exists) => {
      const assetExists = !!exists
      resolve(assetExists)
    })
    .catch((error) => {
      reject(error)
    })
}

function registerProof(CryptoSourceContract, proofHash, date, resolve, reject) {
  CryptoSourceContract.deployed().then((poe) => {
    return poe.registerProof(proofHash, date)
  })
    .then((result) => {
      const transaction = (result !== null) ? result : null
      resolve(transaction)
    })
    .catch((error) => {
      reject(error)
    })
}

function dispatchAssetAlreadyExists(dispatch) {
  dispatch((() => {
    return {
      type: constants.CHECK_PROOF,
      alreadyExists: true
    }
  })())
}

function dispatchAssetDoesNotExist(proofHash, dispatch) {
  dispatch((() => {
    return {
      type: constants.CHECK_PROOF,
      alreadyExists: false,
      proofHash
    }
  })())
}

function dispatchAssetCreated(transaction, proofHash, dispatch) {
  dispatch((() => {
    return {
      type: constants.CREATE_PROOF_HASH,
      proofHash,
      transaction,
      success: true
    }
  })())
}

function dispatchCreationError(dispatch) {
  dispatch((() => {
    return {
      type: constants.CREATE_PROOF_HASH,
      success: false
    }
  })())
}

function dispatchError(error, dispatch) {
  dispatch((() => {
    return {
      type: constants.PROOF_ERROR,
      error
    }
  })())
}

export function checkIfRegistered(assetUrl) {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const CryptoSourceContract = contract(CryptoSource)
    const proofHash = sha256(assetUrl)

    CryptoSourceContract.setProvider(web3Provider.currentProvider)
    CryptoSourceContract.defaults({ from: web3Provider.eth.defaultAccount })

    return new Promise((resolve, reject) => {
      checkIfProofRegistered(CryptoSourceContract, proofHash, resolve, reject)
    })
      .then((assetExists) => {
        if (assetExists) {
          dispatchAssetAlreadyExists(dispatch)
        } else {
          dispatchAssetDoesNotExist(proofHash, dispatch)
        }
      })
      .catch((error) => {
        dispatchError(error, dispatch)
      })
  }
}

//window.web3.sha3

export function register() {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const { proofHash } = getState().proof
    const CryptoSourceContract = contract(CryptoSource)

    CryptoSourceContract.setProvider(web3Provider.currentProvider)
    CryptoSourceContract.defaults({ from: web3Provider.eth.defaultAccount })

    return new Promise((resolve, reject) => {
      registerProof(CryptoSourceContract, proofHash, '0', resolve, reject)
    })
      .then((transaction) => {
        if (transaction) {
          dispatchAssetCreated(transaction, proofHash, dispatch)
        } else {
          dispatchCreationError(dispatch)
        }
      })
  }
}
