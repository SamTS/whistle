import React, { Component }        from 'react'
import PropTypes                   from 'prop-types'
import { connect }                 from 'react-redux'
import { bindActionCreators }      from 'redux'
import * as accountActionCreators  from 'core/actions/actions-account'

class PoliticsView extends Component {
  componentWillMount() {
    const { actions } = this.props

    setTimeout(() => {
      actions.account.getAccounts()
    }, 2000)
  }

  render() {
    return (
      <div className="container">Politics-related proofs</div>
    )
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
  actions: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PoliticsView)
