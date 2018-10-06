import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import { withRouter, Link }     from 'react-router-dom'
import ProgressIndicator        from 'components/ProgressIndicator'
import * as assetActionCreators from 'core/actions/actions-proof'
import { getString }            from 'core/libs/lib-proof-helpers'
import Controls                 from '../../components/Controls'
import { styles }               from './styles.scss'

class GenerateHashPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextBtnDisabled: true
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { actions, asset } = nextProps

    if (asset.assetHash === '') {
      getString(asset.stagedAsset, (assetUrl) => {
        setTimeout(() => {
          actions.asset.checkIfRegistered(assetUrl)
        }, 2000)
      })
    }

    if (asset.assetHash !== '') {
      return { nextBtnDisabled: false }
    } else if (asset.alreadyExists) {
      return { nextBtnDisabled: true }
    }

    return { nextBtnDisabled: true }
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

  proceed = () => {
    const { history } = this.props
    history.push('/register?panel=3')
  }

  render() {
    const { asset } = this.props
    const { alreadyExists, assetHash, error } = asset
    let content

    if (alreadyExists) {
      content = (
        <div className="notification">
          <h2>Sorry, someone already registered this photo!</h2>
          <span className="action"><Link to="/home">Upload a new photo</Link></span>
        </div>
      )
    } else if (assetHash) {
      content = (
        <div>
          <h2>Unique hash (SHA-256) of your photo asset</h2>
          <span>Click Next to register your asset</span>
          <div id="unique-hash">{assetHash}</div>
        </div>
      )
    } else if (error) {
      content = (
        <div className="notification">
          <h2>Sorry, there&apos;s an error!</h2>
          <span className="action"><Link to="/upload"> Please try again</Link></span>
        </div>
      )
    } else if (asset.stagedAsset) {
      content = (
        <div>
          <h2>Generating a unique hash of your asset...</h2>
          <div id="hash-progress-indicator">
            <ProgressIndicator type="linear" />
            <span className="blink-me">Please hold on...</span>
          </div>
        </div>
      )
    } else {
      content = (
        <div className="notification">
          <h2>Please upload a photo to register</h2>
          <span className="action"><Link to="/home">Upload a photo</Link></span>
        </div>
      )
    }

    return (
      <div className={styles}>
        {content}
        {this.getControls()}
      </div>
    )
  }
}

GenerateHashPanel.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  asset: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
}

function mapStateToProps(state) {
  return {
    asset: state.asset
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      asset: bindActionCreators(assetActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenerateHashPanel))
