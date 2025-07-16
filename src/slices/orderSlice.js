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
			const order = state.orders.find((order) => order.id === orderId);
			if (!order) return;

			const item = order.items.find(
				(item) => item.product.partNumber === productId
			);
			if (item) item.quantity++;
		},
		decreaseOrderItemQuantity(state, action) {
			const { orderId, productId } = action.payload;
			const order = state.orders.find((order) => order.id === orderId);
			if (!order) return;

			const itemIndex = order.items.findIndex(
				(item) => item.product.partNumber === productId
			);
			if (itemIndex !== -1) {
				const item = order.items[itemIndex];
				item.quantity--;
				if (item.quantity <= 0) {
					order.items.splice(itemIndex, 1);
				}
			}
		},
	},
});

export const addToCart = (addProduct) => {
	return async (dispatch, getState) => {
		const activeOrderId = getState().order.activeOrderId;
		const orders = getState().order.orders || [];
		const activeOrder = orders.find((order) => order.id === activeOrderId);
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
				newItems = [
					...activeOrder.items,
					{
						product,
						quantity: 1,
						originalPrice: product.storePrice || product.promoPrice,
						changedPrice: product.storePrice || product.promoPrice,
					},
				];
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

export const removeFromCart = (productId) => {
	return async (dispatch, getState) => {
		const { activeOrderId, orders } = getState().order;
		const activeOrder = orders?.find((order) => order.id === activeOrderId);

		if (!activeOrder) return;

		const newItems = activeOrder.items.filter(
			(item) => item.product.partNumber !== productId
		);

		dispatch(
			updateOrder(
				{ id: activeOrderId, updates: { items: newItems } } // Use object destructuring for clarity
			)
		);
	};
};

export const clearCart = () => {
	return async (dispatch, getStates) => {
		const activeOrderId = getStates().order.activeOrderId;
		dispatch(
			updateOrder(
				{ id: activeOrderId, updates: { items: [] } } // Use object destructuring for clarity
			)
		);
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
