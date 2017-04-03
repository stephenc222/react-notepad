import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import ExitNotepadBox from '.';
import mainMenuData from '../../mainMenuData'

describe('ExitNotepadBox Component', () => {
  const props = {
    exitNotepadBox: mainMenuData.topLevel.items[0].subLevel.items[5],
    // files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
    // onGistClick: sinon.spy()
  }
  it('renders with props passed to it', function () {
    expect(shallow(<ExitNotepadBox {...props}/>).find('.exitNotepadBoxHidden').length).to.equal(1)
  })
})