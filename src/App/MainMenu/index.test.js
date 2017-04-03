import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import MainMenu from '.';
import mainMenuData from '../mainMenuData'

describe('MainMenu Component', () => {
  const props = {
    menu: mainMenuData,
    onMainMenuClick: sinon.spy(),
    onMouseUp: sinon.spy(),
    onGistClick: sinon.spy(),
    openItems: mainMenuData.topLevel.items[0].subLevel.items[1],
    files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
  }
  
  it('renders with props passed to it', function () {
    expect(shallow(<MainMenu {...props}/>).find('.menu').length).to.equal(1)
  })
})