import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'
import Paper                from '@material-ui/core/Paper'
import { Tabs, Tab }        from '@material-ui/core'
import GroupIcon            from '@material-ui/icons/Group'
import BusinessIcon         from '@material-ui/icons/BusinessCenter'
import ThumbDownIcon        from '@material-ui/icons/ThumbDownAlt'
import { styles }           from './styles.scss'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { location } = nextProps
    let currentTab

    switch (location.pathname) {
      case '/politics':
        currentTab = 0
        break
      case '/business':
        currentTab = 1
        break
      case '/ethics':
        currentTab = 2
        break
      default:
        currentTab = 0
        break
    }

    return { currentTab }
  }

  handleChange=(evt, tab) => {
    this.setState({ currentTab: tab })
    this.updateURL(tab)
  }

  updateURL(tab) {
    const { history } = this.props

    switch (tab) {
      case 0:
        history.push('/politics')
        break
      case 1:
        history.push('/business')
        break
      case 2:
        history.push('/ethics')
        break
      default:
        break
    }
  }

  render() {
    const { currentTab } = this.state

    return (
      <div className={styles}>
        <Paper>
          <Tabs
            className="main-navigation"
            value={currentTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            fullWidth
            centered
          >
            <Tab
              icon={<GroupIcon />}
              label="Politics"
              className="tab"
            />
            <Tab
              icon={<BusinessIcon />}
              label="Business"
              className="tab"
            />
            <Tab
              icon={<ThumbDownIcon />}
              label="Ethics"
              className="tab"
            />
          </Tabs>
        </Paper>
      </div>
    )
  }
}

Navigation.propTypes = {
  history: PropTypes.shape({}).isRequired
}

export default withRouter(Navigation)
