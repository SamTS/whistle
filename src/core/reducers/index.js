import { combineReducers }    from 'redux'
import { proofReducer }       from 'core/reducers/reducer-proof'
import { providerReducer }    from 'core/reducers/reducer-provider'
import uiReducer              from 'core/reducers/reducer-ui'

const rootReducer = combineReducers({
  proof: proofReducer,
  provider: providerReducer,
  ui: uiReducer
})

export default rootReducer
