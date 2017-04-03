import React, { Component } from 'react'
import './index.css'


class AboutBox extends Component {
  render () {
    return (
      <div className={(this.props.aboutBox.showAboutBox) ? 'aboutBox': 'aboutBoxHidden'}>
        <div>About React Notepad</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default AboutBox