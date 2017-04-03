import React, { Component } from 'react'
import './index.css'


class NewFileBox extends Component {
  render () {
    return (
      <div className={(this.props.newFileBox.showNewFileBox) ? 'newFileBox': 'newFileBoxHidden'}>
        <div>New File</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default NewFileBox