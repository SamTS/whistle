import React, { Component }     from 'react'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import * as proofActionCreators from 'core/actions/actions-proof'
import PropTypes                from 'prop-types'
import { withRouter }           from 'react-router-dom'
import { Form, Label }          from 'components/Form'
import Controls                 from '../../components/Controls'
import { styles }               from './styles.scss'

class GenerateProofPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enteredProof: '',
      nextBtnDisabled: false
    }
  }

  onEnter= (evt) => {
    const { value } = evt.currentTarget

    this.setState({
      enteredProof: value
    })
  }

  proceed = () => {
    const { enteredProof } = this.state
    const { actions, history } = this.props
    actions.proof.addProof(enteredProof)
    history.push('/register?panel=3')
  }

  render() {
    const { enteredProof, nextBtnDisabled } = this.state

    return (
      <div className={styles}>
        <h2>Enter Your Proof Of Credibility</h2>
        <p>Can you prove you know something to verify your credibility as an insider?</p>

        <Form>
          <div className="form-section">
            <Label text="Enter your proof" />
            <textarea autoFocus onChange={this.onEnter} value={enteredProof} />
          </div>
        </Form>
        <Controls
          prevDisabled
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
