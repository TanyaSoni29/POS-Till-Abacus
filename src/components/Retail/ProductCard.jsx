/** @format */

import {
	// Plus,
	// Minus,
	CreditCard,
	// Smartphone,
	// Banknote,
	Coffee,
	Pizza,
	Carrot,
	Soup,
	Wine,
} from 'lucide-react';
// import { useDispatch } from 'react-redux';
import {
	// decreaseOrderItemQuantity,
	// increaseOrderItemQuantity,
} from '../../slices/orderSlice';

export const ProductCard = ({
	product,
	// activeOrder,
	onAddToCart,
	// cartQuantity,
}) => {
	// const dispatch = useDispatch();
	// const handleIncrement = () => {
	// 	dispatch(
	// 		increaseOrderItemQuantity({
	// 			orderId: activeOrder?.id,
	// 			productId: product.id,
	// 		})
	// 	);
	// };

	// const handleDecrement = () => {
	// 	if (cartQuantity > 0) {
	// 		dispatch(
	// 			decreaseOrderItemQuantity({
	// 				orderId: activeOrder?.id,
	// 				productId: product.id,
	// 			})
	// 		);
	// 	}
	// };

	const getCategoryColor = (category) => {
		const colors = {
			Coffee: 'bg-amber-500',
			Pastries: 'bg-purple-500',
			Salads: 'bg-red-500',
			Mains: 'bg-blue-500',
			Beverages: 'bg-purple-500',
		};
		return colors[category] || 'bg-gray-500';
	};

	const getCategoryIcon = (iconName) => {
		switch (iconName) {
			case 'Coffee':
				return (
					<Coffee
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'Pastries':
				return (
					<Pizza
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'Salads':
				return (
					<Carrot
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'Mains':
				return (
					<Soup
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'Beverages':
				return (
					<Wine
						size={24}
						className='text-white font-bold'
					/>
				);
			default:
				return (
					<CreditCard
						size={24}
						className='text-white font-bold'
					/>
				);
		}
	};

	const getBgColor = (category) => {
		switch (category) {
			case 'Coffee':
				return 'bg-sky-400';
			case 'Pastries':
				return 'bg-pink-400';
			case 'Salads':
				return 'bg-green-400';
			case 'Mains':
				return 'bg-purple-400';
			case 'Beverages':
				return 'bg-cyan-400';
			default:
				return 'bg-gray-400';
		}
	};

	return (
		<div
			className={` ${getBgColor(
				product.category
			)} rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer`}
			onClick={() => onAddToCart(product)}
		>
			<div className='relative'>
				{/* <img
					src={product.image}
					alt={product.name}
					className='w-full h-32 object-cover'
				/> */}
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

			<div className='p-4 flex flex-col item-center justify-between'>
				<div className='flex flex-col items-center justify-center mb-4 text-white'>
					<div className='p-2 rounded-full border border-gray-200'>
						{getCategoryIcon(product.category)}
					</div>
					<h3 className='font-semibold  mb-1'>{product.name}</h3>
					<p className='text-2xl font-bold  mb-3'>
						${product.price.toFixed(2)}
					</p>
				</div>

				{/* {cartQuantity > 0 ? (
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
					<>
						<button
							onClick={() => onAddToCart(product)}
							disabled={!product.available}
							className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
						>
							<Plus size={16} />
							Add to Cart
						</button>
					</>
				)} */}
			</div>
		</div>
	);
};
