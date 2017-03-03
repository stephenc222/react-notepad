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

  renderSubLevelMenu(subMenu) {
    return (
      <ul>
        <li>{subMenu.label}</li>
      </ul>
    )

  }

  topLevelMenu(menu) {
    //const subLevel = menu.subLevel
    menu.subLevel.items.map((x) => console.log(x.label))
    return (
      <li key={menu.label} onClick={() => console.log('clickHandlerHere')}>
        {menu.label}
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