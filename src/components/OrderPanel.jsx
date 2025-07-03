/** @format */

import { useState } from 'react';
import {
	Plus,
	Minus,
	Trash2,
	CreditCard,
	Banknote,
	Smartphone,
	Pause,
	X,
	Loader,
} from 'lucide-react';
import CustomerSection from './OrderPanel/CustomerSection';
import { paymentMethods } from '../assets/data/paymentMethods';
import ThankYou from './OrderPanel/ThankYou';
import {
	decreaseOrderItemQuantity,
	increaseOrderItemQuantity,
} from '../slices/orderSlice';
import { useDispatch } from 'react-redux';

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
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isComplete, setIsComplete] = useState(false);

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);
	const taxRate = 0.085; // 8.5%
	const tax = subtotal * taxRate;
	const total = subtotal + tax;

	const handlePayment = async () => {
		if (!selectedPaymentMethod || cartItems.length === 0) return;

		setIsProcessing(true);

		// Simulate payment processing
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsProcessing(false);
		setIsComplete(true);

		// Auto close after success
		setTimeout(() => {
			onPaymentComplete();
			setIsComplete(false);
			setSelectedPaymentMethod(null);
		}, 2000);
	};

	const getPaymentIcon = (iconName) => {
		switch (iconName) {
			case 'credit-card':
				return <CreditCard size={20} />;
			case 'smartphone':
				return <Smartphone size={20} />;
			case 'banknote':
				return <Banknote size={20} />;
			case 'nfc':
				return <CreditCard size={20} />;
			default:
				return <CreditCard size={20} />;
		}
	};

	if (isComplete) {
		return <ThankYou />;
	}

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
								<div
									key={item.product.id}
									className='flex items-center justify-between'
								>
									<div className='flex-1'>
										<h4 className='font-medium text-gray-900'>
											{item.product.name}
										</h4>
										<p className='text-sm text-gray-600'>
											${item.product.price.toFixed(2)} each
										</p>
									</div>
									<div className='flex items-center gap-2'>
										<button
											onClick={() =>
												dispatch(
													decreaseOrderItemQuantity({
														orderId: activeOrder?.id,
														productId: item.product.id,
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
														productId: item.product.id,
													})
												)
											}
											className='w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center'
										>
											<Plus size={12} />
										</button>
										<span className='w-16 text-right font-medium'>
											${(item.product.price * item.quantity).toFixed(2)}
										</span>
										<button
											onClick={() => onRemoveItem(item.product.id)}
											className='w-6 h-6 rounded bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center'
										>
											<Trash2 size={12} />
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Totals */}
				{cartItems.length > 0 && (
					<div className='p-4 border-t border-gray-200 space-y-2'>
						<div className='flex justify-between text-sm'>
							<span>Subtotal:</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						<div className='flex justify-between text-sm'>
							<span>Tax (8.5%):</span>
							<span>${tax.toFixed(2)}</span>
						</div>
						<div className='flex justify-between font-bold text-lg border-t border-gray-200 pt-2'>
							<span>Total:</span>
							<span>${total.toFixed(2)}</span>
						</div>
					</div>
				)}
			</div>

			{/* Payment Methods */}
			{cartItems.length > 0 && (
				<div className='p-4 border-t border-gray-200'>
					<h3 className='text-sm font-semibold text-gray-700 mb-3'>
						Payment Method
					</h3>
					<div className='grid grid-cols-2 gap-2 mb-4'>
						{paymentMethods?.slice(0, 2).map((method) => (
							<button
								key={method.id}
								onClick={() => setSelectedPaymentMethod(method)}
								className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
									selectedPaymentMethod?.id === method.id
										? 'border-blue-500 bg-blue-50'
										: 'border-gray-200 hover:border-gray-300'
								}`}
							>
								<div
									className={`${
										selectedPaymentMethod?.id === method.id
											? 'text-blue-600'
											: 'text-gray-500'
									}`}
								>
									{getPaymentIcon(method.icon)}
								</div>
								<span
									className={`text-sm font-medium ${
										selectedPaymentMethod?.id === method.id
											? 'text-blue-900'
											: 'text-gray-700'
									}`}
								>
									{method.name}
								</span>
							</button>
						))}
					</div>

					{/* Action Buttons */}
					<div className='space-y-2'>
						<button
							onClick={handlePayment}
							disabled={
								!selectedPaymentMethod || isProcessing || cartItems.length === 0
							}
							className='w-full bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
						>
							{isProcessing ? (
								<>
									<Loader
										className='animate-spin'
										size={20}
									/>
									Processing Payment...
								</>
							) : (
								<>
									<CreditCard size={20} />
									Process Payment
								</>
							)}
						</button>

						<div className='grid grid-cols-2 gap-2'>
							<button className='py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2'>
								<Pause size={16} />
								Hold
							</button>
							<button
								onClick={onClearCart}
								className='py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2'
							>
								<X size={16} />
								Clear
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
