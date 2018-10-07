import constants from 'core/types'
import contract from 'truffle-contract'
import CryptoSource from 'contracts/CryptoSource.json'


export function setEmail(email) {
  return {
    type: constants.SET_ACCOUNT_EMAIL,
    email
  }
}

export function clear() {
  return {
    type: constants.CLEAR_ACCOUNT
  }
}

function runContractForAccounts(CryptoSourceContract, resolve) {
  let cryptoSourceContractLive
  // let accountList
  // let accountLengthList
  return new Promise(() => {
    CryptoSourceContract.deployed().then((poe) => {
      cryptoSourceContractLive = poe
      return poe.getAccountsLength()
    })
      .then((accountLength) => {
        const promiseArray = []
        for (let i = 0; i < accountLength; i++) {
          promiseArray.push(cryptoSourceContractLive.getSpecificAccount(i))
        }
        return Promise.all(promiseArray)
      })
      .then((accountArray) => {
        resolve(accountArray)
      })
  })
}

function dispatchAccountsGathered(accountArray, dispatch) {
  dispatch((() => {
    return {
      type: constants.ACCOUNT_ADDRESSESS,
      accountArray
    }
  })())
}

export function getAccounts() {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const CryptoSourceContract = contract(CryptoSource)

    CryptoSourceContract.setProvider(web3Provider.currentProvider)
    CryptoSourceContract.defaults({ from: web3Provider.eth.defaultAccount })

    return new Promise((resolve, reject) => {
      runContractForAccounts(CryptoSourceContract, resolve, reject)
    })
      .then((accountArray) => {
        if (accountArray) {
          dispatchAccountsGathered(accountArray, dispatch)
        }
      })
  }
}
