import React            from 'react'
import { Route }        from 'react-router-dom'
import cryptoSourceLogo from 'assets/svgs/cryptosource-logo.svg'
import { styles }       from './styles.scss'

const RegistrationLayoutRoute = ({ component: Component }) => {
  return (
    <Route
      render={matchProps => (
        <div className={styles}>
          <div className="main-content registration-layout">
            <img alt="Crypto Source logo" id="main-logo" src={cryptoSourceLogo} />
            <Component {...matchProps} />
          </div>
        </div>
    )}
    />
  )
}

export default RegistrationLayoutRoute
