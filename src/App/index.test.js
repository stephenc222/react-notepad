import React from 'react'
//import ReactDOM from 'react-dom'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import App from '.'
import {Api} from './helpers'

describe('App Component', () => {
  beforeAll( () => {
    sinon.stub(window, 'fetch')
    sinon.stub(Api, 'getGists')
    const res = new window.Response('{"test":"data"}', {
      status: 200,
      headers: {
        'Content-type': 'application/json',
        'charset': 'utf-8'
      }
    });

    window.fetch.returns(Promise.resolve(res));
  })

  afterAll( () => {
    window.fetch.restore()
  })

  it('gets mounted to the dom', () => {
    expect(mount(<App/>).find('.top-level-window').length).to.equal(1)
  })

  it('calls ComponentDidMount when mounted', function () {
    sinon.spy(App.prototype, 'componentDidMount');
    const wrapper = mount(<App/>)
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  })
})
  
