import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import FirstSaveBox from '.';
import mainMenuData from '../../mainMenuData'

describe('FirstSaveBox Component', () => {
  const props = {
    firstSaveBox: mainMenuData.topLevel.items[0].subLevel.items[1],
    // files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
    // onGistClick: sinon.spy()
  }
  it('renders with props passed to it', function () {
    expect(shallow(<FirstSaveBox {...props}/>).find('.firstSaveBoxHidden').length).to.equal(1)
  })
})