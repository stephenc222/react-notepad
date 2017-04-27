import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import OpenFileBox from '.';

describe('OpenFileBox Component', () => {
  const props = {
    // userGists: [],
    userGists: [
      [{name:'gistOne'}], 
      [{name:'gistTwo'}], 
      [{name: 'gistThree'}]
    ],
    openFileName: '',
    openFileOptions: [],
    onGistClick: sinon.spy(),
    handlers: {
      onCancel: sinon.spy()
    },
    openFileHandleSubmit: sinon.spy(),
    openFileHandleChange: sinon.spy(),
    handleCancel: sinon.spy(),
    openFileName: ''
  }
  it('renders with props passed to it', function () {
    const wrapper = mount(<OpenFileBox {...props}/>)
    expect(wrapper.find('.openFileBox').length).to.equal(1)
  })

  it('calls ComponentDidMount when mounted', function () {
    sinon.spy(OpenFileBox.prototype, 'componentDidMount');
    const wrapper = mount(<OpenFileBox {...props}/>)
    
    expect(OpenFileBox.prototype.componentDidMount.calledOnce).to.equal(true);
  })

  it('should render all gists as expected', function () {
    const renderEachGistFile = sinon.spy(OpenFileBox.prototype, 'renderEachGistFile')
    const component = mount(<OpenFileBox {...props} />)
    expect(renderEachGistFile.callCount).to.equal(3)
    expect(component.find('li')).to.have.length(3)

    renderEachGistFile.restore()
  })

  it('calls the form onChange event handler', () => {
    const wrapper = mount(<OpenFileBox {...props}/>)
    wrapper.find("input[type='text']").simulate('change')
    expect(wrapper.prop('openFileHandleChange')).to.have.property('callCount', 1)
  })

  it('calls the form submit event handler', () => {
    const wrapper = mount(<OpenFileBox {...props}/>)
    wrapper.find("input[type='submit']").simulate('submit')
    expect(wrapper.prop('openFileHandleSubmit')).to.have.property('callCount', 1)
  })

  it('calls the cancel onClick event handler', () => {
    const wrapper = mount(<OpenFileBox {...props}/>)
    wrapper.find("input[type='button']").simulate('click')
    expect(wrapper.props().handlers.onCancel).to.have.property('callCount', 1)
  })
})