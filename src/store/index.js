import { configureStore } from '@reduxjs/toolkit'
import { UserReducer } from './reducers/UserLoginReducer';
import { ProductReducer } from './reducers/ProductReducer';
import { CartReducer } from './reducers/CartReducer';
import { CategoryReducer } from './reducers/CategoryReducer';
import { SizeReducer } from './reducers/SizeReducer';
import { SaleReducer } from './reducers/SaleReducer';

const store = configureStore({
    reducer: {
        user: UserReducer,
        product: ProductReducer,
        cart: CartReducer,
        category: CategoryReducer,
        size: SizeReducer,
        sale: SaleReducer
    }
})
export default store;