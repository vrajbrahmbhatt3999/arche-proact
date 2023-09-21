import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

import rootReducer from '../root-reducer/rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  enhancers: [],
})
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

// export default store
