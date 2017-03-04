import React, { Component } from 'react'

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

  topLevelMenu(menu) {
    //const subLevel = menu.subLevel
    return (
      <li key={menu.label} onClick={(event) => this.props.onClick(event, menu)}>
        {menu.label}
        <ul className={menu.menu}>{menu.subLevel.items.map((subItem, index) => this.renderSubLevelMenu(subItem,index))}</ul>
        
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