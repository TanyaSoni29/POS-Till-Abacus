/** @format */
/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categories: ['OTHER', 'Coffee', 'Pastries', 'Salads', 'Mains', 'Beverages'],
	selectedCategory: 'OTHER',
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategories(state, action) {
			state.categories = action.payload;
		},
		setSelectedCategory(state, action) {
			state.selectedCategory = action.payload;
		},
	},
});

export const { setCategories, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
