import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import { withRouter, Link }     from 'react-router-dom'
import ProgressIndicator        from 'components/ProgressIndicator'
import * as proofActionCreators from 'core/actions/actions-proof'
import Controls                 from '../../components/Controls'
import { styles }               from './styles.scss'

class GenerateHashPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextBtnDisabled: true
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { actions, proof } = nextProps
    const { proofHash } = proof

    if (proofHash === '') {
      setTimeout(() => {
        actions.proof.checkIfRegistered(proofHash)
      }, 2000)
    }

    if (proofHash !== '') {
      return { nextBtnDisabled: false }
    } else if (proof.alreadyExists) {
      return { nextBtnDisabled: true }
    }

    return { nextBtnDisabled: true }
  }

  getControls = () => {
    const { nextBtnDisabled } = this.state
    return (
      <Controls
        prevDisabled={false}
        nextDisabled={nextBtnDisabled}
        handleNext={this.proceed}
      />
    )
  }

  proceed = () => {
    const { history } = this.props
    history.push('/register?panel=3')
  }

  render() {
    const { proof } = this.props
    const { alreadyExists, proofHash, error } = proof
    let content

    console.log('just renderining proofHash', proofHash)

    if (alreadyExists) {
      content = (
        <div className="notification">
          <h2>Sorry, someone already registered this hash!</h2>
          <span className="action"><Link to="/home">Upload a new proof</Link></span>
        </div>
      )
    } else if (proofHash) {
      content = (
        <div>
          <h2>Unique hash (SHA-256) of your proof</h2>
          <div id="unique-hash">{proofHash}</div>
        </div>
      )
    } else if (error) {
      content = (
        <div className="notification">
          <h2>Sorry, there&apos;s an error!</h2>
          <span className="action"><Link to="/upload"> Please try again</Link></span>
        </div>
      )
    } else if (proof.stagedProof) {
      content = (
        <div>
          <h2>Generating a unique hash of your Proof...</h2>
          <div id="hash-progress-indicator">
            <ProgressIndicator type="linear" />
            <span className="blink-me">Please hold on...</span>
          </div>
        </div>
      )
    } else {
      content = (
        <div className="notification">
          <h2>Please upload a Proof to timestamp</h2>
          <span className="action"><Link to="/home">Upload A Proof</Link></span>
        </div>
      )
    }

    return (
      <div className={styles}>
        {content}
        {this.getControls()}
      </div>
    )
  }
}

GenerateHashPanel.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  proof: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
}

function mapStateToProps(state) {
  return {
    proof: state.proof
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      proof: bindActionCreators(proofActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenerateHashPanel))
