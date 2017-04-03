import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import NewFileBox from '.';
import mainMenuData from '../../mainMenuData'

describe('NewFileBox Component', () => {
  const props = {
    openItems: mainMenuData.topLevel.items[0].subLevel.items[1],
    // files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
    // onGistClick: sinon.spy()
  }
  it('renders with props passed to it', function () {
    expect(shallow(<NewFileBox {...props}/>).find('.newFileBoxHidden').length).to.equal(1)
  })
})