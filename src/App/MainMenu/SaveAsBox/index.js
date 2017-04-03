import React, { Component } from 'react'
import './index.css'


class SaveAsBox extends Component {
  render () {
    return (
      <div className={(this.props.saveAsBox.showSaveAsBox) ? 'saveAsBox': 'saveAsBoxHidden'}>
        <div>Save As</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default SaveAsBox