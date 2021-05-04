import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { persistStore } from 'redux-persist'
import rootReducer from './rootReducer'

// Удаляю проверку на сириализованные объекты (ошибка Редакс Персист)
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware,
  })

export const persistor = persistStore(store)

  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
