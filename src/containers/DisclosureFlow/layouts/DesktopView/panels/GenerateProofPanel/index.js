import React, { Component }     from 'react'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import * as proofActionCreators from 'core/actions/actions-proof'
import PropTypes                from 'prop-types'
import { withRouter }           from 'react-router-dom'
import { Form }          from 'components/Form'
import Controls                 from '../../components/Controls'
import { styles }               from './styles.scss'

/* eslint-disable */
const placeholder = 'Enter your message here..'

class GenerateProofPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enteredProof: '',
      nextBtnDisabled: true,
      prevDisabled: false
    }
  }

  onEnter= (evt) => {
    const { value } = evt.currentTarget

    this.setState({
      enteredProof: value,
      nextBtnDisabled: value !== '' ? false : true
    })
  }

  proceed = () => {
    const { enteredProof } = this.state
    const { actions, history } = this.props
    actions.proof.addProof(enteredProof)
    history.push('/disclosure?panel=3')
  }

  render() {
    const { enteredProof, nextBtnDisabled, prevDisabled } = this.state

    return (
      <div className={styles}>
        <h2>Enter your anonymous public disclosure.</h2>
        <p>The message you're about to enter will be public and can never be altered</p>
        <Form>
          <div className="form-section">
            <textarea autoFocus placeholder={placeholder} onChange={this.onEnter} value={enteredProof} />
          </div>
        </Form>
        <Controls
          prevDisabled={prevDisabled}
          nextDisabled={nextBtnDisabled}
          handleNext={this.proceed}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      proof: bindActionCreators(proofActionCreators, dispatch)
    }
  }
}

GenerateProofPanel.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
}

export default withRouter(connect(null, mapDispatchToProps)(GenerateProofPanel))
