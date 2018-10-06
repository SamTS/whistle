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
import TopicsView                   from 'containers/TopicsView'
import UploadView                   from 'containers/UploadView'
import RegisterAttestationView      from 'containers/RegisterAttestationView'
import * as providerActionCreators  from 'core/actions/actions-provider'
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
            <NormalLayoutRoute path="/topics" component={TopicsView} />
            <NormalLayoutRoute path="/upload" component={UploadView} />
            <RegistrationLayoutRoute path="/register" component={RegisterAttestationView} />
            <Redirect from="/" to="/topics" />
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
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  }
}

App.propTypes = {
  actions: PropTypes.shape({}).isRequired
}

export default connect(null, mapDispatchToProps)(App)
