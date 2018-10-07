import constants from 'core/types'

const initialState = {
  stagedProof: null,
  proofHash: '',
  alreadyExists: false,
  error: '',
  transaction: null,
  success: false
}

export function proofReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ADD_PROOF:
      return Object.assign({}, state, {
        stagedProof: action.proof,
        proofHash: action.proofHash
      })

    case constants.CREATE_PROOF_HASH:
      return Object.assign({}, state, {
        proofHash: action.hash,
        success: action.success,
        transaction: action.transaction
      })

    case constants.CHECK_PROOF:
      return Object.assign({}, state, {
        proofHash: action.proofHash,
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
