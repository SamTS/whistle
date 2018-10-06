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
      allowToProceed: false,
      nextBtnDisabled: true
    }
  }

  onEnter = (evt) => {
    if (evt.key === 'Enter') {
      const { allowToProceed } = this.state
      if (allowToProceed) { this.proceed() }
    }
  }

  proceed = () => {
    const { history } = this.props

    history.push('/register?panel=2')
  }

  enableNext=(input) => {
    const { asset } = this.props

    if (input.valid && asset.stagedAsset) {
      this.setState({
        allowToProceed: true,
        nextBtnDisabled: false
      })
    }
  }

  render() {
    const { id } = this.props.account
    const { nextBtnDisabled } = this.state

    return (
      <div className={styles}>
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
