import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'
import { connect }                from 'react-redux'
import { withRouter }             from 'react-router-dom'
import DownloadIcon               from '@material-ui/icons/GetApp'
import saveAs                     from 'file-saver'
import Controls                   from '../../components/Controls'
import { styles }                 from './styles.scss'

class DownloadMessagePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextBtnDisabled: true
    }
  }

  getControls = () => {
    const { nextBtnDisabled } = this.state
    return (
      <Controls
        prevDisabled={false}
        nextDisabled={nextBtnDisabled}
        handleNext={this.proceed}
      />
    )
  }

  download = () => {
    const { proof } = this.props

    const blob = new Blob([proof.stagedProof], {
      type: 'text/plain;charset=utf-8'
    })
    saveAs(blob, 'cryptosource.txt')
    this.setState({
      nextBtnDisabled: false
    })
  }

  proceed = () => {
    const { history } = this.props
    history.push('/register?panel=4')
  }

  render() {
    return (
      <div className={styles}>
        <h2>You must download and save the message you just entered.</h2>
        <p>You will need the <em>exact</em> message you just entered to prove your
        credibility in the future.
        </p>
        <DownloadIcon className="download-icon" onClick={this.download} />
        {this.getControls()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    proof: state.proof
  }
}

DownloadMessagePanel.propTypes = {
  history: PropTypes.shape({}).isRequired,
  proof: PropTypes.shape({}).isRequired
}

export default withRouter(connect(mapStateToProps)(DownloadMessagePanel))
