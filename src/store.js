import { observable, action, configure, computed, decorate } from 'mobx'

configure({ enforceActions: 'observed' })

export class Store {
  devsList = [
    { id: '1', name: 'Jack', sp: 12 },
    { id: '2', name: 'Max', sp: 10 },
    { id: '3', name: 'Leo', sp: 8 },
  ]
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
    debugger
    this.error[name] = flag
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
})

export const appStore = new Store()
