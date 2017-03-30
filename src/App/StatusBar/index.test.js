import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import StatusBar from '.';

describe('StatusBar Component', () => {
  it('gets mounted to the dom', function () {
    expect(mount(<StatusBar />).find('.statusBar').length).to.equal(1)
  })
})