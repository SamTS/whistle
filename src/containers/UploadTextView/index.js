import React, { Component }           from 'react'
import PropTypes                      from 'prop-types'
import { connect }                    from 'react-redux'
import { bindActionCreators }         from 'redux'
import { withRouter }                 from 'react-router-dom'
import * as proofActionCreators       from 'core/actions/actions-proof'
import * as uiActionCreators          from 'core/actions/actions-ui'
import { StandardModal }              from 'components/Modals'
import Slide                          from '@material-ui/core/Slide'
import { Form }          from 'components/Form'
import withWidth       from '@material-ui/core/withWidth'
import { modalStyles }                from './styles.scss'
import Controls                 from './Controls'

const placeholder = 'Enter your message here..'

function TransitionComponent(props) {
  return <Slide direction="left" {...props} mountOnEnter unmountOnExit />
}

class UploadTextView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enteredProof: ''
    }
  }

  componentDidMount() {
    const { actions } = this.props

    actions.ui.openModal({
      modalKey: 'upload-modal'
    })
  }

  onEnter= (evt) => {
    const { value } = evt.currentTarget

    this.setState({
      enteredProof: value
    })
  }

  close = () => {
    const { history } = this.props
    history.push('/politics')
  }

  proceed = () => {
    const { enteredProof } = this.state
    const { actions } = this.props
    actions.proof.validateProof(enteredProof)
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
        <Form>
          <div className="form-section">
            <textarea
              autoFocus
              placeholder={placeholder}
              onChange={this.onEnter}
              value={this.state.enteredProof}
            />
          </div>
        </Form>
        <Controls
          handleNext={this.proceed}
        />
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

UploadTextView.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  proof: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  provider: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired
}

UploadTextView.defaultProps = {
  proof: null
}


export default withWidth()(withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadTextView)))
