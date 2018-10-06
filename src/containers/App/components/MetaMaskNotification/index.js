import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import * as uiActionCreators    from 'core/actions/actions-ui'
import { StandardModal }        from 'components/Modals'
import AppBar                   from 'components/AppBar'
import Slide                    from '@material-ui/core/Slide'
import Toolbar                  from '@material-ui/core/Toolbar'
import IconButton               from '@material-ui/core/IconButton'
import ArrowBackIcon            from '@material-ui/icons/ArrowBack'
import CloseIcon                from '@material-ui/icons/Close'
import Typography               from 'components/Typography'
import Button                   from 'components/Button'
import metaMaskImg              from 'assets/images/metamask.png'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { styles }               from './styles.scss'

function TransitionComponent(props) {
  return <Slide direction="left" {...props} mountOnEnter unmountOnExit />
}

class MetaMaskNotification extends Component {
  close = () => {
    const { actions } = this.props
    actions.ui.closeModal({ modalKey: 'install-metamask-modal' })
  }

  render() {
    const { ui, width } = this.props
    const closeIcon = isWidthUp('md', width) ? <CloseIcon /> : <ArrowBackIcon />

    return (
      <div className={styles}>
        <StandardModal
          modalKey="install-metamask-modal"
          modalState={ui.modalState}
          cssModule={styles}
          onClose={this.close}
          TransitionComponent={TransitionComponent}
        >
          <div>
            <AppBar>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="back-arrow"
                  onClick={this.close}
                  className="arrow-icon"
                >
                  {closeIcon}
                </IconButton>
                <Typography variant="title" color="inherit">
                  MetaMask Must Be Installed
                </Typography>
              </Toolbar>
            </AppBar>
            <div>
              <img className="metamask-logo" src={metaMaskImg} alt="MetaMask logo" />
              <div className="message">
                <p>
                  <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">MetaMask</a>
                   &nbsp;is a wallet and Chrome extension that allows you to make Ethereum
                   transactions from regular websites.
                </p>
                <p>In order to register your asset on the blockchain, you need to have
                it installed.
                </p>
                <br />
                <Button
                  type="contained"
                  color="secondary"
                  className="install-metamask-btn"
                  onClick={() => {
                    window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en', '_blank')
                  }}
                >
                  Install MetaMask Now
                </Button>
              </div>
            </div>
          </div>
        </StandardModal>
      </div>
    )
  }
}

MetaMaskNotification.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(MetaMaskNotification))
