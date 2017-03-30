import React, { Component } from 'react'

class NewFileBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showNewFileBox) ? 'newFileBox': 'newFileBoxHidden'}>
        <div>New File</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default NewFileBox