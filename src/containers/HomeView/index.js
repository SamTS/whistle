import React, { Component } from 'react'
import { appConfig }        from 'configs/config-main'

class HomeView extends Component {
  render() {
    return (
      <div className="container">Welcome to {appConfig.name}!</div>
    )
  }
}

export default HomeView
