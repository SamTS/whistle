import { combineReducers }    from 'redux'
import { attestationReducer } from 'core/reducers/reducer-attestation'
import { providerReducer }    from 'core/reducers/reducer-provider'
import uiReducer              from 'core/reducers/reducer-ui'

const rootReducer = combineReducers({
  attestation: attestationReducer,
  provider: providerReducer,
  ui: uiReducer
})

export default rootReducer
