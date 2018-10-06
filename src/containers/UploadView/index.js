import React, { Component }           from 'react'
import PropTypes                      from 'prop-types'
import { connect }                    from 'react-redux'
import { bindActionCreators }         from 'redux'
import { withRouter }                 from 'react-router-dom'
import * as attestationActionCreators from 'core/actions/actions-attestation'
import * as uiActionCreators          from 'core/actions/actions-ui'
import { StandardModal }              from 'components/Modals'
import AppBar                         from 'components/AppBar'
import { UploadBox }                  from 'components/UploadBox'
import Slide                          from '@material-ui/core/Slide'
import Toolbar                        from '@material-ui/core/Toolbar'
import IconButton                     from '@material-ui/core/IconButton'
import ArrowBackIcon                  from '@material-ui/icons/ArrowBack'
import CloseIcon                      from '@material-ui/icons/Close'
import Typography                     from 'components/Typography'
import withWidth, { isWidthUp }       from '@material-ui/core/withWidth'
import { modalStyles }                from './styles.scss'

function TransitionComponent(props) {
  return <Slide direction="left" {...props} mountOnEnter unmountOnExit />
}

class UploadView extends Component {
  componentDidMount() {
    const { actions } = this.props

    actions.ui.openModal({
      modalKey: 'upload-modal'
    })
  }

  close= () => {
    const { history } = this.props
    history.push('/assets')
  }

  registerAsset=(asset) => {
    const {
      actions,
      history,
      provider
    } = this.props

    if (provider.web3Provider !== null) {
      actions.asset.addAsset(asset)
      history.push('/register?panel=1')
    } else {
      actions.ui.openModal({ modalKey: 'install-metamask-modal' })
    }
  }

  render() {
    const { ui, width } = this.props
    const closeIcon = isWidthUp('md', width) ? <CloseIcon /> : <ArrowBackIcon />

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
              <IconButton
                color="inherit"
                aria-label="back-arrow"
                onClick={this.close}
                className="arrow-icon"
              >
                {closeIcon}
              </IconButton>
              <Typography variant="title" color="inherit">
                Upload Your Digital Asset
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="upload-view-container">
            <UploadBox
              onDrop={this.onDrop}
              setUploadedFile={this.setUploadedFile}
              registerAsset={this.registerAsset}
            />
          </div>
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
      asset: bindActionCreators(attestationActionCreators, dispatch)
    }
  }
}

UploadView.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  asset: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  provider: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
}

UploadView.defaultProps = {
  asset: null
}

export default withWidth()(withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadView)))
