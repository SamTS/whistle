import constants from 'core/types'

const initialState = {
  stagedAsset: null,
  assetHash: '',
  alreadyExists: false,
  error: '',
  transaction: null,
  success: false
}

export function ProofReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ADD_PROOF:
      return Object.assign({}, state, {
        stagedAsset: action.asset[0]
      })

    case constants.CREATE_PROOF_HASH:
      return Object.assign({}, state, {
        assetHash: action.hash,
        success: action.success,
        transaction: action.transaction
      })

    case constants.CHECK_PROOF:
      return Object.assign({}, state, {
        assetHash: action.assetHash,
        alreadyExists: action.alreadyExists
      })

    case constants.PROOF_ERROR:
      return Object.assign({}, state, {
        error: action.error
      })

    default:
      return state
  }
}
