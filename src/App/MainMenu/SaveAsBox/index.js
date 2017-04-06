import React, { Component } from 'react'
import './index.css'


class SaveAsBox extends Component {
  
  render () {
    return (
      <div className={(this.props.saveAsBox.showSaveAsBox) ? 'saveAsBox': 'saveAsBoxHidden'}>
        <div className="saveAsBox-info__container">
          <div className="saveAsBox__Title">Save As</div>
          <div 
            className="saveAsBox__Cancel-X-Button"
            onClick={() => {console.log('X cancel and disappear!')}}>X
          </div>
        </div>
        <div>
          <input className="newFileName" type="text"/>
          <button onClick={() => {console.log('make POST not war!')}}>Save</button>
          <button 
            className="saveAsBox__Cancel-button"
            onClick={() => {console.log('actual cancel button!')}}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default SaveAsBox