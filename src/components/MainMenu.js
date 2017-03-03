import React, { Component } from 'react'

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.onMenuSelection = this.onMenuSelection.bind(this)
  }
  onMenuSelection(menuItem) {
    console.log(menuItem)
  }

  TopLevelMenu(menu) {
    return (
      <li key={menu.label} onClick={() => 
        this.onMenuSelection(menu)}>{menu.label}</li>
    )

  }
  render () {
    return (
      <div>
      <ul className='menu'>
      {this.props.menu.topLevel.items.map(this.TopLevelMenu)}
      </ul>
      </div>
    )
  }
}

export default MainMenu