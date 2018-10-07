import React, { Component }         from 'react'
import PropTypes                    from 'prop-types'
import { connect }                  from 'react-redux'
import { bindActionCreators }       from 'redux'
import { MuiThemeProvider }         from '@material-ui/core/styles'
import {
  HashRouter,
  Redirect,
  Switch
} from 'react-router-dom'
import Web3                         from 'web3'
import theme                        from 'configs/theme/config-theme'
import PoliticsView                 from 'containers/PoliticsView'
import BusinessView                 from 'containers/BusinessView'
import EthicsView                   from 'containers/EthicsView'
import UploadTextView                   from 'containers/UploadTextView'
import BloomView                   from 'containers/BloomView'
import AddMenu                   from 'containers/AddMenu'
import RegisterProofView            from 'containers/RegisterProofView'
import DisclosureFlow            from 'containers/DisclosureFlow'
import * as providerActionCreators  from 'core/actions/actions-provider'
import * as accountActionCreators  from 'core/actions/actions-account'
import NormalLayoutRoute            from './layouts/NormalLayoutRoute'
import RegistrationLayoutRoute      from './layouts/RegistrationLayoutRoute'
import MetaMaskNotification         from './components/MetaMaskNotification'

import './styles.scss' // global styles

class App extends Component {
  componentDidMount() {
    const { actions } = this.props

    if (typeof window.web3 !== 'undefined') {
      const { currentProvider } = window.web3
      const web3Provider = new Web3(currentProvider)
      actions.provider.setProvider(web3Provider)
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <Switch>
            <NormalLayoutRoute path="/politics" component={PoliticsView} />
            <NormalLayoutRoute path="/business" component={BusinessView} />
            <NormalLayoutRoute path="/ethics" component={EthicsView} />
            <NormalLayoutRoute path="/upload" component={UploadTextView} />
            <NormalLayoutRoute path="/addMenu" component={AddMenu} />
            <NormalLayoutRoute path="/bloom" component={BloomView} />
            <RegistrationLayoutRoute path="/register" component={RegisterProofView} />
            <RegistrationLayoutRoute path="/disclosure" component={DisclosureFlow} />
            <Redirect from="/" to="/politics" />
          </Switch>
        </HashRouter>
        <MetaMaskNotification />
      </MuiThemeProvider>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      provider: bindActionCreators(providerActionCreators, dispatch),
      account: bindActionCreators(accountActionCreators, dispatch)
    }
  }
}

App.propTypes = {
  actions: PropTypes.shape({}).isRequired
}

export default connect(null, mapDispatchToProps)(App)
