import React, { Component } from 'react'

class SubMenuItem extends Component {

  onSubMenuSelection(item) {
    return (`Sub item: ${item}`)
  }
  render () {
    return (
      <ul className='menu'>
        {this.props.action.map((item, index) => {
        return (
          <li key={index} onClick={() => 
            this.onSubMenuSelection(item)}>{item.label}
          </li>
        )
        })}
      </ul>
    )
  }
}

export default SubMenuItem