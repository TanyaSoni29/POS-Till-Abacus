/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orders: [],
	activeOrderId: 0,
	nextOrderId: 1,
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
		updateOrder(state, action) {
			const { id, updates } = action.payload;
			const index = state.orders.findIndex((order) => order.id === id);
			if (index !== -1) {
				state.orders[index] = {
					...state.orders[index],
					...updates,
				};
			}
		},
		increaseOrderItemQuantity(state, action) {
			const { orderId, productId } = action.payload;
			const orderIndex = state.orders.findIndex(
				(order) => order.id === orderId
			);
			if (orderIndex !== -1) {
				const item = state.orders[orderIndex].items.find(
					(item) => item.product.partNumber === productId
				);
				if (item) {
					item.quantity++;
				}
			}
		},
		decreaseOrderItemQuantity(state, action) {
			const { orderId, productId } = action.payload;
			const orderIndex = state.orders.findIndex(
				(order) => order.id === orderId
			);
			if (orderIndex !== -1) {
				const item = state.orders[orderIndex].items.find(
					(item) => item.product.partNumber === productId
				);
				if (item) {
					item.quantity--;
					if (item.quantity <= 0) {
						// Remove item if quantity is 0 or less
						state.orders[orderIndex].items = state.orders[
							orderIndex
						].items.filter((i) => i.product.partNumber !== productId);
					}
				}
			}
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

export const {
	setOrders,
	setActiveOrderId,
	setNextOrderId,
	addOrder,
	updateOrder,
	increaseOrderItemQuantity,
	decreaseOrderItemQuantity,
} = orderSlice.actions;
export default orderSlice.reducer;
