/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orders: [
		{
			id: 1,
			// customer: customers[0],
			items: [],
			createdAt: new Date(),
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

export const { setOrders, setActiveOrderId, setNextOrderId } =
	orderSlice.actions;
export default orderSlice.reducer;
