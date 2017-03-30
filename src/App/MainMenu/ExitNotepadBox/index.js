import React, { Component } from 'react'

class ExitNotepadBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showExitNotepadBox) ? 'exitNotepadBox': 'exitNotepadBoxHidden'}>
        <div>Exit React Notepad</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default ExitNotepadBox