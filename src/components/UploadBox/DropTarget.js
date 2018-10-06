import React, { Component }                 from 'react'
import PropTypes                            from 'prop-types'
import { DropTarget as reactDnDDropTarget } from 'react-dnd'
import Button                               from 'components/Button'
import UploadIcon                           from '@material-ui/icons/CloudUpload'
import withWidth, { isWidthUp }             from '@material-ui/core/withWidth'

const boxTarget = {
  drop(props, monitor) {
    if (props.onDrop) {
      props.onDrop(props, monitor)
    }
  }
}

@reactDnDDropTarget(props => props.accepts, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class DropTarget extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      files: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.files !== this.props.files) {
      this.setState({ files: nextProps.files })
    }
  }

  static getFileList(files) {
    const list = files.map(file =>
      (
        <li key={file.name}>
          {`${file.name}, of size ${file.size}, and type ${file.type}`}
        </li>
      )
    )

    return <ul id="file-list">{list}</ul>
  }

  getHelperText=() => {
    let helperText
    const { width } = this.props
    const { files } = this.state
    const isActive = this.isActive()

    if (isWidthUp('md', width)) {
      if (isActive) {
        helperText = 'Release to drop'
      } else if (!isActive && files.length === 0) {
        helperText = 'You can drag your asset here'
      }
    } else {
      helperText = 'Complete 3 easy steps to register your asset.'
    }

    return <span className="helper-text">{helperText}</span>
  }

  showUploadDialogBox=() => {
    const { files } = this.props

    if (files.length === 0) {
      this.inputElement.click()
    }
  }

  handleFileUpload=(evt) => {
    const { files } = evt.target
    const { onDrop, setUploadedFile } = this.props

    if (files.length) {
      onDrop()
      setUploadedFile(files)
      this.setState({ files: [files[0]] })
    }
  }

  isActive=() => {
    const { canDrop, isOver } = this.props
    return canDrop && isOver
  }

  render() {
    const { connectDropTarget } = this.props
    const { files } = this.state
    const fileList = DropTarget.getFileList(files)
    const helperText = this.getHelperText()
    const isActive = this.isActive()
    const containerClassName = isActive ? 'drop' : ''

    return connectDropTarget(
      <div className={`upload-container ${containerClassName}`}>
        <div className="upload-actions">
          <UploadIcon className="upload-icon" />
          <Button
            variant="contained"
            color="primary"
            className="upload-btn"
            onClick={this.showUploadDialogBox}
          >
            Upload Asset
          </Button>
          <input
            name="myFile"
            type="file"
            ref={(input) => { this.inputElement = input }}
            onChange={this.handleFileUpload}
          />
          {fileList}
          {helperText}
        </div>
      </div>
    )
  }
}

DropTarget.propTypes = {
  files: PropTypes.instanceOf(Array).isRequired,
  setUploadedFile: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
}

export default withWidth()(DropTarget)
