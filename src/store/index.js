import { configureStore } from '@reduxjs/toolkit'
import { UserReducer } from './reducers/UserLoginReducer';
import { ProductReducer } from './reducers/ProductReducer';
import { CartReducer } from './reducers/CartReducer';
import { CategoryReducer } from './reducers/CategoryReducer';
import { SizeReducer } from './reducers/SizeReducer';
const store = configureStore({
    reducer: {
        UserReducer,
        ProductReducer,
        CartReducer,
        CategoryReducer,
        SizeReducer
    }
})
export default store;