import React, { Component } from 'react'
import './index.css'


class HelpBox extends Component {
  render () {
    return (
      <div className={(this.props.helpBox.showHelpBox) ? 'helpBox': 'helpBoxHidden'}>
        <div>Help</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default HelpBox