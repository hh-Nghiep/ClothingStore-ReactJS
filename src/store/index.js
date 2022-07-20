import {configureStore} from '@reduxjs/toolkit'
import { UserReducer } from './reducers/UserLoginReducer';
import { PruductReducer } from './reducers/ProductReducer';
const store = configureStore({
    reducer: {
        UserReducer,
        PruductReducer
    }
})
export default store;