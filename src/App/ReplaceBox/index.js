import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'

class ReplaceBox extends Component {
  
  componentDidMount () {
    this.findInput.focus()
  }
  render () {
    return (
      <div className="replaceBox">
        <div className="dialog-title">
          <div className="dialog-title--item">Find and Replace</div>
          <div className="dialog-title--item-X" onClick={this.props.handlers.onCancel}>X</div>
        </div>
        <div className="ReplaceBox-container">
          <form className="ReplaceForm" onSubmit={this.props.handlers.onSubmit}>
            <div className="ReplaceBox-input--text">
              <label>
                Find What:
                <input 
                  type="text" 
                  name="findInFile"
                  ref={(input) => { this.findInput = input }}
                  value={this.props.findInFile} 
                  onChange={this.props.handlers.onChange}
                  autoComplete="off"
                />
              </label>
            </div>
            <div className="ReplaceBox-input--text">
              <label>
                Replace:
                <input 
                  type="text" 
                  name="replaceInFile"
                  // ref={(input) => { this.findInput = input }}
                  value={this.props.replaceInFile} 
                  onChange={this.props.handlers.replaceHandleChange}
                  autoComplete="off"
                />
              </label>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="matchCase" 
                  checked={this.props.matchCase}
                  onChange={this.props.handlers.onCheckBoxChange}/>
                Match Case              
              </label>
              <input type="submit" value="Replace" />
              <input type="button" value="Replace All" onClick={this.props.handlers.replaceAll}/>
              <input type="button" value="Cancel" onClick={this.props.handlers.onCancel}/>
            </div>
          </form> 
        </div>
      </div>
    )
  }
}

ReplaceBox.propTypes = {
  handlers: PropTypes.object.isRequired,
  replaceInFile: PropTypes.string.isRequired,
  findInFile: PropTypes.string.isRequired
}

export default ReplaceBox