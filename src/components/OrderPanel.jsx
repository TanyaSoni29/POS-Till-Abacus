/** @format */

import CustomerSection from './OrderPanel/CustomerSection';
import PaymentMethod from './OrderPanel/PaymentMethod';
import CartItemCard from './OrderPanel/CartItemCard';

export const OrderPanel = ({
	activeOrder,
	cartItems,
	selectedCustomer,
	onSelectCustomer,
	onPaymentComplete,
}) => {
	const subtotal = cartItems.reduce((sum, item) => {
		const price =
			item.changedPrice ?? item.originalPrice ?? item.product.price ?? 0;

		return sum + price * item.quantity;
	}, 0);
	const taxRate = 0.2; // 20%
	const tax = subtotal * taxRate;
	const total = subtotal + tax;

	return (
		<div className='h-full flex flex-col'>
			{/* Customer Section */}
			<CustomerSection
				selectedCustomer={selectedCustomer}
				onSelectCustomer={onSelectCustomer}
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
								<CartItemCard
									key={item.product.partNumber}
									item={item}
									activeOrder={activeOrder}
									cartItems={cartItems}
								/>
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
							<span>VAT (20%):</span>
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
				/>
			)}
		</div>
	);
};
