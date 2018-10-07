import constants from 'core/types'

const initialState = {
  email: '',
  id: null,
  accountArray: []
}

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_ACCOUNT:
      return Object.assign({}, state, {
        id: action.id
      })

    case constants.CLEAR_ACCOUNT:
      return Object.assign({}, state, {
        email: ''
      })
    case constants.ACCOUNT_ADDRESSESS:
      return Object.assign({}, state, {
        accountArray: action.accountArray
      })

    default:
      return state
  }
}
