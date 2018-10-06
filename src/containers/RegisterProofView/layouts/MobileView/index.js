import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import AppBar               from 'components/AppBar'
import { withRouter }       from 'react-router-dom'
import Toolbar              from '@material-ui/core/Toolbar'
import Typography           from 'components/Typography'
import ArrowBackIcon        from '@material-ui/icons/ArrowBack'
import IconButton           from '@material-ui/core/IconButton'
import CredentialsPanel     from './panels/CredentialsPanel'
import GenerateHashPanel    from './panels/GenerateHashPanel'
import RegisterAssetPanel   from './panels/RegisterAssetPanel'
import SuccessPanel         from './panels/SuccessPanel'
import { styles }           from './styles.scss'

class MobileView extends Component {
  handlePrev = () => {
    const { history } = this.props
    const currentPanel = parseInt(history.location.search.substr(1).split('=')[1], 10)

    if (currentPanel === 1) {
      history.push('/upload')
    } else {
      history.push(`/register?panel=${currentPanel - 1}`)
    }
  }

  renderContent() {
    const { panel } = this.props

    switch (panel) {
      case 1:
        return <CredentialsPanel />
      case 2:
        return <GenerateHashPanel />
      case 3:
        return <RegisterAssetPanel />
      case 4:
        return <SuccessPanel />
      default:
        break
    }

    return null
  }

  renderStepTitle= () => {
    const { panel } = this.props

    switch (panel) {
      case 1:
        return 'Enter Your Credentials'
      case 2:
        return 'Generate Unique Hash'
      case 3:
        return 'Confirm Transaction'
      case 4:
        return 'step 4'
      default:
        break
    }

    return null
  }

  render() {
    return (
      <div className={styles}>
        <div id="register-view">
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="back-arrow"
                onClick={this.handlePrev}
                className="arrow-icon"
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                {this.renderStepTitle()}
              </Typography>
            </Toolbar>
          </AppBar>
          <div id="registration-form-container">
            <div id="registration-form">{this.renderContent()}</div>
          </div>
        </div>
      </div>
    )
  }
}

MobileView.propTypes = {
  history: PropTypes.shape({}).isRequired,
  panel: PropTypes.number.isRequired
}

export default withRouter(MobileView)
