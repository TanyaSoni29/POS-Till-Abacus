/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: [],
};

const productCartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action) {
			state.cart.push(action.payload);
		},
		deleteFromCart(state, action) {
			state.cart.filter((item) => item.id !== action.payload);
		},
		increaseItemQuantity(state, action) {
			const item = state.cart.find((item) => item.id === action.payload);

			item.quantity++;
			item.totalPrice = item.quantity * item.unitPrice;
		},
		decreaseItemQuantity(state, action) {
			const item = state.cart.find((item) => item.id === action.payload);

			item.quantity--;
			item.totalPrice = item.quantity * item.unitPrice;

			if (item.quantity === 0)
				productCartSlice.caseReducers.deleteFromCart(state, action);
		},
		clearCart(state) {
			state.cart = [];
		},
	},
});

export const {
	addToCart,
	deleteFromCart,
	increaseItemQuantity,
	decreaseItemQuantity,
	clearCart,
} = productCartSlice.actions;
export default productCartSlice.reducer;
