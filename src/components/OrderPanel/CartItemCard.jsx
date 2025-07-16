/** @format */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, Minus, Trash2, ChevronDown } from 'lucide-react';

import {
	decreaseOrderItemQuantity,
	increaseOrderItemQuantity,
	removeFromCart,
	updateOrder,
} from '../../slices/orderSlice';

export default function CartItemCard({ item, activeOrder, cartItems }) {
	const dispatch = useDispatch();
	const [isDiscountOpen, setIsDiscountOpen] = useState({
		itemId: null,
		open: false,
	});
	const [changePrices, setChangePrices] = useState({});
	const [discounts, setDiscounts] = useState({});

	// Update Order when Prices change or discounts are applied
	const UpdateOrderPrices = (product) => {
		if (!activeOrder) return;

		const updatedItems = activeOrder.items.map((i) =>
			i.product.partNumber === product.partNumber
				? {
						...i,
						changedPrice:
							(changePrices[product.partNumber] || i.originalPrice) *
							(1 - (discounts[product.partNumber] || 0) / 100),
				  }
				: i
		);

		dispatch(
			updateOrder({ id: activeOrder.id, updates: { items: updatedItems } })
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
					[item.product.partNumber]: item.changedPrice ?? item.originalPrice,
				}));
				setDiscounts((prev) => ({
					...prev,
					[item.product.partNumber]: 0,
				}));
			}
		}
	}, [cartItems, isDiscountOpen]);

	const effectivePrice = item.changedPrice ?? item.originalPrice;

	return (
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
						${effectivePrice?.toFixed(2)} each
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
					<span className='w-8 text-center font-medium'>{item.quantity}</span>
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
						${(item.quantity * effectivePrice).toFixed(2)}
					</span>
					<span
						onClick={() =>
							setIsDiscountOpen({
								itemId: item.product.partNumber,
								open:
									isDiscountOpen.itemId !== item.product.partNumber ||
									!isDiscountOpen.open,
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
						onClick={() => dispatch(removeFromCart(item.product.partNumber))}
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
							<div className='w-full'>
								<h4 className='font-medium text-sm text-gray-900 mb-2'>
									Original Price
								</h4>
								<input
									type='number'
									value={item.originalPrice?.toFixed(2)}
									placeholder='Enter discount code'
									className='w-full px-3 py-1 border border-gray-300 rounded-lg mb-2 cursor-not-allowed'
									disabled
								/>
							</div>
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
											changePrices[item.product.partNumber] ?? item.changedPrice
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
										value={discounts[item.product.partNumber] ?? 0}
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
										setChangePrices((prev) => ({
											...prev,
											[item.product.partNumber]: item.originalPrice,
										}));
										dispatch(
											updateOrder({
												id: activeOrder.id,
												updates: {
													items: activeOrder.items.map((i) =>
														i.product.partNumber === item.product.partNumber
															? { ...i, changedPrice: i.originalPrice }
															: i
													),
												},
											})
										);
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
									Base: {item.quantity} X ${item.originalPrice?.toFixed(2)}
								</p>
								<p>${(item.quantity * item.originalPrice).toFixed(2)}</p>
							</div>
							<div className='flex justify-between items-center gap-2 font-medium text-gray-800'>
								<p>Item Total</p>
								<p>${(item.quantity * effectivePrice).toFixed(2)}</p>
							</div>
						</div>
					</div>
				)}
		</>
	);
}
