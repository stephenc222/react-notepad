import React, { Component } from 'react'
import './index.css'

class ReplaceBox extends Component {
  render () {
    return (
      <div className={(this.props.replaceBox.showReplaceBox) ? 'replaceBox': 'replaceBoxHidden'}>
        <div>Replace</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default ReplaceBox