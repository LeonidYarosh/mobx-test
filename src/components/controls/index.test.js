import React from 'react'
import { shallow } from 'enzyme'

import { Store } from '../../store/store'
import { Controls } from './index'

import { testValue } from '../../common/test/const'

describe('Controls', () => {
  let component
  let store

  beforeEach(() => {
    store = new Store()
    component = shallow(<Controls store={store} />)
  })

  it('should render', () => {
    expect(component.length).toBe(1)
  })

  it('should call clearList', () => {
    component.instance().clearList()
    expect(store.devsList.length).toBe(0)
  })

  it('should call clearList', () => {
    component.instance().clearList()
    expect(store.devsList.length).toBe(0)
  })

  it('should call filterDev', () => {
    component.instance().filterDev({ target: { value: testValue } })
    expect(store.filter).toBe(testValue)
  })

  it('should call addDeveloper and set name and sp', () => {
    component.instance().onChangeName({ target: { value: testValue } })
    component.instance().onChangeSP({ target: { value: 12 } })
    expect(component.instance().state).toEqual({
      name: testValue,
      sp: 12
    })

    component.instance().addDeveloper()
    expect(store.devsList[store.devsList.length - 1]).toEqual({
      id: testValue,
      name: testValue,
      sp: 12
    })
    expect(component.instance().state).toEqual({
      name: '',
      sp: ''
    })
  })

  it('should call addDeveloper with empty name and sp', () => {
    component.instance().addDeveloper()
    expect(store.error.addDev).toBeTruthy()
  })
})
