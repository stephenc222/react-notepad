import React, { Component } from 'react'
import './index.css'


class NotSavedWarningBox extends Component {
  render () {
    return (
      <div className={(this.props.showNotSavedWarningBox) ? 'notSavedWarningBox': 'notSavedWarningBoxHidden'}>
        <div>Warning - File Not Saved!</div>
        <div>{'Are you sure you don\'t want to save first?'}</div>
      </div>
    )
  }
}

export default NotSavedWarningBox