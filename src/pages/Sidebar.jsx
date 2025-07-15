/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshCustomers } from '../slices/customerSlice';
import { OrderPanel } from '../components/OrderPanel';
import {
	clearCart,
	removeFromCart,
	setOrders,
	updateOrder,
} from '../slices/orderSlice';

export default function Sidebar() {
	const dispatch = useDispatch();
	const customers = useSelector((state) => state.customer.customers);
	const { activeOrderId, orders } = useSelector((state) => state.order);
	const activeOrder = orders.find((order) => order.id === activeOrderId);

	const removeFromCartHandler = (productId) => {
		dispatch(removeFromCart(productId));
	};

	const handlePaymentComplete = () => {
		// Clear the current order after payment
		dispatch(
			updateOrder(
				{ id: activeOrderId, updates: { items: [] } } // Use object destructuring for clarity
			)
		);
	};

	const clearCartHandler = () => {
		if (!activeOrder) return;
		dispatch(clearCart());
	};

	const selectCustomer = (customer) => {
		if (!activeOrder) return;
		dispatch(updateOrder({ id: activeOrderId, updates: { customer } }));
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
					activeOrder={activeOrder}
					cartItems={activeOrder.items}
					selectedCustomer={activeOrder.customer}
					onSelectCustomer={selectCustomer}
					onRemoveItem={removeFromCartHandler}
					onPaymentComplete={handlePaymentComplete}
					onClearCart={clearCartHandler}
				/>
			)}
		</div>
	);
}
