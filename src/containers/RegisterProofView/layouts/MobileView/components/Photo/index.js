import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { Paper }            from '@material-ui/core'
import imagePlaceholderSvg  from 'assets/svgs/image-placeholder.svg'
import ProgressIndicator    from 'components/ProgressIndicator'
import { getString }        from 'core/libs/lib-proof-helpers'
import { styles }           from './styles.scss'

class Photo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainImage: null,
      imageContainer: <ProgressIndicator
        type="circle"
        size={60}
        thickness={6}
      />
    }
  }

  componentDidMount() {
    this.setImage()
    this.showImage()
  }

  setImage=() => {
    const { asset } = this.props

    if (!asset.stagedAsset) {
      this.setState({
        mainImage: <img className="placholder-image" src={imagePlaceholderSvg} alt="Placeholder" />
      })
    } else {
      getString(asset.stagedAsset, (imageUrl) => {
        this.setState({
          mainImage: <img className="uploaded-image" src={imageUrl} alt="Uploaded" />
        })
      })
    }
  }

  showImage=() => {
    setTimeout(() => {
      const { mainImage } = this.state
      this.setState({ imageContainer: mainImage })
    }, 500)
  }

  render() {
    const { imageContainer } = this.state

    return (
      <div className={styles}>
        <div className="image-container">
          <Paper>
            <div className="image-preview">
              {imageContainer}
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}

Photo.propTypes = {
  asset: PropTypes.shape({}).isRequired
}

export default Photo
