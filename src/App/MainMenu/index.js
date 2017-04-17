import React, { Component } from 'react'
// import NotSavedWarningBox from './NotSavedWarningBox'
// import OpenFileBox from './OpenFileBox'
// import SaveAsBox from './SaveAsBox'
// import FindBox from './FindBox'
// import ReplaceBox from './ReplaceBox'
// import GoToBox from './GoToBox'
// import FontBox from './FontBox'
// import HelpBox from './HelpBox'
// import AboutBox from './AboutBox'
import './index.css'

export default class MainMenu extends Component {
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
