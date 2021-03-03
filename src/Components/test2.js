import React, { Component } from 'react';
import IdleTimer from 'react-idle-timer';

export default class YourApp extends Component {
  constructor(props) {
    super(props)
    this.idleTimer = null
    this.handleOnAction = this.handleOnAction.bind(this)
    this.handleOnActive = this.handleOnActive.bind(this)
    this.handleOnIdle = this.handleOnIdle.bind(this)
  }

  render() {
    return (
      <div className="text-center">
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          timeout={1000 * 6000}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
        {/* your app here */}
      </div>
    )
  }

  handleOnAction (event) {
    console.log('user did something', event)
  }

  handleOnActive (event) {
    console.log('user is active', event)
    console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  handleOnIdle (event) {
    console.log('user is idle', event)
    console.log('last active', this.idleTimer.getLastActiveTime())
  }
}