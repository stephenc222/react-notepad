import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.topLevelMenu = this.topLevelMenu.bind(this)
    this.renderSubLevelMenu = this.renderSubLevelMenu.bind(this)
    
  }

  renderSubLevelMenu (subMenu,index) {

    return (
      <li key={index} onClick={(event) => this.props.onMainMenuClick(event, subMenu)}>{subMenu.label}</li>
    )
  }

  topLevelMenu (menu, index) {
    return (
      <li className={'menuItem'} key={menu.label} onClick={(event) => this.props.onMainMenuClick(event, menu)}> {menu.label}
          <ul className={`subMenu ${menu.visible ? menu.cssClass : menu.cssClass + 'Hidden'}`}>
            {menu.items.map((subItem, index) => this.renderSubLevelMenu(subItem,index))}
          </ul>
        
      </li>
    )

  }
  render () {
    return (
      <div>
        <ul className='menu'
          onMouseUp={() => this.props.onMouseUp()}>
            {this.props.mainMenu.map(this.topLevelMenu)}
        </ul>
      </div>
    )
  }
}

MainMenu.propTypes = {
  mainMenu: PropTypes.array.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMainMenuClick: PropTypes.func.isRequired
}

export default MainMenu