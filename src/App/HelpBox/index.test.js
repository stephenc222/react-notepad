import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import HelpBox from '.';
import mainMenuData from '../mainMenuData'

describe('HelpBox Component', () => {
  const props = {
    helpBox: mainMenuData.topLevel.items[0].subLevel.items[1],
    // files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
    // onGistClick: sinon.spy()
  }
  it('renders with props passed to it', function () {
    expect(shallow(<HelpBox {...props}/>).find('.helpBox').length).to.equal(1)
  })
})