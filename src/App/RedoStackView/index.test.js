import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import RedoStackView from '.';

describe('RedoStackView Component', () => {
  it('gets mounted to the dom', function () {
    expect(mount(<RedoStackView redoStackObject={[]}/>).find('.redoStackView').length).to.equal(1)
  })
})