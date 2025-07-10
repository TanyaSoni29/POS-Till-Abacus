/** @format */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	CreditCard,
	Banknote,
	Smartphone,
	Pause,
	X,
	Loader,
} from 'lucide-react';

import { paymentMethods } from '../../assets/data/paymentMethods';
import { createSale } from '../../services/operations/salesApi';
import { refreshTillProductShortcuts } from '../../slices/productSlice';
import ThankYou from './ThankYou';

export default function PaymentMethod({
	selectedCustomer,
	cartItems,
	onPaymentComplete,
	onClearCart,
}) {
	const dispatch = useDispatch();
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	// Get Icon based on Payment method
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

	// Payment Button Handler
	const handlePayment = async () => {
		if (!selectedPaymentMethod || cartItems.length === 0) return;

		setIsProcessing(true);
		console.log(selectedCustomer, cartItems);

		try {
			const payload = {
				customerAccount:
					selectedCustomer.id === '0' ? '00000' : selectedCustomer.accNo,
				items: cartItems.map((item) => {
					return {
						partNumber: item.product.partNumber,
						quantity: item.quantity,
						unitPrice: item.product.price || item.product.promoPrice || 0,
						discount: item.product.discount || 0,
						vat: item?.product.vat || 0,
						costPrice: 0,
						isPromo: item.product.isPromo || false,
						stockNumber: item.product.stockNumber || '00',
					};
				}),
				paymentType: selectedPaymentMethod.id,
				paymentDueDate: new Date().toISOString(),
				tillId: 'A',
				location: '01',
				salesCode: '001',
				discountCode: '',
				notes: '',
				invoiceNumber: '',
				orderNo: '',
			};
			const response = await createSale(payload);
			if (response.status === 'success') {
				setIsProcessing(false);
				setIsComplete(true);
				dispatch(refreshTillProductShortcuts('00'));

				// Auto close after success
				setTimeout(() => {
					onPaymentComplete();
					setIsComplete(false);
					setSelectedPaymentMethod(null);
				}, 2000);
			} else {
				console.log(response?.error?.message);
				setIsProcessing(false);
			}
		} catch (error) {
			console.lo(error);
		}
	};

	if (isComplete) {
		return <ThankYou />;
	}

	return (
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
	);
}
