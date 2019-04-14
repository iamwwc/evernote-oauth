import React, { Component } from 'react';
import './App.css';
import { Output, Switch, Button } from './widgets'
import evernote from '@/static/evernote.png'
import '@/src/assets/scss/switch.scss'

function apiFetch(url) {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  return function send(data) {
    xhr.send(data)
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== xhr.DONE) return
        if (xhr.status !== 200) {
          reject(`status code ${xhr.status} with reason ${xhr.responseText}`)
          return
        }
        resolve(xhr.responseText)
      }
    })
  }

}

class App extends Component {
  constructor() {
    super()
    this.win = undefined
    this.authQuery = /[&?]?\S*(auth_token)(?:=)(\S+)/
    this.state = {
      renderResult: false,
      target: '',
      withToken: {}
    }
    this.startAuth = this.startAuth.bind(this)
  }
  startAuth() {
    let href = window.location.href
    let host = window.location.host
    this.win = window.open(`/auth?target=${this.state.target}`, 'auth_window', 'height=200,width=150')
    let timer = setTimeout(() => {
      let result
      if (result = (href.match(this.authQuery))) {
        let token = result[2]
        this.win.close()
        clearTimeout(timer)
        let apiSend = apiFetch('/auth_callback')
        apiSend(null)
          .then(response => {

          }).catch(err => {
            console.error(err)
          })
      }
    })
  }
  render() {
    let Result = Output(this.state.withToken)
    let r = this.state.renderResult
    return (
      <div className="App">
        <div className="imgContainer item">
          <img src={evernote} alt="" />
        </div>
        <Switch className="item" defaultActive froze="false"></Switch>
        <Button className="auth-btn" width="60" height="40" onClick={this.startAuth.bind(this)}></Button>
        {r && Result}
      </div>
    );
  }
}

export default App;
