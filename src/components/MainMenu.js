import React, { Component } from 'react'

class MainMenu extends Component {
  constructor(props) {
    super(props)
    //this.onMenuSelection = this.onMenuSelection.bind(this)
    this.topLevelMenu = this.topLevelMenu.bind(this)
    this.renderSubLevelMenu = this.renderSubLevelMenu.bind(this)
    
  }
  onMenuSelection(menuItem) {
    console.log(menuItem)
  }

  renderSubLevelMenu(subMenu,index) {
    return (
        // first attempt at adding individual clickHandlers, names are right
        <li key={index} onClick={() => console.log(subMenu.onClick)}>{subMenu.label}</li>
    )

  }

  topLevelMenu(menu) {
    //const subLevel = menu.subLevel
    return (
      <li key={menu.label} onClick={() => console.log(menu.menu)}>
        {menu.label}
        <ul className='subMenuItems'>{menu.subLevel.items.map((subItem, index) => this.renderSubLevelMenu(subItem,index))}</ul>
        
      </li>
    )

  }
  render () {
    return (
      <div>
      <ul className='menu'>
      {this.props.menu.topLevel.items.map(this.topLevelMenu)}
      </ul>
      </div>
    )
  }
}

export default MainMenu