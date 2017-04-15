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
          <ul className={`subMenu ${menu.subLevel.visible ? menu.menu : menu.menu + 'Hidden'}`}>
            {menu.subLevel.items.map((subItem, index) => this.renderSubLevelMenu(subItem,index))}
          </ul>
        
      </li>
    )

  }
  render () {
    return (
      <div>
        <ul className='menu'
          onMouseUp={() => this.props.onMouseUp()}>
            {this.props.menu.topLevel.items.map(this.topLevelMenu)}
        </ul>
        {/*<NotSavedWarningBox
          showNotSavedWarningBox={this.props.showNotSavedWarningBox}
          onClickSaveYes={this.props.onClickSaveYes}
          onClickSaveNo={this.props.onClickSaveNo}
          onClickSaveCancel={this.props.onClickSaveCancel}
        />*/}
        {/*<OpenFileBox 
          onGistClick={this.props.onGistClick}
          openFileHandleChange={this.props.openFileHandleChange}
          openFileHandleSubmit={this.props.openFileHandleSubmit}
          openFileHandleCancel={this.props.openFileHandleCancel}
          openFileName={this.props.openFileName}
          openFileBox={this.props.openFileBox}
        />*/}        
        {/*<SaveAsBox 
          saveAsBox={this.props.saveAsBox}
          gistType={this.props.gistType}
          saveAsFormFileName={this.props.saveAsFormFileName}
          saveAsFormFileDescription={this.props.saveAsFormFileDescription}
          saveAsHandleChange={this.props.saveAsHandleChange}
          saveAsHandleSubmit={this.props.saveAsHandleSubmit}
          saveAsHandleCancel={this.props.saveAsHandleCancel}
        />*/}
        {/*<FindBox 
          findBox={this.props.findBox}
        />
        <ReplaceBox 
          replaceBox={this.props.replaceBox}
        />
        <GoToBox 
          goToBox={this.props.goToBox}
        />
        <FontBox 
          fontBox={this.props.fontBox}
        />
        <HelpBox 
          helpBox={this.props.helpBox}
        />
        <AboutBox 
          aboutBox={this.props.aboutBox}
        />*/}
      </div>
    )
  }
}
