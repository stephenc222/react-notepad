import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import OpenFileBox from '.';
import mainMenuData from '../../mainMenuData'

describe('OpenFileBox Component', () => {
  const props = {
    openItems: mainMenuData.topLevel.items[0].subLevel.items[1],
    files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
    onGistClick: sinon.spy()
  }
  it('renders with props passed to it', function () {
    const onClickStub = sinon.spy()
    expect(shallow(<OpenFileBox {...props}/>)
    .find('.openFileBoxHidden').length).to.equal(1)
  })
})