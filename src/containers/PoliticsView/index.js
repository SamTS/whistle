import React, { Component } from 'react'
import { connect }    from 'react-redux'
import Web3 from "web3";
import {bindActionCreators} from "redux";
import * as accountActionCreators  from 'core/actions/actions-account'


class PoliticsView extends Component {
  render() {
    console.log(this.props.account)
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
    account: state.account
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoliticsView)
