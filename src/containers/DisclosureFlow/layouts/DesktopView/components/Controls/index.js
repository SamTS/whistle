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
    history.push(`/register?panel=${currentPanel - 1}`)
  }

  render() {
    const { nextLabel, nextDisabled, prevDisabled } = this.props

    return (
      <div className={styles}>
        <div className="button-controls">
          <Button
            type="contained"
            color="primary"
            disabled={nextDisabled}
            onClick={this.handleNext}
          >
            {nextLabel}
          </Button>
          <Button
            type="contained"
            color="secondary"
            disabled={prevDisabled}
            onClick={this.handlePrev}
          >
            Back
          </Button>
        </div>
      </div>
    )
  }
}

Controls.propTypes = {
  handleNext: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  nextLabel: PropTypes.string,
  nextDisabled: PropTypes.bool,
  prevDisabled: PropTypes.bool
}

Controls.defaultProps = {
  nextLabel: 'Next',
  nextDisabled: true,
  prevDisabled: true
}

export default withRouter(Controls)
