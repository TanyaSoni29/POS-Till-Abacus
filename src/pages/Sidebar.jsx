/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshCustomers } from '../slices/customerSlice';
import { OrderPanel } from '../components/OrderPanel';
import { setOrders, updateOrder } from '../slices/orderSlice';

export default function Sidebar() {
	const dispatch = useDispatch();
	const customers = useSelector((state) => state.customer.customers);
	const { activeOrderId, orders } = useSelector((state) => state.order);
	const activeOrder = orders.find((order) => order.id === activeOrderId);

	const updateOrderInStore = (orderId, updates) => {
		dispatch(updateOrder({ id: orderId, updates }));
	};

	const updateCartQuantityById = (productId, quantity) => {
		if (!activeOrder) return;

		let newItems;
		if (quantity <= 0) {
			newItems = activeOrder.items.filter(
				(item) => item.product.id !== productId
			);
		} else {
			newItems = activeOrder.items.map((item) =>
				item.product.id === productId ? { ...item, quantity } : item
			);
		}

		updateOrder(activeOrderId, { items: newItems });
	};

	const removeFromCart = (productId) => {
		if (!activeOrder) return;

		const newItems = activeOrder.items.filter(
			(item) => item.product.id !== productId
		);
		updateOrderInStore(activeOrderId, { items: newItems });
	};

	const handlePaymentComplete = () => {
		// Clear the current order after payment
		updateOrderInStore(activeOrderId, { items: [] });
	};

	const clearCart = () => {
		if (!activeOrder) return;
		updateOrderInStore(activeOrderId, { items: [] });
	};

	const selectCustomer = (customer) => {
		if (!activeOrder) return;
		updateOrderInStore(activeOrderId, { customer });
	};

	useEffect(() => {
		dispatch(refreshCustomers());
	}, [dispatch]);

	useEffect(() => {
		dispatch(
			setOrders([
				{
					id: 0,
					customer: customers[0],
					items: [],
					createdAt: new Date().toISOString(),
				},
			])
		);
	}, [customers, dispatch]);

	return (
		<div className='w-96 bg-white border-l border-gray-200'>
			{activeOrder && (
				<OrderPanel
					cartItems={activeOrder.items}
					customers={customers}
					selectedCustomer={activeOrder.customer}
					onSelectCustomer={selectCustomer}
					onUpdateQuantity={updateCartQuantityById}
					onRemoveItem={removeFromCart}
					onPaymentComplete={handlePaymentComplete}
					onClearCart={clearCart}
				/>
			)}
		</div>
	);
}
