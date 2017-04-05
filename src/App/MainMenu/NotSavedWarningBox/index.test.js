import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import NotSavedWarningBox from '.';
import mainMenuData from '../../mainMenuData'

describe('NotSavedWarningBox Component', () => {
  const props = {
    showNotSavedWarningBox: mainMenuData.topLevel.items[0].showNotSavedWarningBox,
    // files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
    // onGistClick: sinon.spy()
  }
  it('renders with props passed to it', function () {
    expect(shallow(<NotSavedWarningBox {...props}/>).find('.notSavedWarningBoxHidden').length).to.equal(1)
  })
})