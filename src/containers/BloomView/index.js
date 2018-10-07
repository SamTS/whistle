import React, { Component }           from 'react'
import PropTypes                      from 'prop-types'
import { connect }                    from 'react-redux'
import { bindActionCreators }         from 'redux'
import { withRouter }                 from 'react-router-dom'
import * as proofActionCreators       from 'core/actions/actions-proof'
import * as uiActionCreators          from 'core/actions/actions-ui'
import { StandardModal }              from 'components/Modals'
import AppBar                         from 'components/AppBar'
import QrCode                         from 'components/QrCode'
import Slide                          from '@material-ui/core/Slide'
import Toolbar                        from '@material-ui/core/Toolbar'
import withWidth                      from '@material-ui/core/withWidth'
import { modalStyles }                from './styles.scss'

function TransitionComponent(props) {
  return <Slide direction="left" {...props} mountOnEnter unmountOnExit />
}

class BloomView extends Component {
  componentDidMount() {
    const { actions } = this.props

    actions.ui.openModal({
      modalKey: 'upload-modal'
    })
  }

  close= () => {
    const { history } = this.props
    history.push('/politics')
  }

  render() {
    const { ui } = this.props

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
              <h2 className="toolbar-header">Bloom</h2>
            </Toolbar>
          </AppBar>
        </div>
        <QrCode className="bloom-qr" />
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

BloomView.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  proof: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  provider: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired
}

BloomView.defaultProps = {
  proof: null
}

export default withWidth()(withRouter(connect(mapStateToProps, mapDispatchToProps)(BloomView)))
