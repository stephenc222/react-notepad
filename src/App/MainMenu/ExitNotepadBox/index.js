import React, { Component } from 'react'
import './index.css'

class ExitNotepadBox extends Component {
  render () {
    return (
      <div className={(this.props.exitNotepadBox.showExitNotepadBox) ? 'exitNotepadBox': 'exitNotepadBoxHidden'}>
        <div>Exit React Notepad</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default ExitNotepadBox