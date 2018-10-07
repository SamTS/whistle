import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import { withRouter }           from 'react-router-dom'
import * as proofActionCreators from 'core/actions/actions-proof'
import Controls                 from '../../components/Controls'
import { styles }               from './styles.scss'

class RegisterProofPanel extends Component {
  constructor(props) {
    super(props)
    const { id } = props.account
    const { proofHash } = props.proof

    this.state = {
      nextBtnDisabled: !((id && proofHash))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { proof } = nextProps
    if (proof.transaction) {
      const { history } = this.props
      history.push('/disclosure?panel=6')
    }
  }

  registerProof = () => {
    const { actions } = this.props
    actions.proof.register()
  }

  render() {
    const { id } = this.props.account
    const { proofHash } = this.props.proof
    const { nextBtnDisabled } = this.state

    return (
      <div className={styles}>
        <h2>Confirm Your Timestamp</h2>
        <p>The following data is about to get time stamped on the blockchain.</p>
        <p>The text file you download in step #3 matches the hash below.</p>
        <p>Remember, you will have to upload your text file in the future after the claim
        in your encrypted message becomes true
        </p>
        <div id="registration-details">
          <ul>
            <li>
              <span>Your Publick Key (From MetaMask)</span>
              <span>{id}</span>
            </li>
            <li>
              <span>Unique Hash <br />Of Your Proof:</span>
              <span>{proofHash}</span>
            </li>
          </ul>
        </div>
        <Controls
          prevDisabled={false}
          nextDisabled={nextBtnDisabled}
          nextLabel="Register"
          handleNext={this.registerProof}
        />
      </div>
    )
  }
}

RegisterProofPanel.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  actions: PropTypes.shape({}).isRequired,
  proof: PropTypes.shape({
    proofHash: PropTypes.string
  }),
  history: PropTypes.shape({}).isRequired
}

RegisterProofPanel.defaultProps = {
  proof: null
}

function mapStateToProps(state) {
  return {
    account: state.account,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterProofPanel))
