import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n/i18Config'
import './index.css'
import './styles/theme.css'
import './styles/reset-css.css'
import './styles/global-theme-css.css'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store/store'
import { BrowserRouter } from 'react-router-dom'
import './axios'
import { PersistGate } from 'redux-persist/integration/react'
import App from './components/app/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        {/* <ErrorBoundary fallback={<p>Something Went Wrong</p>}> */}
        <App />
        {/* </ErrorBoundary> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
