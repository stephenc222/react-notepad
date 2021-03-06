import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'


class FontBox extends Component {
  render () {
    return (
      <div className="fontBox">
        <div className="dialog-title">
          <div className="dialog-title--item">Font</div>
          <div className="dialog-title--item-X" onClick={this.props.handlers.onCancel}>X</div>
        </div>
        <div className="fontBox-form-container">
          <form className="fontBox-form" onSubmit={this.props.handlers.onSubmit}>
            <div className="fontChoice-container">
              <div id="font-container">
                <label>
                  Font:
                </label>
                <select 
                  size="4" 
                  value={this.props.fontType} 
                  onChange={this.props.handlers.handleTypeChange}>
                  <option value="monospace" >monospace</option>
                  <option value="TNR" >TNR</option>
                  <option value="Arial" >Arial</option>
                  <option value="Calibri" >Calibri</option>
                </select>  
              </div>   
              <div id="fontStyle-container">
                <label>
                  Font Style:
                </label>
                <select 
                  size="4" 
                  value={this.props.fontStyle} 
                  onChange={this.props.handlers.handleStyleChange}>
                  <option value="normal" >Normal</option>
                  <option value="italic" >Italic</option>
                  <option value="bold" >Bold</option>
                  <option value="boldItalic" >Bold Italic</option>
                </select>
              </div>
              <div id="fontSize-container">
                <label>
                  Size:
                </label>
                <select 
                  size="4" 
                  // value={this.props.fontSize} 
                  value={this.props.fontSize}
                  onChange={this.props.handlers.handleSizeChange}>
                  <option value={"16"} >16</option>
                  <option value={"18"} >18</option>
                  <option value={"20"} >20</option>
                  <option value={"22"} >22</option>
                </select>
              </div>
            </div>
            <div className="fontBox-buttons">
              <input type="submit" value="OK"/>
              <input type="button" value="Cancel" onClick={this.props.handlers.onCancel}/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

FontBox.propTypes = {
  handlers: PropTypes.object.isRequired
}

export default FontBox