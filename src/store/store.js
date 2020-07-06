import { observable, action, configure, computed, decorate } from 'mobx'
import axios from 'axios'

configure({ enforceActions: 'observed' })

const defaultList = [
  { id: '1', name: 'Jack', sp: 12 },
  { id: '2', name: 'Max', sp: 10 },
  { id: '3', name: 'Leonid', sp: 88 },
]

export class Store {
  devsList = []
  filter = ''
  error = {
    addDev: false,
  }

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

  setError({ name, flag }) {
    this.error[name] = flag
  }

  requestInitialList() {
    axios.post('/api/getBoard')
      .then(action((res) => {
        this.devsList = res?.data || defaultList
      }))
      .catch(action((err) => {
        console.error(err)
        this.devsList = defaultList
      }))
  }
}

decorate(Store, {
  devsList: observable,
  filter: observable,
  error: observable,
  totalSum: computed,
  topPerformer: computed,
  filteredDev: computed,
  clearList: action,
  addDeveloper: action,
  updateFilter: action,
  setError: action,
  requestInitialList: action,
})

export const appStore = new Store()
