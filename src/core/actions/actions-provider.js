import constants from 'core/types'

/**
 * setProvider - Set the Provider (MetaMask)
 */
export function setProvider(provider) {
  return (dispatch) => {
    provider.eth.getAccounts((error, accounts) => {
      if (error) { return }

      const userAccount = accounts[0]

      /* Set the default account */
      /* eslint-disable */
      provider.eth.defaultAccount = userAccount

      dispatch((() => {
        return {
          type: constants.SET_PROVIDER,
          provider
        }
      })())
    })
  }
}
