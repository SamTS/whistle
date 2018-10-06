import React             from 'react'
import PropTypes         from 'prop-types'
import { connect }       from 'react-redux'
import ProgressIndicator from 'components/ProgressIndicator'

const propTypes = {
  loading: PropTypes.bool
}

const defaultProps = {
  loading: false
}

export function enhanceComponent(WrappedComponent) {
  class LoadingComponent extends React.Component {
    render() {
      const isLoading = false

      return (
        <div>
          {isLoading && <ProgressIndicator className="main-loader" size={60} color="secondary" />}
          <div>
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }

  LoadingComponent.propTypes = propTypes
  LoadingComponent.defaultProps = defaultProps

  return LoadingComponent
}

export default function loadingComponent(listKey) {
  return function enhance(WrappedComponent) {
    return connect(
    )(enhanceComponent(WrappedComponent, listKey))
  }
}
