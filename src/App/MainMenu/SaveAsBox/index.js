import React, { Component } from 'react'
import './index.css'


class SaveAsBox extends Component {
  
  render () {
    return (
      <div className={(this.props.saveAsBox.showSaveAsBox) ? 'saveAsBox': 'saveAsBoxHidden'}>
        <div className="saveAs-title">
          <div className="saveAs-title--item">Save As...</div>
          <div className="saveAs-title--item-X" onClick={this.props.saveAsHandleCancel}>X</div>
        </div>
        <div className="file-container">
          <div>{`Posting to your gists`}</div>
        </div>
        <div className="save-file-form-container">
          <form onSubmit={this.props.saveAsHandleSubmit}>
            <label>
              File Name:
              <input type="text" value={this.props.saveAsFormValue} onChange={this.props.saveAsHandleChange}/>
            </label>
            <input type="submit" value="Save" />
            <input type="button" value="Cancel" onClick={this.props.saveAsHandleCancel}/>            
          </form> 
        </div>
      </div>
    )
  }
}

export default SaveAsBox