import React, { Component } from 'react'

class HelpBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showHelpBox) ? 'helpBox': 'helpBoxHidden'}>
        <div>Help</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default HelpBox