import constants from 'core/types'

const initialState = {
  email: '',
  id: null
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

    default:
      return state
  }
}
