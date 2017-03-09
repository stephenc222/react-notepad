import React, { Component } from 'react'
import './index.css'

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.topLevelMenu = this.topLevelMenu.bind(this)
    this.renderSubLevelMenu = this.renderSubLevelMenu.bind(this)
    
  }

  renderSubLevelMenu(subMenu,index) {
    //console.log(`props inside of renderSubLevelMenu: ${JSON.stringify(this.props.menu)}`)
    return (
        // first attempt at adding individual clickHandlers, names are right
        <li key={index} onClick={(event) => this.props.onClick(event, subMenu)}>{subMenu.label}</li>
    )

  }

  topLevelMenu(menu, index) {
    //const subLevel = menu.subLevel
    return (
      <li 
        className={`menuItem main${menu.label}Item${menu.subLevel.hover ? 'Hover':''}`} 
        key={menu.label} 
        onClick={(event) => this.props.onClick(event, menu)}
        onMouseOver={(event) => this.props.onMouseOver(event, menu, index)}
        onMouseOut={(event) => this.props.onMouseOut(event, menu, index)}>
        {menu.label}
        <ul className={`subMenu ${menu.subLevel.visible ? menu.menu : menu.menu + 'Hidden'}`}>{menu.subLevel.items.map((subItem, index) => this.renderSubLevelMenu(subItem,index))}</ul>
        
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