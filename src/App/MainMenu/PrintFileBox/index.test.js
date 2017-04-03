import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import PrintFileBox from '.';
import mainMenuData from '../../mainMenuData'

describe('PrintFileBox Component', () => {
  const props = {
    printFileBox: mainMenuData.topLevel.items[0].subLevel.items[4],
    // files: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files,
    // onGistClick: sinon.spy()
  }

  it('renders with props passed to it', function () {
    expect(shallow(<PrintFileBox {...props}/>).find('.printFileBoxHidden').length).to.equal(1)
  })
})