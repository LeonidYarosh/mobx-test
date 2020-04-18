import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {observable, action, configure, decorate } from 'mobx'
import { observer } from 'mobx-react'

import './index.css'

configure({enforceActions: 'observed'})

class Store {
  user = null


  setUser(res) {
    this.user = res[0]
  }

  getUser() {
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(res => {
        if (res.results) {
          this.setUser(res.results)
        }
      })
      .catch ((e) => {
        console.error(e)
      })
  }

}

decorate(Store, {
  user: observable,
  getUser: action.bound,
  setUser: action,
})

const appStore = new Store()


@observer class App extends Component {
  render() {
    const {
      store
    } = this.props

    return (
      <div>
        <button onClick={store.getUser} >Get user</button>
        <h1>{store.user?.login?.username || 'Default Name'}</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App store={appStore} />,
  document.getElementById('root')
);
