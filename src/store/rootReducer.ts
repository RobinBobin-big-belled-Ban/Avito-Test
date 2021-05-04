import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import appSliceReducer from './appSlice'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['appReducer']
}

const rootReducer = combineReducers({
    appReducer: appSliceReducer,
})

export default persistReducer(persistConfig, rootReducer)