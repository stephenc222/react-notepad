import React, { Component } from 'react'

class MainMenu extends Component {
  onMenuSelection(item) {
    item.action()
  }
  render () {
    return (
      <ul className='menu'>
      {this.props.items.map((item, index) => {
      return (
       <li key={index} onClick={() => 
         this.onMenuSelection(item)}>{item.label}</li>
      )
      })}
      </ul>
    )
  }
}

export default MainMenu