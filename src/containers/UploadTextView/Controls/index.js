import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'
import Button               from 'components/Button'
import { styles }           from './styles.scss'

class Controls extends Component {
  handleNext = () => {
    const { handleNext } = this.props
    handleNext()
  }

  handlePrev = () => {
    const { history, location } = this.props
    const currentPanel = parseInt(location.search.substr(1).split('=')[1], 10)
    history.push(`/disclosure?panel=${currentPanel - 1}`)
  }

  render() {
    return (
      <div className={styles}>
        <div className="button-controls">
          <Button
            type="contained"
            color="primary"
            onClick={this.handleNext}
          >
            submit
          </Button>
        </div>
      </div>
    )
  }
}

Controls.propTypes = {
  handleNext: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired
}

export default withRouter(Controls)
