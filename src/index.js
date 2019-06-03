import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import applyAxiosMiddlewares from './utils/applyAxiosMiddlewares'
import applyDbConfig from './fb_config'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import store from './state/store'

applyDbConfig().then(() => {
  applyAxiosMiddlewares()
})

const RootHTML = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
)

ReactDOM.render(<RootHTML />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
