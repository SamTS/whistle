import React, { Component } from 'react'
import { styles } from './styles.scss'

class AboutUsView extends Component {
  render() {
    return (
      <div className={styles}>
        <div className="container">
          <div className="about-us-header">
            <h1>About Us</h1>
          </div>
          <div className="about-us-sub-header">
            <h2>What is CryptoSource</h2>
          </div>
          <div className="about-us-content">
            <body>Whatever you want it to be</body>
          </div>
          <div className="about-us-sub-header">
            <h2>How it works</h2>
          </div>
          <div className="about-us-content">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/vxHH8tK77rk"
              title="CryptoSource"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="about-us-sub-header">
            <h2>FAQ</h2>
          </div>
          <div className="about-us-content">
            <body>Q: Why should I trust CryptoSource</body>
            <body>A: Because it is what you want it to be</body>
          </div>
          <div className="about-us-content">
            <body>Q: Why is CryptoSource so awesome</body>
            <body>A: Because it is what you want it to be :P</body>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutUsView
