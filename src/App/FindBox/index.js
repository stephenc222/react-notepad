import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'


class FindBox extends Component {

  componentDidMount () {
    this.findInput.focus()
  }
  render () {
    return (
      <div className="findBox">
        <div className="dialog-title">
          <div className="dialog-title--item">Find</div>
          <div className="dialog-title--item-X" onClick={this.props.handlers.onCancel}>X</div>
        </div>
        <div className="findBox-container">
          <form className="findForm" onSubmit={this.props.handlers.onSubmit}>
            <div className="findBox-input--text">
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
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="matchCase" 
                  checked={this.props.matchCase}
                  onChange={this.props.handlers.onCheckBoxChange}/>
                Match Case              
              </label>
              <input type="submit" value="Find Next" />
              <input type="button" value="Cancel" onClick={this.props.handlers.onCancel}/>
            </div>
          </form> 
        </div>
      </div>
    )
  }
}

FindBox.propTypes = {
  findInFile: PropTypes.string.isRequired,
  matchCase: PropTypes.bool.isRequired,
  handlers: PropTypes.object.isRequired
}

export default FindBox