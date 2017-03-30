import React, { Component } from 'react'

class AboutBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showAboutBox) ? 'aboutBox': 'aboutBoxHidden'}>
        <div>About React Notepad</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default AboutBox