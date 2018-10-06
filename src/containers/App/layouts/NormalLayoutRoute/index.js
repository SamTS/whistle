import React             from 'react'
import PropTypes         from 'prop-types'
import { Route }         from 'react-router-dom'
import { compose }       from 'redux'
import loadingComponent  from 'core/hocs/hoc-loading-component'
import ProgressIndicator from 'components/ProgressIndicator'
import Header            from './components/Header'
import Footer            from './components/Footer'
import { styles }        from './styles.scss'

const renderContent = ((props, matchProps, Component) => {
  const { isLoading } = props
  if (isLoading) {
    return (<ProgressIndicator className="main-loader" size={60} />)
  }
  return (<Component {...matchProps} />)
})

const NormalLayoutRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      render={matchProps => (
        <div className={styles}>
          <Header />
          <Footer />
          <div className="main-content normal-layout">
            {renderContent(props, matchProps, Component)}
          </div>
        </div>
    )}
    />
  )
}

NormalLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired
}


export default compose(
  loadingComponent()
)(NormalLayoutRoute)
