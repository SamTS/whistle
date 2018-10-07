import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { styles }           from './styles.scss'

class SuccessPanel extends Component {
  render() {
    return (
      <div className={styles}>
        <div className="notification">
          <h2>Congratulations! Your proof was successfully registered.</h2>
          <span className="action"><Link to="/assets">See your proof assets</Link></span>
        </div>
      </div>
    )
  }
}

export default withRouter(SuccessPanel)
