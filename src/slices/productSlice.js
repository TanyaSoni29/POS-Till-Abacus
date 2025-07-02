/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [
		{
			id: '1',
			name: 'Espresso',
			price: 3.5,
			category: 'Coffee',
			image:
				'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
		{
			id: '2',
			name: 'Cappuccino',
			price: 4.25,
			category: 'Coffee',
			image:
				'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
		{
			id: '3',
			name: 'Latte',
			price: 4.75,
			category: 'Coffee',
			image:
				'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
		{
			id: '4',
			name: 'Americano',
			price: 3.25,
			category: 'Coffee',
			image:
				'https://images.pexels.com/photos/1776656/pexels-photo-1776656.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},

		{
			id: '5',
			name: 'Croissant',
			price: 3.95,
			category: 'Pastries',
			image:
				'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
		{
			id: '6',
			name: 'Blueberry Muffin',
			price: 3.25,
			category: 'Pastries',
			image:
				'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
		{
			id: '7',
			name: 'Danish Pastry',
			price: 4.5,
			category: 'Pastries',
			image:
				'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},

		{
			id: '8',
			name: 'Caesar Salad',
			price: 12.95,
			category: 'Salads',
			image:
				'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
		{
			id: '9',
			name: 'Greek Salad',
			price: 11.5,
			category: 'Salads',
			image:
				'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},

		{
			id: '10',
			name: 'Margherita Pizza',
			price: 16.95,
			category: 'Mains',
			image:
				'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
		{
			id: '11',
			name: 'Grilled Chicken',
			price: 18.95,
			category: 'Mains',
			image:
				'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
		{
			id: '12',
			name: 'Fish & Chips',
			price: 15.95,
			category: 'Mains',
			image:
				'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},

		{
			id: '13',
			name: 'Fresh Orange Juice',
			price: 4.95,
			category: 'Beverages',
			image:
				'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
		{
			id: '14',
			name: 'Sparkling Water',
			price: 2.95,
			category: 'Beverages',
			image:
				'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
		{
			id: '15',
			name: 'Green Tea',
			price: 3.25,
			category: 'Beverages',
			image:
				'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
			available: true,
		},
	],
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

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
