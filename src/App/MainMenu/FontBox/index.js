import React, { Component } from 'react'
import './index.css'


class FontBox extends Component {
  render () {
    return (
      <div className={(this.props.fontBox.showFontBox) ? 'fontBox': 'fontBoxHidden'}>
        <div>Font Selection</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default FontBox