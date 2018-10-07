import React, { Component }         from 'react'
import PropTypes                    from 'prop-types'
import { connect }                  from 'react-redux'
import { bindActionCreators }       from 'redux'
import * as proofActionCreators     from 'core/actions/actions-proof'
import withWidth                    from '@material-ui/core/withWidth'
import Slide                        from '@material-ui/core/Slide'
import DesktopView                  from './layouts/DesktopView'
import { styles }                   from './styles.scss'

class DisclosureFlow extends Component {
  getPanel = () => {
    const { location } = this.props
    return parseInt(location.search.substr(1).split('=')[1], 10)
  }

  renderView=() => {
    const { proof } = this.props
    const panel = this.getPanel()

    return (<DesktopView proof={proof} panel={panel} />)
  }

  render() {
    return (
      <Slide direction="left" in mountOnEnter unmountOnExit>
        <div className={styles}>
          {this.renderView()}
        </div>
      </Slide>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: {
      proof: bindActionCreators(proofActionCreators, dispatch)
    }
  }
}

DisclosureFlow.propTypes = {
  proof: PropTypes.shape({}),
  actions: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired
}

DisclosureFlow.defaultProps = {
  proof: null
}

export default withWidth()(connect(null, mapDispatchToProps)(DisclosureFlow))
