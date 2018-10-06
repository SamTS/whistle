import { combineReducers }    from 'redux'
import { accountReducer }    from 'core/reducers/reducer-account'
import { proofReducer }       from 'core/reducers/reducer-proof'
import { providerReducer }    from 'core/reducers/reducer-provider'
import uiReducer              from 'core/reducers/reducer-ui'

const rootReducer = combineReducers({
  account: accountReducer,
  proof: proofReducer,
  provider: providerReducer,
  ui: uiReducer
})

export default rootReducer
