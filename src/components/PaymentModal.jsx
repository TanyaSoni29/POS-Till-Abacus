/** @format */

import React, { useState } from 'react';
import {
	X,
	CreditCard,
	Smartphone,
	Banknote,
	CheckCircle,
	Loader,
} from 'lucide-react';

export const PaymentModal = ({
	isOpen,
	onClose,
	cartItems,
	customer,
	paymentMethods,
	onPaymentComplete,
}) => {
	const [selectedPayment, setSelectedPayment] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isComplete, setIsComplete] = useState(false);

	const total = cartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);
	const tax = total * 0.1; // 10% tax
	const finalTotal = total + tax;

	const handlePayment = async () => {
		if (!selectedPayment) return;

		setIsProcessing(true);

		// Simulate payment processing
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsProcessing(false);
		setIsComplete(true);

		// Auto close after success
		setTimeout(() => {
			onPaymentComplete();
			onClose();
			setIsComplete(false);
			setSelectedPayment(null);
		}, 2000);
	};

	const getPaymentIcon = (iconName) => {
		switch (iconName) {
			case 'credit-card':
				return <CreditCard size={24} />;
			case 'smartphone':
				return <Smartphone size={24} />;
			case 'banknote':
				return <Banknote size={24} />;
			case 'nfc':
				return <CreditCard size={24} />;
			default:
				return <CreditCard size={24} />;
		}
	};

	if (!isOpen) return null;

	if (isComplete) {
		return (
			<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
				<div className='bg-white rounded-2xl p-8 max-w-md w-full text-center'>
					<CheckCircle
						className='mx-auto text-green-500 mb-4'
						size={64}
					/>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>
						Payment Successful!
					</h2>
					<p className='text-gray-600'>Thank you for your purchase</p>
				</div>
			</div>
		);
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<div className='bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
				<div className='p-6 border-b border-gray-200'>
					<div className='flex items-center justify-between'>
						<h2 className='text-2xl font-bold text-gray-900'>
							Payment Checkout
						</h2>
						<button
							onClick={onClose}
							className='p-2 hover:bg-gray-100 rounded-xl transition-colors'
						>
							<X size={24} />
						</button>
					</div>
				</div>

				<div className='p-6'>
					{/* Customer Info */}
					{customer && (
						<div className='bg-blue-50 rounded-xl p-4 mb-6'>
							<h3 className='font-semibold text-gray-900 mb-2'>Customer</h3>
							<p className='text-gray-800'>{customer.name}</p>
							{customer.email && (
								<p className='text-gray-600 text-sm'>{customer.email}</p>
							)}
							{customer.loyaltyPoints !== undefined && (
								<p className='text-blue-600 text-sm font-medium'>
									{customer.loyaltyPoints} loyalty points
								</p>
							)}
						</div>
					)}

					{/* Order Summary */}
					<div className='bg-gray-50 rounded-xl p-4 mb-6'>
						<h3 className='font-semibold text-gray-900 mb-3'>Order Summary</h3>
						<div className='space-y-2 mb-3'>
							{cartItems.map((item) => (
								<div
									key={item.product.id}
									className='flex justify-between text-sm'
								>
									<span>
										{item.product.name} x{item.quantity}
									</span>
									<span>
										${(item.product.price * item.quantity).toFixed(2)}
									</span>
								</div>
							))}
						</div>
						<div className='border-t border-gray-200 pt-3 space-y-1'>
							<div className='flex justify-between text-sm'>
								<span>Subtotal</span>
								<span>${total.toFixed(2)}</span>
							</div>
							<div className='flex justify-between text-sm'>
								<span>Tax (10%)</span>
								<span>${tax.toFixed(2)}</span>
							</div>
							<div className='flex justify-between font-bold text-lg border-t border-gray-300 pt-2'>
								<span>Total</span>
								<span>${finalTotal.toFixed(2)}</span>
							</div>
						</div>
					</div>

					{/* Payment Methods */}
					<div className='mb-6'>
						<h3 className='font-semibold text-gray-900 mb-3'>Payment Method</h3>
						<div className='grid grid-cols-2 gap-3'>
							{paymentMethods.map((method) => (
								<button
									key={method.id}
									onClick={() => setSelectedPayment(method)}
									className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
										selectedPayment?.id === method.id
											? 'border-blue-500 bg-blue-50'
											: 'border-gray-200 hover:border-gray-300'
									}`}
								>
									<div
										className={`${
											selectedPayment?.id === method.id
												? 'text-blue-600'
												: 'text-gray-500'
										}`}
									>
										{getPaymentIcon(method.icon)}
									</div>
									<span
										className={`font-medium ${
											selectedPayment?.id === method.id
												? 'text-blue-900'
												: 'text-gray-700'
										}`}
									>
										{method.name}
									</span>
								</button>
							))}
						</div>
					</div>

					{/* Payment Button */}
					<button
						onClick={handlePayment}
						disabled={!selectedPayment || isProcessing}
						className='w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
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
							`Pay $${finalTotal.toFixed(2)}`
						)}
					</button>
				</div>
			</div>
		</div>
	);
};
