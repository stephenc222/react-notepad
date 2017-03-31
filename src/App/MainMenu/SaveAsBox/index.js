import React, { Component } from 'react'

class SaveAsBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showSaveAsBox) ? 'saveAsBox': 'saveAsBoxHidden'}>
        <div>Save As</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default SaveAsBox