import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { observable, action, configure, computed, decorate } from 'mobx'
import { observer } from 'mobx-react'

import './index.css'

configure({ enforceActions: 'observed' })

class Store {
  devsList = [
    { id: '1', name: 'Jack', sp: 12 },
    { id: '2', name: 'Max', sp: 10 },
    { id: '3', name: 'Leo', sp: 8 },
  ]
  filter = ''

  get totalSum() {
    return this.devsList.reduce((sum, { sp }) => sum += sp, 0)
  }

  get topPerformer() {
    let nameMax = ''
    let spMax = 0

    this.devsList.forEach(el => {
      if (spMax < el.sp) {
        nameMax = el.name
        spMax = el.sp
      }
    })

    return nameMax
  }

  get filteredDev() {
    return this.devsList.filter(({ name }) => name.toLowerCase().includes(this.filter.toLowerCase() || ''))
  }

  clearList() {
    this.devsList = []
  }

  addDeveloper(dev) {
    this.devsList.push(dev)
  }

  updateFilter(value) {
    this.filter = value
  }
}

decorate(Store, {
  devsList: observable,
  filter: observable,
  totalSum: computed,
  topPerformer: computed,
  filteredDev: computed,
  clearList: action,
  addDeveloper: action,
  updateFilter: action,
})

const appStore = new Store()

const Row = ({ name, sp }) =>
  <tr>
    <td>{name}</td>
    <td>{sp}</td>
  </tr>

Row.propTypes = {
  name: PropTypes.string,
  sp: PropTypes.number,
}


@observer class Table extends Component {
  render() {
    const { store } = this.props

    return (
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>SP:</td>
          </tr>
        </thead>
        <tbody>
          {
            store.filteredDev.map((dev) => <Row key={dev.id} {...dev}/>)
          }
        </tbody>
        <tfoot>
          <tr>
            <td>Team SP:</td>
            <td>{store.totalSum}</td>
          </tr>
          <tr>
            <td>Top Performer:</td>
            <td>{store.topPerformer || '' }</td>
          </tr>
        </tfoot>
      </table>
    )
  }
}

Table.propTypes = {
  store: PropTypes.shape({
    filteredDev: PropTypes.array,
    totalSum: PropTypes.number,
    topPerformer: PropTypes.string,
  })
}

@observer class Controls extends Component {
  static propTypes = {
    store: PropTypes.shape({
      addDeveloper: PropTypes.func,
      clearList: PropTypes.func,
      updateFilter: PropTypes.func,
      filter: PropTypes.string,
    })
  }

  addDeveloper = () => {
    const name = prompt('The Name:')
    const sp = parseInt(prompt('The story point:', 10))
    this.props.store.addDeveloper({ id: name, name, sp })
  }

  clearList = () => {
    this.props.store.clearList()
  }

  filterDev = ({ target: { value } }) => {
    this.props.store.updateFilter(value)
  }

  render() {
    const {
      filter,
    } = this.props.store

    return (
      <div className="controls">
        <button onClick={this.clearList} >Clear table</button>
        <button onClick={this.addDeveloper} >Add record</button>
        <input value={filter} onChange={this.filterDev} />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>Sprint Board:</h1>
        <Controls store={appStore} />
        <Table store={appStore} />
      </div>
    )
  }
}

ReactDOM.render(
  <App store={Store} />,
  document.getElementById('root')
)
