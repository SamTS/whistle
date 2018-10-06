import constants    from 'core/types'
import contract     from 'truffle-contract'
import CryptoSource from 'contracts/CryptoSource.json'
import sha256       from 'sha256'

export function addAsset(asset) {
  return {
    type: constants.ADD_ASSET,
    asset
  }
}

function checkIfAttestationRegistered(CryptoSourceContract, assetHash, resolve, reject) {
  CryptoSourceContract.deployed().then((poe) => {
    return poe.checkIfRegistered(assetHash)
  })
    .then((exists) => {
      const assetExists = !!exists
      resolve(assetExists)
    })
    .catch((error) => {
      reject(error)
    })
}

function registerAttestation(CryptoSourceContract, assetHash, resolve, reject) {
  CryptoSourceContract.deployed().then((poe) => {
    return poe.registerAttestation(assetHash)
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
      type: constants.CHECK_ATTESTATION,
      alreadyExists: true
    }
  })())
}

function dispatchAssetDoesNotExist(assetHash, dispatch) {
  dispatch((() => {
    return {
      type: constants.CHECK_ATTESTATION,
      alreadyExists: false,
      assetHash
    }
  })())
}

function dispatchAssetCreated(transaction, assetHash, dispatch) {
  dispatch((() => {
    return {
      type: constants.CREATE_ATTESTATION_HASH,
      assetHash,
      transaction,
      success: true
    }
  })())
}

function dispatchCreationError(dispatch) {
  dispatch((() => {
    return {
      type: constants.CREATE_ATTESTATION_HASH,
      success: false
    }
  })())
}

function dispatchError(error, dispatch) {
  dispatch((() => {
    return {
      type: constants.ATTESTATION_ERROR,
      error
    }
  })())
}

export function checkIfRegistered(assetUrl) {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const CryptoSourceContract = contract(CryptoSource)
    const assetHash = sha256(assetUrl)

    CryptoSourceContract.setProvider(web3Provider.currentProvider)
    CryptoSourceContract.defaults({ from: web3Provider.eth.defaultAccount })

    return new Promise((resolve, reject) => {
      checkIfAttestationRegistered(CryptoSourceContract, assetHash, resolve, reject)
    })
      .then((assetExists) => {
        if (assetExists) {
          dispatchAssetAlreadyExists(dispatch)
        } else {
          dispatchAssetDoesNotExist(assetHash, dispatch)
        }
      })
      .catch((error) => {
        dispatchError(error, dispatch)
      })
  }
}

export function register() {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const { assetHash } = getState().asset
    const CryptoSourceContract = contract(CryptoSource)

    CryptoSourceContract.setProvider(web3Provider.currentProvider)
    CryptoSourceContract.defaults({ from: web3Provider.eth.defaultAccount })

    return new Promise((resolve, reject) => {
      registerAttestation(CryptoSourceContract, assetHash, resolve, reject)
    })
      .then((transaction) => {
        if (transaction) {
          dispatchAssetCreated(transaction, assetHash, dispatch)
        } else {
          dispatchCreationError(dispatch)
        }
      })
  }
}
