import React, { Component } from 'react'

class FontBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showFontBox) ? 'fontBox': 'fontBoxHidden'}>
        <div>Font Selection</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default FontBox