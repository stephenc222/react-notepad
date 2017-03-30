import React, { Component } from 'react'

class ReplaceBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showReplaceBox) ? 'replaceBox': 'replaceBoxHidden'}>
        <div>Replace</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default ReplaceBox