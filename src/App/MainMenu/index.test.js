import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import MainMenu from '.';
import mainMenuData from '../mainMenuData'
import NewFileBox from './NewFileBox'

describe('MainMenu Component', () => {
  const props = {
    menu: mainMenuData,
    onMainMenuClick: sinon.spy(),
    onMouseUp: sinon.spy(),
    onGistClick: sinon.spy(),
    newFileBox: mainMenuData.topLevel.items[0].subLevel.items[0],
    openFileBox: mainMenuData.topLevel.items[0].subLevel.items[1],
    firstSaveBox: mainMenuData.topLevel.items[0].subLevel.items[2],
    saveAsBox: mainMenuData.topLevel.items[0].subLevel.items[3],
    printFileBox: mainMenuData.topLevel.items[0].subLevel.items[4],
    exitNotepadBox: mainMenuData.topLevel.items[0].subLevel.items[5],
    findBox: mainMenuData.topLevel.items[1].subLevel.items[6],
    replaceBox: mainMenuData.topLevel.items[1].subLevel.items[8],
    goToBox: mainMenuData.topLevel.items[1].subLevel.items[9],
    fontBox: mainMenuData.topLevel.items[2].subLevel.items[1],
    helpBox: mainMenuData.topLevel.items[4].subLevel.items[0],
    aboutBox: mainMenuData.topLevel.items[4].subLevel.items[1],
  }
  
  it('renders with props passed to it', function () {
    expect(shallow(<MainMenu {...props}/>).find('.menu').length).to.equal(1)
  })
})