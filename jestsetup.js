import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Остановка теста при ошибке

console.error = message => {
  throw new Error(message)
}

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[ key ] || null,
    setItem: (key, value) => store[ key ] = value.toString(),
    removeItem: () => store = {},
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})
