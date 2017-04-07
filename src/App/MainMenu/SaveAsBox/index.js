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
            <div>
              <label>
                File Name:
              </label>
              <input 
                type="text" 
                name="saveAsFormFileName"
                value={this.props.saveAsFormFileName} 
                onChange={this.props.saveAsHandleChange}
              />
            </div>
            <div>
              <label>
                Gist Description:
              </label>
              <textarea 
                className="gist-description" 
                cols="80" 
                rows="10" 
                name="saveAsFormFileDescription"
                value={this.props.saveAsFormFileDescription}
                onChange={this.props.saveAsHandleChange}>
              </textarea>
            </div>
            <div className="saveAs-buttons">
              <input type="submit" value="Save" />
              <input type="button" value="Cancel" onClick={this.props.saveAsHandleCancel}/>         
            </div>
          </form> 
        </div>
      </div>
    )
  }
}

export default SaveAsBox