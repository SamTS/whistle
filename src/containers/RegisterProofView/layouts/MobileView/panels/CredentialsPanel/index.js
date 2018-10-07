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
        <h2>Your Public Key</h2>
        <p>A public key is an anonymous signature that can be used to identify
        a timestamp on a blockchain.
        </p>
        <p>The proof you are about to timestamp will be associated with the following
        public key that you automatically get from MetaMask.
        </p>
        <Form>

          <div className="form-section">
            <Label text="Your Public Key (from MetaMask)" />
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
