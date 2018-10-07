import React, { Component }           from 'react'
import PropTypes                      from 'prop-types'
import { connect }                    from 'react-redux'
import { bindActionCreators }         from 'redux'
import { withRouter }                 from 'react-router-dom'
import * as proofActionCreators       from 'core/actions/actions-proof'
import * as uiActionCreators          from 'core/actions/actions-ui'
import { StandardModal }              from 'components/Modals'
import AppBar                         from 'components/AppBar'
import Slide                          from '@material-ui/core/Slide'
import Toolbar                        from '@material-ui/core/Toolbar'
import withWidth                      from '@material-ui/core/withWidth'
import Button                               from 'components/Button'
import { modalStyles }                from './styles.scss'

function TransitionComponent(props) {
  return <Slide direction="up" {...props} mountOnEnter unmountOnExit />
}

class AddMenu extends Component {
  componentDidMount() {
    const { actions } = this.props

    actions.ui.openModal({
      modalKey: 'upload-modal'
    })
  }

  goToBloom = () => {
    const { history } = this.props
    history.push('/bloom')
  }

  goToProofRegistration = () => {
    const { history } = this.props
    history.push('/register?panel=1')
  }

  goToDisclosure = () => {
    const { history } = this.props
    history.push('/disclosure?panel=1')
  }

  goToVerifyProof = () => {
    const { history } = this.props
    history.push('/upload')
  }

  close= () => {
    const { history } = this.props
    history.push('/politics')
  }

  registerProof=(proof) => {
    const {
      actions,
      history,
      provider
    } = this.props

    if (provider.web3Provider !== null) {
      actions.proof.addAsset(proof)
      history.push('/register?panel=1')
    } else {
      actions.ui.openModal({ modalKey: 'install-metamask-modal' })
    }
  }

  render() {
    // const { ui, width } = this.props
    const { ui } = this.props
    // const closeIcon = isWidthUp('md', width) ? <CloseIcon /> : <ArrowBackIcon />

    return (
      <StandardModal
        modalKey="upload-modal"
        modalState={ui.modalState}
        className="record-modal"
        cssModule={modalStyles}
        onClose={this.close}
        TransitionComponent={TransitionComponent}
      >
        <div>
          <AppBar>
            <Toolbar>
              <h2 className="toolbar-header">Establish Credibility</h2>
            </Toolbar>
            <Button
              variant="contained"
              color="primary"
              className="stretched-button"
              onClick={this.goToBloom}
            >
              Bloom
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="stretched-button"
              onClick={this.goToProofRegistration}
            >
              New Proof of Credibility
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="stretched-button"
              onClick={this.goToVerifyProof}
            >
              Verify Proof of Credibility
            </Button>
            <Toolbar>
              <h2 className="toolbar-header">Disclose Information</h2>
            </Toolbar>
            <Button
              variant="contained"
              color="primary"
              className="stretched-button"
              onClick={this.goToDisclosure}
            >
              Disclose
            </Button>
          </AppBar>
        </div>
      </StandardModal>
    )
  }
}

function mapStateToProps(state) {
  return {
    provider: state.provider,
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch),
      proof: bindActionCreators(proofActionCreators, dispatch)
    }
  }
}

AddMenu.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  proof: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  provider: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired
}

AddMenu.defaultProps = {
  proof: null
}

export default withWidth()(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMenu)))
