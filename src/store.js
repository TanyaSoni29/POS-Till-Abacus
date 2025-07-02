/** @format */

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/productCartSlice';
import productReducer from './slices/productSlice';
import customerReducer from './slices/customerSlice';
import orderReducer from './slices/orderSlice';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
	reducer: {
		cart: cartReducer,
		product: productReducer,
		customer: customerReducer,
		order: orderReducer,
		category: categoryReducer,
	},
});

export default store;
