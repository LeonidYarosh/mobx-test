import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

@observer class Controls extends Component {
  static propTypes = {
    store: PropTypes.shape({
      addDeveloper: PropTypes.func,
      clearList: PropTypes.func,
      updateFilter: PropTypes.func,
      filter: PropTypes.string,
      setError: PropTypes.func,
      requestInitialList: PropTypes.func,
    })
  }

  state = {
    name: '',
    sp: ''
  }

  componentDidMount() {
    this.props.store.requestInitialList()
  }

  addDeveloper = () => {
    const { name, sp } = this.state
    const { store } = this.props

    if (name && sp) {
      store.addDeveloper({ id: name, name, sp: parseInt(sp) })
      this.setState({
        name: '',
        sp: ''
      })
    }
    else {
      store.setError({ name: 'addDev', flag: true })
    }
  }

  clearList = () => {
    this.props.store.clearList()
  }

  filterDev = ({ target: { value } }) => {
    this.props.store.updateFilter(value)
  }

  onChangeName = ({ target: { value } }) => {
    this.setState({ name: value })
  }

  onChangeSP = ({ target: { value } }) => {
    this.setState({ sp: value })
  }

  render() {
    const {
      filter,
    } = this.props.store
    const {
      name,
      sp
    } = this.state

    return (
      <React.Fragment>
        <div className="controls">
          <button onClick={this.clearList} >Clear table</button>
          <input value={filter} onChange={this.filterDev} />
        </div>
        <div className="add-dev">
          <input
            type="text"
            className="add-dev_name"
            value={name}
            onChange={this.onChangeName}
          />
          <input
            type="text"
            className="add-dev_sp"
            value={sp}
            onChange={this.onChangeSP}
          />
          <button onClick={this.addDeveloper} >Add record</button>
        </div>
      </React.Fragment>
    )
  }
}

export {
  Controls
}
