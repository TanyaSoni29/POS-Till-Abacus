/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshCustomers } from '../slices/customerSlice';
import { OrderPanel } from '../components/OrderPanel';
import { setOrders } from '../slices/orderSlice';

export default function Sidebar() {
	const dispatch = useDispatch();
	const customers = useSelector((state) => state.customer.customers);
	const { activeOrderId, orders } = useSelector((state) => state.order);
	const activeOrder = orders.find((order) => order.id === activeOrderId);

	const updateOrder = (orderId, updates) => {
		dispatch(
			setOrders((prev) =>
				prev.map((order) =>
					order.id === orderId ? { ...order, ...updates } : order
				)
			)
		);
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
		updateOrder(activeOrderId, { items: newItems });
	};

	

	const handlePaymentComplete = () => {
		// Clear the current order after payment
		updateOrder(activeOrderId, { items: [] });
	};

	const clearCart = () => {
		if (!activeOrder) return;
		updateOrder(activeOrderId, { items: [] });
	};

	const selectCustomer = (customer) => {
		if (!activeOrder) return;
		updateOrder(activeOrderId, { customer });
	};

	useEffect(() => {
		dispatch(refreshCustomers());
	}, [dispatch]);

	

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
					// paymentMethods={paymentMethods}
					onPaymentComplete={handlePaymentComplete}
					onClearCart={clearCart}
				/>
			)}
		</div>
	);
}
