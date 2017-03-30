import React, { Component } from 'react'

class PrintFileBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showPrintFileBox) ? 'printFileBox': 'printFileBoxHidden'}>
        <div>Print File</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default PrintFileBox