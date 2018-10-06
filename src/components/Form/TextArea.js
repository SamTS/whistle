import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { textAreaStyles }   from './styles.scss'

class TextArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    const { value, autoFocus } = this.props
    /* eslint-disable */
    if (value) { this.setState({ value }) }
    if (autoFocus) { this.TextArea.focus() }
  }

  onChange=(evt) => {
    const { value } = evt.currentTarget
    const { type, checkIfValid } = this.props

    this.setState({ value })
  }

  onKeyPress = (evt) => {
    const { onKeyPress } = this.props
    if (onKeyPress) { onKeyPress(evt) }
  }

  render() {
    const { value } = this.state
    const {
      type,
      placeholder,
      disabled,
      required
    } = this.props

    return (
      <div className={textAreaStyles}>
        <TextArea
          type={type}
          required={required}
          value={value}
          ref={(TextArea) => { this.TextArea = TextArea }}
          placeholder={placeholder}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPress}
          disabled={disabled}
        />
      </div>
    )
  }
}

TextArea.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  checkIfValid: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string
}

TextArea.defaultProps = {
  autoFocus: false,
  disabled: false,
  onKeyPress: null,
  placeholder: '',
  checkIfValid: null,
  required: false,
  value: ''
}

export default TextArea
