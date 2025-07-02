/** @format */

import React from 'react';
import { ShoppingCart as CartIcon, Trash2, Plus, Minus } from 'lucide-react';

export const ShoppingCart = ({
	cartItems,
	onUpdateQuantity,
	onRemoveItem,
	onCheckout,
}) => {
	const total = cartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);
	const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	if (cartItems.length === 0) {
		return (
			<div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
				<div className='flex items-center gap-3 mb-6'>
					<CartIcon
						className='text-gray-400'
						size={24}
					/>
					<h2 className='text-xl font-bold text-gray-900'>Cart</h2>
				</div>
				<div className='text-center py-8'>
					<CartIcon
						className='mx-auto text-gray-300 mb-4'
						size={48}
					/>
					<p className='text-gray-500'>Your cart is empty</p>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
			<div className='flex items-center gap-3 mb-6'>
				<div className='relative'>
					<CartIcon
						className='text-blue-600'
						size={24}
					/>
					<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
						{itemCount}
					</span>
				</div>
				<h2 className='text-xl font-bold text-gray-900'>Cart</h2>
			</div>

			<div className='space-y-3 mb-6 max-h-64 overflow-y-auto'>
				{cartItems.map((item) => (
					<div
						key={item.product.id}
						className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'
					>
						<img
							src={item.product.image}
							alt={item.product.name}
							className='w-12 h-12 object-cover rounded-lg'
						/>
						<div className='flex-1 min-w-0'>
							<h4 className='font-medium text-gray-900 truncate'>
								{item.product.name}
							</h4>
							<p className='text-sm text-gray-600'>
								${item.product.price.toFixed(2)} each
							</p>
						</div>
						<div className='flex items-center gap-2'>
							<button
								onClick={() =>
									onUpdateQuantity(item.product.id, item.quantity - 1)
								}
								className='w-6 h-6 rounded-md bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors'
							>
								<Minus size={12} />
							</button>
							<span className='font-semibold min-w-[1.5rem] text-center'>
								{item.quantity}
							</span>
							<button
								onClick={() =>
									onUpdateQuantity(item.product.id, item.quantity + 1)
								}
								className='w-6 h-6 rounded-md bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors'
							>
								<Plus size={12} />
							</button>
							<button
								onClick={() => onRemoveItem(item.product.id)}
								className='w-6 h-6 rounded-md bg-gray-500 text-white flex items-center justify-center hover:bg-gray-600 transition-colors ml-2'
							>
								<Trash2 size={12} />
							</button>
						</div>
					</div>
				))}
			</div>

			<div className='border-t border-gray-200 pt-4'>
				<div className='flex justify-between items-center mb-4'>
					<span className='text-lg font-semibold text-gray-900'>Total:</span>
					<span className='text-2xl font-bold text-gray-900'>
						${total.toFixed(2)}
					</span>
				</div>
				<button
					onClick={onCheckout}
					className='w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200'
				>
					Proceed to Payment
				</button>
			</div>
		</div>
	);
};
