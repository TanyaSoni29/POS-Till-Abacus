/** @format */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, Minus, Trash2, ChevronDown } from 'lucide-react';

import {
	decreaseOrderItemQuantity,
	increaseOrderItemQuantity,
	updateOrder,
} from '../slices/orderSlice';
import CustomerSection from './OrderPanel/CustomerSection';
import PaymentMethod from './OrderPanel/PaymentMethod';

export const OrderPanel = ({
	activeOrder,
	cartItems,
	customers,
	selectedCustomer,
	onSelectCustomer,
	onRemoveItem,
	onPaymentComplete,
	onClearCart,
}) => {
	const dispatch = useDispatch();
	const [isDiscountOpen, setIsDiscountOpen] = useState({
		itemId: null,
		open: false,
	});
	const [changePrices, setChangePrices] = useState({});
	const [discounts, setDiscounts] = useState({});

	const subtotal = cartItems.reduce(
		(sum, item) =>
			sum +
			(item.product.price ? item.product.price : item.product.promoPrice) *
				item.quantity,
		0
	);
	const taxRate = 0.085; // 8.5%
	const tax = subtotal * taxRate;
	const total = subtotal + tax;

	// Update Order when Prices change or discounts are applied
	const UpdateOrderPrices = (product) => {
		if (!activeOrder) return;

		const existingItem = activeOrder.items.find(
			(item) => item.product.partNumber === product.partNumber
		);
		let newItems;
		const finalPrice =
			(changePrices[product.partNumber] ||
				product.price ||
				product.promoPrice ||
				0) *
			(1 - (discounts[product.partNumber] || 0) / 100);

		if (existingItem) {
			newItems = activeOrder.items.map((item) =>
				item.product.partNumber === product.partNumber
					? {
							...item,
							product: {
								...item.product,
								price: parseFloat(finalPrice?.toFixed(2)),
							},
					  }
					: item
			);
		} else {
			newItems = [
				...activeOrder.items,
				{
					product: {
						...product,
						price: finalPrice,
					},
					quantity: 1,
				},
			];
		}

		dispatch(
			updateOrder({
				id: activeOrder.id,
				updates: { items: newItems },
			})
		);
	};

	useEffect(() => {
		if (isDiscountOpen.open && isDiscountOpen.itemId) {
			const item = cartItems.find(
				(i) => i.product.partNumber === isDiscountOpen.itemId
			);
			if (item) {
				setChangePrices((prev) => ({
					...prev,
					[item.product.partNumber]: item.product.price
						? item.product.price
						: item.product.promoPrice,
				}));
				setDiscounts((prev) => ({
					...prev,
					[item.product.partNumber]: item.product.discount || 0,
				}));
			}
		}
	}, [cartItems, isDiscountOpen]);

	return (
		<div className='h-full flex flex-col'>
			{/* Customer Section */}
			<CustomerSection
				selectedCustomer={selectedCustomer}
				onSelectCustomer={onSelectCustomer}
				customers={customers}
			/>

			{/* Order Items */}
			<div className='flex-1 overflow-hidden flex flex-col'>
				<div className='p-4 border-b border-gray-200'>
					<h3 className='text-sm font-semibold text-gray-700'>Order Items</h3>
				</div>

				<div className='flex-1 overflow-y-auto p-4'>
					{cartItems.length === 0 ? (
						<div className='text-center py-8 text-gray-500'>
							<p>No items in order</p>
						</div>
					) : (
						<div className='space-y-3'>
							{cartItems.map((item) => (
								<>
									<div
										key={item.product.partNumber}
										className='flex items-center justify-between'
									>
										<div className='flex-1'>
											<h4 className='font-medium text-gray-900'>
												{item.product.partNumber}
											</h4>
											<p className='text-sm text-gray-600'>
												$
												{item?.product?.price
													? item?.product?.price?.toFixed(2)
													: item?.product?.promoPrice?.toFixed(2)}{' '}
												each
											</p>
										</div>
										<div className='flex items-center gap-2'>
											<button
												onClick={() =>
													dispatch(
														decreaseOrderItemQuantity({
															orderId: activeOrder?.id,
															productId: item.product.partNumber,
														})
													)
												}
												className='w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center'
											>
												<Minus size={12} />
											</button>
											<span className='w-8 text-center font-medium'>
												{item.quantity}
											</span>
											<button
												onClick={() =>
													dispatch(
														increaseOrderItemQuantity({
															orderId: activeOrder?.id,
															productId: item.product.partNumber,
														})
													)
												}
												className='w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center'
											>
												<Plus size={12} />
											</button>
											<span className='w-16 text-right font-medium'>
												$
												{(
													(item.product.price
														? item.product.price
														: item.product.promoPrice) * item.quantity
												).toFixed(2)}
											</span>
											<span
												onClick={() =>
													setIsDiscountOpen({
														itemId: item.product.partNumber,
														open: !(
															isDiscountOpen.open &&
															isDiscountOpen.itemId === item.product.partNumber
														),
													})
												}
												className='cursor-pointer'
											>
												<ChevronDown
													size={16}
													className={`text-gray-400 transition-transform ${
														isDiscountOpen.itemId === item.product.partNumber &&
														isDiscountOpen.open
															? 'rotate-180'
															: ''
													}`}
												/>
											</span>
											<button
												onClick={() => onRemoveItem(item.product.partNumber)}
												className='w-6 h-6 rounded bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center'
											>
												<Trash2 size={12} />
											</button>
										</div>
									</div>

									{isDiscountOpen.itemId === item.product.partNumber &&
										isDiscountOpen.open && (
											<div className='border border-gray-100 rounded-lg overflow-hidden'>
												<div className='flex flex-col items-center justify-between bg-gray-100 px-4 pt-4 pb-2'>
													<div className='grid grid-cols-2 gap-4'>
														<div>
															<h4 className='font-medium text-sm text-gray-900 mb-2'>
																Change Price
															</h4>
															<input
																type='number'
																min={0}
																placeholder='Enter discount code'
																className='w-full px-3 py-1 border border-gray-300 rounded-lg mb-2'
																value={
																	changePrices[item.product.partNumber] ??
																	(item.product.price
																		? item.product.price
																		: item.product.promoPrice)
																}
																onChange={(e) =>
																	setChangePrices((changePrices) => ({
																		...changePrices,
																		[item.product.partNumber]: Math.max(
																			0,
																			Number(e.target.value)
																		),
																	}))
																}
																onBlur={() => {
																	UpdateOrderPrices(item.product);
																}}
															/>
														</div>
														<div>
															<h4 className='font-medium text-sm text-gray-900 mb-2'>
																Discount %
															</h4>
															<input
																type='number'
																min={0}
																max={100}
																placeholder='Enter discount code'
																className='w-full px-3 py-1 border border-gray-300 rounded-lg mb-2'
																value={
																	discounts[item.product.partNumber] ??
																	item.product.discount
																}
																onChange={(e) =>
																	setDiscounts((discounts) => ({
																		...discounts,
																		[item.product.partNumber]: Math.min(
																			100,
																			Math.max(0, Number(e.target.value))
																		),
																	}))
																}
																onBlur={() => {
																	UpdateOrderPrices(item.product);
																}}
															/>
														</div>
													</div>
													<div className='w-full'>
														<h4 className='font-medium text-sm text-gray-900 mb-2'>
															Add Note
														</h4>
														<input
															type='text'
															placeholder='Special instructions...'
															className='w-full px-3 py-1 border border-gray-300 rounded-lg mb-2'
														/>
													</div>
													<div className='grid grid-cols-2 gap-4 w-full'>
														<button
															className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer'
															onClick={() => {
																setChangePrices((changePrices) => ({
																	...changePrices,
																	[item.product.partNumber]: item.product.price
																		? item.product.price
																		: item.product.promoPrice,
																}));
																UpdateOrderPrices(item.product);
															}}
														>
															{' '}
															Reset Price
														</button>
														<button
															className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer'
															onClick={() => {
																setDiscounts((prev) => ({
																	...prev,
																	[item.product.partNumber]: 0,
																}));
																UpdateOrderPrices(item.product);
															}}
														>
															Clear Discount
														</button>
													</div>
												</div>

												<div className='text-sm text-gray-600 bg-white p-4 divide-y divide-gray-200'>
													<div className='flex justify-between items-center gap-2'>
														<p>
															Base: {item.quantity} X{' '}
															{(item.product.price
																? item?.product?.price
																: item.product.promoPrice
															)?.toFixed(2)}
														</p>
														<p>
															$
															{(
																item.quantity *
																(item.product.price
																	? item.product.price
																	: item.product.promoPrice)
															)?.toFixed(2)}
														</p>
													</div>
													<div className='flex justify-between items-center gap-2 font-medium text-gray-800'>
														<p>Item Total</p>
														<p>
															$
															{(
																item.quantity *
																(item.product.price
																	? item.product.price
																	: item.product.promoPrice)
															)?.toFixed(2)}
														</p>
													</div>
												</div>
											</div>
										)}
								</>
							))}
						</div>
					)}
				</div>

				{/* Totals */}
				{cartItems.length > 0 && (
					<div className='p-4 border-t border-gray-200 space-y-2'>
						<div className='flex justify-between text-sm'>
							<span>Subtotal:</span>
							<span>${subtotal?.toFixed(2)}</span>
						</div>
						<div className='flex justify-between text-sm'>
							<span>Tax (8.5%):</span>
							<span>${tax?.toFixed(2)}</span>
						</div>
						<div className='flex justify-between font-bold text-lg border-t border-gray-200 pt-2'>
							<span>Total:</span>
							<span>${total?.toFixed(2)}</span>
						</div>
					</div>
				)}
			</div>

			{/* Payment Methods */}
			{cartItems.length > 0 && (
				<PaymentMethod
					selectedCustomer={selectedCustomer}
					cartItems={cartItems}
					onPaymentComplete={onPaymentComplete}
					onClearCart={onClearCart}
				/>
			)}
		</div>
	);
};
