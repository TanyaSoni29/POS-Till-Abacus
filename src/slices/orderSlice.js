/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orders: [
		{
			id: 1,
			// customer: customers[0],
			items: [],
			createdAt: new Date().toISOString(),
		},
	],
	activeOrderId: 1,
	nextOrderId: 2,
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrders(state, action) {
			state.orders = action.payload;
		},
		addOrder(state, action) {
			state.orders.push(action.payload); // ✅ Adds one order
		},
		setActiveOrderId(state, action) {
			state.activeOrderId = action.payload;
		},
		setNextOrderId(state, action) {
			state.nextOrderId = action.payload;
		},
	},
});

// export function refreshOrders() {
// 	return async (dispatch) => {
// 		try {
// 			const response = await getCustomers();
// 			if (response.status === 'success') {
// 				dispatch(setCustomers(response.data));
// 			}
// 		} catch (err) {
// 			console.error('Error refreshing customers:', err);
// 		}
// 	};
// }

export const { setOrders, setActiveOrderId, setNextOrderId, addOrder } =
	orderSlice.actions;
export default orderSlice.reducer;
