/** @format */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreditCard, Pause, X, TextQuote } from 'lucide-react';

import Checkout from './Checkout';
import { clearCart } from '../../slices/orderSlice';
import ThankYou from './ThankYou';

export default function PaymentMethod({
	selectedCustomer,
	cartItems,
	onPaymentComplete,
}) {
	const dispatch = useDispatch();
	const [isComplete, setIsComplete] = useState(false);
	const [isCheckout, setIsCheckout] = useState(false);

	if (isComplete) {
		return <ThankYou />;
	}

	const handleClose = () => {
		setIsCheckout(false);
	};

	return (
		<div className='p-4 border-t border-gray-200'>
			{/* Action Buttons */}
			<div className='space-y-2'>
				<button
					onClick={() => setIsCheckout((prev) => !prev)}
					disabled={cartItems.length === 0}
					className='w-full bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
				>
					<CreditCard size={20} />
					Process Payment
				</button>

				<div className='grid grid-cols-2 gap-2'>
					<button className='py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2'>
						<Pause size={16} />
						Hold
					</button>
					<button
						onClick={() => dispatch(clearCart())}
						className='py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2'
					>
						<TextQuote size={16} />
						Quote
					</button>
				</div>

				<button
					onClick={() => dispatch(clearCart())}
					className='w-full bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
				>
					<X size={20} />
					Clear
				</button>
			</div>

			{isCheckout && (
				<Checkout
					onclose={handleClose}
					selectedCustomer={selectedCustomer}
					onPaymentComplete={onPaymentComplete}
					setIsComplete={setIsComplete}
				/>
			)}
		</div>
	);
}
