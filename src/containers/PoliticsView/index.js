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

  createPending = () => 'Pending! '

  createButton = (content1, content2) => (
    <Button className="politics-disclosure">
      <div>
        {content1}
      </div>
      <div>
        {content2}
      </div>
    </Button>
  );

  createPendingButton = content => (
    this.createButton(this.createPending(), content)
  );

  render() {
    const { account } = this.props
    const { accountArray } = account

    if (account && accountArray && accountArray[1] && accountArray[1].datePosted) {
      return (
        <div className="container">
          {accountArray.map(payload => this.createPendingButton(payload.datePosted.toString()))}
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
