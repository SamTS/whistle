import React, { Component }      from 'react'
import PropTypes                 from 'prop-types'
import {
  Stepper as MuiStepper,
  Step,
  StepLabel
} from '@material-ui/core'
import { styles }                from './styles.scss'

class Stepper extends Component {
  render() {
    const { activeStep, steps } = this.props

    return (
      <div className={styles}>
        <MuiStepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label} {...this.props}>
                <StepLabel
                  classes={{ root: 'root', disabled: 'disabled' }}
                >
                  {label}
                </StepLabel>
              </Step>
            )
          })}
        </MuiStepper>
      </div>
    )
  }
}

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Stepper
