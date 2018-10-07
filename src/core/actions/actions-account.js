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

function dispatchBlogArray(blogArray, dispatch) {
  dispatch((() => {
    return {
      type: constants.BLOG_ARRAY,
      blogArray
    }
  })())
}


function runContractForBlogs(CryptoSourceContract, resolve) {
  return new Promise(() => {
    return CryptoSourceContract.deployed().then((poe) => {
      const transferEvent = poe.postToBlog({}, {fromBlock: 0, toBlock: 'latest'})
      transferEvent.get((error, validatedProofs) => {
        // we have the logs, now print them
        resolve(validatedProofs.map(data => data.args))
      })
    })
  })
  // .then((results) => {
  //   const goodResults = results.map(result => result.args)
  //   // if anyone has gotten to this comment, I am so sorry for this code
  //   resolve(goodResults)
  // })
}

export function getBlogs() {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const CryptoSourceContract = contract(CryptoSource)

    CryptoSourceContract.setProvider(web3Provider.currentProvider)
    CryptoSourceContract.defaults({ from: web3Provider.eth.defaultAccount })

    return new Promise((resolve, reject) => {
      return runContractForBlogs(CryptoSourceContract, resolve, reject)
    })
      .then((blogArray) => {
        if (blogArray) {
          dispatchBlogArray(blogArray, dispatch)
        }
      })
  }
}

function runContractForAccounts(CryptoSourceContract, resolve) {
  let cryptoSourceContractLive
  let accountList
  let accountLengthList
  let proofHashList
  const hashAccountMap = {}
  let finalResultsNice
  return new Promise(() => {
    CryptoSourceContract.deployed().then((poe) => {
      cryptoSourceContractLive = poe
      return poe.getAccountsLength()
    })
      .then((accountLength) => {
        const promiseArray = []
        for (let i = 0; i < accountLength.toNumber(); i++) {
          promiseArray.push(cryptoSourceContractLive.getSpecificAccount(i))
        }
        return Promise.all(promiseArray)
      })
      // .then((accountArray) => {
      //   resolve(accountArray)
      // })
      .then((arrayAccount) => {
        const promiseArray = []
        accountList = arrayAccount
        arrayAccount.forEach((account) => {
          promiseArray.push(cryptoSourceContractLive.getProofLengthForAccount(account))
        })
        return Promise.all(promiseArray)
      })
      .then((arrayLengths) => {
        const goodArrayLengths = arrayLengths.map((bigNumber) => bigNumber.toNumber())
        const promiseArray = []
        accountLengthList = goodArrayLengths
        goodArrayLengths.forEach((accountProofLength, accountIndex) => {
          for (let i = 0; i < accountProofLength; i++) {
            promiseArray.push(cryptoSourceContractLive.getProofHashFromIndexAccount(i, accountList[accountIndex]))
          }
        })
        return Promise.all(promiseArray)
      })
      .then((proofHashes) => {
        console.log(proofHashes)
        proofHashList = proofHashes

        const promiseArray = []
        let superIndex = 0
        accountLengthList.forEach((accountLength, accountIndex) => {
          for (let i = 0; i < accountLength; i++) {
            promiseArray.push(cryptoSourceContractLive.getProofInfoFromHashAccount(proofHashes[superIndex], accountList[accountIndex]))
            hashAccountMap[proofHashes[superIndex]] = accountList[accountIndex]
            superIndex++
          }
        })
        return Promise.all(promiseArray)
      })
      .then((proofedresults) => {
        finalResultsNice = proofedresults.map((resultArray, index) => {
          const returnObject = {}
          returnObject.datePosted = new Date(resultArray[0].toNumber() * 1000)
          returnObject.dateAfter = new Date(resultArray[1].toNumber() * 1000)
          returnObject.verified = resultArray[2]
          returnObject.proofHash = proofHashList[index]
          returnObject.accountAddress = hashAccountMap[proofHashList[index]]

          return returnObject
        })

        console.log('finalResultsNice', finalResultsNice)

        const transferEvent = cryptoSourceContractLive.AnnounceValidation({}, {fromBlock: 0, toBlock: 'latest'})
        return new Promise((subResolve) => {
          transferEvent.get((error, validatedProofs) => {
            // we have the logs, now print them
            subResolve(validatedProofs)
          })
        })
      })
      .then((results) => {
        const goodResults = results.map(result => result.args)
        //if anyone has gotten to this comment, I am so sorry for this code
        finalResultsNice.map((finalResult) => {
          goodResults.forEach((goodLog) => {
            if (goodLog.dataHash === finalResult.proofHash) {
              finalResult.realData = goodLog.data
            }
          })
          return finalResult
        })
        console.log('premature results', goodResults, finalResultsNice)
        resolve(finalResultsNice)
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
