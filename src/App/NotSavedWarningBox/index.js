import React, { Component } from 'react'
import './index.css'


class NotSavedWarningBox extends Component {
  render () {
    return (
      <div className="notSavedWarningBox">
        <div>Warning - File Not Saved!</div>
        <div>{'Are you sure you don\'t want to save first?'}</div>
        <div className="notSaved__buttons">
          <input type="button" value="Save" onClick={this.props.onClickSaveYes} />
          <input type="button" value="Don't Save" onClick={this.props.onClickSaveNo} />
          <input type="button" value="Cancel" onClick={this.props.onClickSaveCancel} />
        </div>
      </div>
    )
  }
}

export default NotSavedWarningBox