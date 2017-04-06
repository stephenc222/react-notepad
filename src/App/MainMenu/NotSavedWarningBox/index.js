import React, { Component } from 'react'
import './index.css'


class NotSavedWarningBox extends Component {
  render () {
    return (
      <div className={(this.props.showNotSavedWarningBox) ? 'notSavedWarningBox': 'notSavedWarningBoxHidden'}>
        <div>Warning - File Not Saved!</div>
        <div>{'Are you sure you don\'t want to save first?'}</div>
        <div className="notSaved__buttons">
          <div onClick={this.props.onClickSaveYes}>Save</div>
          <div onClick={this.props.onClickSaveNo}>Don't Save</div>
          <div onClick={this.props.onClickSaveCancel}>Cancel</div>
        </div>
      </div>
    )
  }
}

export default NotSavedWarningBox