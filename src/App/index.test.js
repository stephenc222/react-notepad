import React from 'react'
//import ReactDOM from 'react-dom'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import App from '.'
import { fetchData } from './__mocks__/fetch'

describe('App Component', () => {
  // const jack = {"hello":"world"}
  beforeAll( () => {
    sinon.stub(window, 'fetch')
    const res = new window.Response('{"test":"data"}', {
    // const res = new window.Response(fetchData, {
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
    //const div = document.createElement('div')
    //ReactDOM.render(<App />, div)
    expect(mount(<App/>).find('.top-level-window').length).to.equal(1)
  })
})
  
