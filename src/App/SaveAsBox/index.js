import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'


class SaveAsBox extends Component {
  
  render () {
    return (
      <div className="saveAsBox">
        <div className="saveAs-title">
          <div className="saveAs-title--item">Save As...</div>
          <div className="saveAs-title--item-X" onClick={this.props.handleCancel}>X</div>
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
              <input 
                type="radio" 
                name="gistType" 
                value="secret"
                // defaultChecked={true}
                checked={this.props.gistType==='secret'}                
                onChange={this.props.saveAsHandleChange}/>secret
              <input 
                type="radio" 
                name="gistType" 
                value="public"
                checked={this.props.gistType==='public'}
                onChange={this.props.saveAsHandleChange}/>public
            </div>
            <div>
              <label>
                Gist Description:
              </label>
              <textarea 
                className="gist-description" 
                cols="70" 
                rows="10" 
                name="saveAsFormFileDescription"
                value={this.props.saveAsFormFileDescription}
                onChange={this.props.saveAsHandleChange}>
              </textarea>
            </div>
            <div className="saveAs-buttons">
              <input type="submit" value="Save" />
              <input type="button" value="Cancel" onClick={this.props.handleCancel}/>         
            </div>
          </form> 
        </div>
      </div>
    )
  }
}

SaveAsBox.propTypes = {
  saveAsHandleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  saveAsHandleChange: PropTypes.func.isRequired,
  saveAsFormFileName: PropTypes.string.isRequired,
  saveAsFormFileDescription: PropTypes.string.isRequired
}

export default SaveAsBox