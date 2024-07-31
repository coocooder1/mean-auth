import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer  from '../redux/user/userSlice'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({user: userReducer});

const persistCongig = {
    key: 'root',
    vsersion: 1,
    storage,

}
const persistedReducer = persistReducer(persistCongig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export const persistor =  persistStore(store);