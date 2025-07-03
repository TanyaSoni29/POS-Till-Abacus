/** @format */

import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import {
	decreaseOrderItemQuantity,
	increaseOrderItemQuantity,
} from '../slices/orderSlice';

export const ProductCard = ({
	product,
	activeOrder,
	onAddToCart,
	cartQuantity,
}) => {
	const dispatch = useDispatch();
	const handleIncrement = () => {
		dispatch(
			increaseOrderItemQuantity({
				orderId: activeOrder?.id,
				productId: product.id,
			})
		);
	};

	const handleDecrement = () => {
		if (cartQuantity > 0) {
			dispatch(
				decreaseOrderItemQuantity({
					orderId: activeOrder?.id,
					productId: product.id,
				})
			);
		}
	};

	const getCategoryColor = (category) => {
		const colors = {
			Coffee: 'bg-amber-500',
			Pastries: 'bg-pink-500',
			Salads: 'bg-green-500',
			Mains: 'bg-blue-500',
			Beverages: 'bg-cyan-500',
		};
		return colors[category] || 'bg-gray-500';
	};

	return (
		<div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105'>
			<div className='relative'>
				<img
					src={product.image}
					alt={product.name}
					className='w-full h-32 object-cover'
				/>
				<div
					className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(
						product.category
					)}`}
				>
					{product.category}
				</div>
				{!product.available && (
					<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
						<span className='text-white font-semibold'>Out of Stock</span>
					</div>
				)}
			</div>

			<div className='p-4'>
				<h3 className='font-semibold text-gray-900 mb-1'>{product.name}</h3>
				<p className='text-2xl font-bold text-gray-900 mb-3'>
					${product.price.toFixed(2)}
				</p>

				{cartQuantity > 0 ? (
					<div className='flex items-center justify-between bg-gray-50 rounded-xl p-1'>
						<button
							onClick={handleDecrement}
							className='w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors'
						>
							<Minus size={16} />
						</button>
						<span className='font-semibold text-gray-900 min-w-[2rem] text-center'>
							{cartQuantity}
						</span>
						<button
							onClick={handleIncrement}
							className='w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors'
						>
							<Plus size={16} />
						</button>
					</div>
				) : (
					<button
						onClick={() => onAddToCart(product)}
						disabled={!product.available}
						className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
					>
						<Plus size={16} />
						Add to Cart
					</button>
				)}
			</div>
		</div>
	);
};
