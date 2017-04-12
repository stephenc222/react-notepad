import React, {Component} from 'react'
import { withRouter } from 'react-router'

class PageExitManager extends Component {  
  constructor (props) {    
    super(props)    
    this.onLeave = this.onleave.bind(this)  
  }  
  
  componentDidMount() {    
    this.props.router.setRouteLeaveHook(this.props.route, this.onLeave)  
  }  
  onLeave () {    
    if (this.props.isDirty) {      
      const exitMessage = 'You have unsaved information, are you sure you want to leave this page?'      
      return exitMessage    
    }  
  }  
  render () {    
    return (      
      <div className="PageExitManager-Container">        
      {this.props.children}      
      </div>    
      )  
    }
  }
  export default withRouter(PageExitManager)