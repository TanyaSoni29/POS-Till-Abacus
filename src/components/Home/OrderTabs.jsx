/** @format */

import { Plus, X, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addOrder,
	setActiveOrderId,
	setNextOrderId,
	setOrders,
} from '../../slices/orderSlice';

export const OrderTabs = () => {
	const dispatch = useDispatch();
	const customers = useSelector((state) => state.customer.customers);
	const { activeOrderId, orders, nextOrderId } = useSelector(
		(state) => state.order
	);
	const getOrderTotal = (order) => {
		return order.items?.reduce(
			(sum, item) => sum + item.product.price * item.quantity,
			0
		);
	};

	const getItemCount = (order) => {
		return order.items?.reduce((sum, item) => sum + item.quantity, 0);
	};

	const createNewOrder = () => {
		const newOrder = {
			id: nextOrderId,
			customer: customers[0], // Default to walk-in customer
			items: [],
			createdAt: new Date().toISOString(),
		};
		dispatch(addOrder(newOrder));
		dispatch(setActiveOrderId(nextOrderId));
		dispatch(setNextOrderId((prev) => prev + 1));
	};

	const closeOrder = (orderId) => {
		if (orders.length === 1) {
			// If it's the last order, create a new empty one
			const newOrder = {
				id: nextOrderId,
				customer: customers[0],
				items: [],
				createdAt: new Date().toISOString(),
			};
			dispatch(addOrder(newOrder));
			dispatch(setActiveOrderId(nextOrderId));
			dispatch(setNextOrderId((prev) => prev + 1));
		} else {
			const updatedOrders = orders.filter((order) => order.id !== orderId);
			dispatch(setOrders(updatedOrders));

			// Fix: Use updatedOrders instead of filtering again
			if (activeOrderId === orderId && updatedOrders.length > 0) {
				dispatch(setActiveOrderId(updatedOrders[0].id));
			}
		}
	};

	return (
		<div className='bg-white border-b border-gray-200 px-6 py-2'>
			<div className='flex items-center gap-2 overflow-x-auto'>
				{orders.map((order) => {
					const isActive = order.id === activeOrderId;
					const total = getOrderTotal(order);
					const itemCount = getItemCount(order);

					return (
						<div
							key={order.id}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 min-w-0 ${
								isActive
									? 'border-blue-500 bg-blue-50'
									: 'border-gray-200 hover:border-gray-300 bg-white'
							}`}
						>
							<button
								onClick={() => dispatch(setActiveOrderId(order.id))}
								className='flex items-center gap-2 min-w-0 flex-1'
							>
								<User
									size={16}
									className={isActive ? 'text-blue-600' : 'text-gray-500'}
								/>
								<div className='min-w-0 flex-1'>
									<p
										className={`font-medium truncate ${
											isActive ? 'text-blue-900' : 'text-gray-700'
										}`}
									>
										{order.customer?.accNo === '00000'
											? 'Walk In Customer'
											: order?.customer?.firstname}
									</p>
									<div className='flex items-center gap-2 text-xs'>
										<span
											className={isActive ? 'text-blue-600' : 'text-gray-500'}
										>
											{itemCount} items
										</span>
										{total > 0 && (
											<>
												<span
													className={
														isActive ? 'text-blue-400' : 'text-gray-400'
													}
												>
													•
												</span>
												<span
													className={
														isActive ? 'text-blue-600' : 'text-gray-500'
													}
												>
													${total.toFixed(2)}
												</span>
											</>
										)}
									</div>
								</div>
							</button>

							{orders.length > 1 && (
								<button
									onClick={(e) => {
										e.stopPropagation();
										closeOrder(order.id);
									}}
									className={`p-1 rounded hover:bg-gray-200 transition-colors ${
										isActive
											? 'text-blue-600 hover:bg-blue-100'
											: 'text-gray-400'
									}`}
								>
									<X size={14} />
								</button>
							)}
						</div>
					);
				})}

				<button
					onClick={() => createNewOrder()}
					className='flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 whitespace-nowrap'
				>
					<Plus size={16} />
					New Order
				</button>
			</div>
		</div>
	);
};
