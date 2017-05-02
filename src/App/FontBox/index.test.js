import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import FontBox from '.';

describe('FontBox Component', () => {
  const props = {
    // fontBox: mainMenuData.topLevel.items[0].subLevel.items[1],
    // files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
    // onGistClick: sinon.spy()
    fontType: '',
    fontStyle: '',
    fontSize: 24,
    handlers: {
      onCancel: sinon.spy(),
      handleFontStyleChange: sinon.spy(),
      handleFontTypeChange: sinon.spy(),
      handleFontSizeChange: sinon.spy(),
      onSubmit: sinon.spy()
    }
  }
  it('renders with props passed to it', function () {
    expect(shallow(<FontBox {...props}/>).find('.fontBox').length).to.equal(1)
  })
})