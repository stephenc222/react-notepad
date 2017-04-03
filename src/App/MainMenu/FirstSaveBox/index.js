import React, { Component } from 'react'
import './index.css'


class FirstSaveBox extends Component {
  render () {
    return (
      <div className={(this.props.firstSaveBox.showFirstSaveBox) ? 'firstSaveBox': 'firstSaveBoxHidden'}>
        <div>First Save</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default FirstSaveBox