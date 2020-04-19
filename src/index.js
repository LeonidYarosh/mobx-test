import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { appStore, Store } from './store'

import { Table } from './components/table'
import { Controls } from './components/controls'
import { Error } from './components/error'

import './index.css'


class App extends Component {
  render() {
    return (
      <div>
        <h1>Sprint Board:</h1>
        <Controls store={appStore} />
        <Error store={appStore}>
          <Table store={appStore} />
        </Error>
      </div>
    )
  }
}

ReactDOM.render(
  <App store={Store} />,
  document.getElementById('root')
)
