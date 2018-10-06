import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'
import { connect }                from 'react-redux'
import { withRouter }             from 'react-router-dom'
import { Form, Label, Input }     from 'components/Form'
import Controls                   from '../../components/Controls'
import { styles }                 from './styles.scss'

class CredentialsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextBtnDisabled: false
    }
  }

  proceed = () => {
    const { history } = this.props
    history.push('/register?panel=2')
  }

  render() {
    const { id } = this.props.account
    const { nextBtnDisabled } = this.state

    return (
      <div className={styles}>
        <h2>Enter Your Credentials</h2>
        <span>Your MetaMask Public Key will be registered on the Blockchain</span>
        <Form>

          <div className="form-section">
            <Label text="Your Account ID (from MetaMask)" />
            <Input
              type="text"
              disabled
              value={id}
            />
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

function mapStateToProps(state) {
  return {
    account: state.account,
    asset: state.asset
  }
}

CredentialsPanel.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  asset: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired
}

CredentialsPanel.defaultProps = {
  asset: null
}

export default withRouter(connect(mapStateToProps)(CredentialsPanel))
