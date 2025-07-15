/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getTillProduct } from '../services/operations/tillApi';

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

export const addToCart = (addProduct) => {
	return async (dispatch, getStates) => {
		const activeOrderId = getStates().order.activeOrderId;
		const orders = getStates().order.orders || [];
		const activeOrder = orders?.find((order) => order.id === activeOrderId);
		if (!activeOrder) return;
		try {
			const completeProduct = await getTillProduct(addProduct.partNumber, '01');
			const product = completeProduct.data;
			const existingItem = activeOrder.items.find(
				(item) => item.product.partNumber === product.partNumber
			);
			let newItems;

			if (existingItem) {
				newItems = activeOrder.items.map((item) =>
					item.product.partNumber === product.partNumber
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				newItems = [...activeOrder.items, { product, quantity: 1 }];
			}
			dispatch(
				updateOrder(
					{ id: activeOrderId, updates: { items: newItems } } // Use object destructuring for clarity
				)
			);
		} catch (error) {
			console.log(error);
		}
	};
};

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
