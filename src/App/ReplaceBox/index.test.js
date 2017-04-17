import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import ReplaceBox from '.';


describe('ReplaceBox Component', () => {
  const props = {
    // replaceBox: mainMenuData.topLevel.items[1].subLevel.items[8]
    // files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
    // onGistClick: sinon.spy()
  }
  it('renders with props passed to it', function () {
    const onClickStub = sinon.spy()
    expect(shallow(<ReplaceBox {...props}/>)
    .find('.replaceBox').length).to.equal(1)
  })
})