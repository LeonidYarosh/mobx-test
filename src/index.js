import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { observable, action, when, autorun } from 'mobx'
import { observer } from 'mobx-react'

import './index.css'

class Store {
  @observable count = 0
  @action increment() { this.count++ }
  @action decrement() { this.count-- }
}

const todos = observable([
  { text: 'Learn React' },
  { text: 'Learn Mobx' },
])

const appStore = new Store()

when(
  () => appStore.count > 5,
  () => { alert('Сработало')}
)

autorun(() => {
  alert(`Count value is: ${appStore.count}`)
}, {
  name: 'Custom autorun',
  delay: 3000,
})

@observer class Counter extends Component {
  static propTypes = {
    store: PropTypes.object,
  }

  handleIncrement = () => { this.props.store.increment() };
  handleDecrement = () => { this.props.store.decrement() };

  render() {
    return (
      <div className="App">
        <h1>{this.props.store.count}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>

        <ul>
          {todos.map(({ text }) =>
            <li key={text} >{text}</li>
          )}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter store={appStore} />,
  document.getElementById('root')
)

todos.push({ text: 'Learn Redux' })
