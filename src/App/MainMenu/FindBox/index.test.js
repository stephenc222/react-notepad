import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import FindBox from '.';
import mainMenuData from '../../mainMenuData'

describe('FindBox Component', () => {
  const props = {
    findBox: mainMenuData.topLevel.items[1].subLevel.items[6],
    // files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
    // onGistClick: sinon.spy()
  }
  it('renders with props passed to it', function () {
    expect(shallow(<FindBox {...props}/>).find('.findBoxHidden').length).to.equal(1)
  })
})