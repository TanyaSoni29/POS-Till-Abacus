/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getTillProductShortcuts } from '../services/operations/tillApi';

const initialState = {
	products: [],
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProducts(state, action) {
			state.products = action.payload;
		},
	},
});

export function refreshTillProductShortcuts(SetID = 'A') {
	return async (dispatch) => {
		try {
			const response = await getTillProductShortcuts(SetID);
			if (!response || response.status !== 'success') {
				throw new Error('Failed to fetch product shortcuts');
			}
			dispatch(setProducts(response.data));
		} catch (error) {
			console.error('Failed to fetch product shortcuts:', error);
		}
	};
}

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
