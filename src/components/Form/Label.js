import React, { Component } from 'react'
import PropTypes            from 'prop-types'

/* component styles */
import { labelStyles } from './styles.scss'

class Label extends Component {
  render() {
    const { inputId, text } = this.props

    return (
      <div className={labelStyles}>
        <label htmlFor={inputId}>{text}</label>
      </div>
    )
  }
}

Label.propTypes = {
  inputId: PropTypes.string,
  text: PropTypes.string.isRequired
}

Label.defaultProps = {
  inputId: ''
}

export default Label
