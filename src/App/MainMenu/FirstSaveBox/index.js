import React, { Component } from 'react'

class FirstSaveBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showFirstSaveBox) ? 'firstSaveBox': 'firstSaveBoxHidden'}>
        <div>First Save</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default FirstSaveBox