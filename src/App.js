import React from 'react'
import { Provider } from 'react-redux'

import store from './store'

import Game from './components/Game'

export default function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  )
}
