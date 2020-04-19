import { Store } from './store'
import { testValue } from '../common/test/const'

describe('Store', () => {
  let store

  beforeEach(() => {
    store = new Store()
  })

  it('should initial', () => {
    expect(store.devsList.length).toBe(3)
    expect(store.filter).toBe('')
    expect(store.error.addDev).toBeFalsy()
  })

  it('should call totalSum', () => {
    expect(store.totalSum).toBe(30)
  })

  it('should call topPerformer', () => {
    expect(store.topPerformer).toBe('Jack')
  })

  it('should call filteredDev', () => {
    expect(store.filteredDev.length).toBe(3)
  })

  it('should call clearList', () => {
    store.clearList()
    expect(store.devsList.length).toBe(0)
  })

  it('should call addDeveloper', () => {
    store.addDeveloper({ id: testValue, name: testValue, sp: 1 })
    expect(store.devsList.length).toBe(4)
  })

  it('should call updateFilter', () => {
    store.updateFilter(testValue)
    expect(store.filter).toBe(testValue)
  })

  it('should call setError', () => {
    store.setError({ name: testValue, flag: true })
    expect(store.error[testValue]).toBeTruthy()
  })
})
