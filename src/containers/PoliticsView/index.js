import React, { Component }        from 'react'
import PropTypes                   from 'prop-types'
import { connect }                 from 'react-redux'
import { bindActionCreators }      from 'redux'
import * as accountActionCreators  from 'core/actions/actions-account'
import Button                      from 'components/Button'

class PoliticsView extends Component {
  componentWillMount() {
    const { actions } = this.props

    setTimeout(() => {
      actions.account.getAccounts()
    }, 2000)
  }

  createPending = (validated) => validated ? 'Validated' : 'Pending!'

  createButton = (content1, content2, content3, index) => (
    <Button className="politics-disclosure" key={index}>
      <div>
        {content1}
      </div>
      <span>&nbsp;&nbsp;</span>
      <div>
        {content2}
      </div>
      <span>&nbsp;&nbsp;</span>
      <div>
        {content3}
      </div>
    </Button>
  );

  createPendingButton = (content, realData, validated, index) => (
    this.createButton(this.createPending(validated), content, realData, index)
  );

  render() {
    const { account } = this.props
    const { accountArray, id } = account

    if (account && accountArray && accountArray[1] && accountArray[1].datePosted) {
      return (
        <div className="container">
          {accountArray.map((payload, index) => this.createPendingButton(payload.datePosted.toString(), payload.realData, payload.verified, index))}
        </div>
      )
    }

    return <div>.</div>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      account: bindActionCreators(accountActionCreators, dispatch)
    }
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
    provider: state.provider
  }
}

PoliticsView.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  account: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PoliticsView)
