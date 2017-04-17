import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import MainMenu from '.'
import fileMenu from '../ui-data/fileMenu'
import editMenu from '../ui-data/editMenu'
import formatMenu from '../ui-data/formatMenu'
import viewMenu from '../ui-data/viewMenu'
import helpMenu from '../ui-data/helpMenu'


describe('MainMenu Component', () => {
  const props = {
    mainMenu: [
      fileMenu,
      editMenu,
      formatMenu,
      viewMenu,
      helpMenu
    ],
    onMainMenuClick: sinon.spy(),
    onMouseUp: sinon.spy(),
  }
  
  it('renders with props passed to it', function () {
    expect(shallow(<MainMenu {...props}/>).find('.menu').length).to.equal(1)
  })
})