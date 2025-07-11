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
	Bike,
	Accessibility,
	Users,
	Shirt,
	Cable,
	LifeBuoy,
	Link,
	ShipWheel,
	Cog,
	Package,
	Settings,
	Panda,
} from 'lucide-react';
// import { useDispatch } from 'react-redux';
import // decreaseOrderItemQuantity,
// increaseOrderItemQuantity,
'../../slices/orderSlice';

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
			BIKES: 'bg-amber-500',
			LOYALTY: 'bg-purple-500',
			LABOUR: 'bg-red-500',
			CLOTHING: 'bg-blue-500',
			TRANSMISSION: 'bg-purple-500',
			TYRES: 'bg-red-500',
			ACCESSORIES: 'bg-green-500',
			WHEELS: 'bg-orange-500',
			CONTROLS: 'bg-amber-500',
			SEATING: 'bg-purple-500',
		};
		return colors[category] || 'bg-gray-500';
	};

	const getCategoryIcon = (iconName) => {
		switch (iconName) {
			case 'BIKES':
				return (
					<Bike
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'LOYALTY':
				return (
					<Accessibility
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'LABOUR':
				return (
					<Users
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'CLOTHING':
				return (
					<Shirt
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'TRANSMISSION':
				return (
					<Cable
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'TYRES':
				return (
					<LifeBuoy
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'ACCESSORIES':
				return (
					<Link
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'WHEELS':
				return (
					<ShipWheel
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'CONTROLS':
				return (
					<Cog
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'SEATING':
				return (
					<Package
						size={24}
						className='text-white font-bold'
					/>
				);
			case 'OTHER':
				return (
					<Panda
						size={24}
						className='text-white font-bold'
					/>
				);
			default:
				return (
					<Settings
						size={24}
						className='text-white font-bold'
					/>
				);
		}
	};

	const getBgColor = (category) => {
		switch (category) {
			case 'BIKES':
				return 'bg-sky-400';
			case 'LOYALTY':
				return 'bg-pink-400';
			case 'LABOUR':
				return 'bg-green-400';
			case 'CLOTHING':
				return 'bg-purple-400';
			case 'TRANSMISSION':
				return 'bg-cyan-400';
			case 'TYRES':
				return 'bg-orange-400';
			case 'ACCESSORIES':
				return 'bg-blue-400';
			case 'WHEELS':
				return 'bg-red-400';
			case 'CONTROLS':
				return 'bg-green-400';
			case 'OTHER':
				return 'bg-purple-400';
			case 'SEATING':
				return 'bg-cyan-400';
			default:
				return 'bg-gray-400';
		}
	};

	return (
		<div
			className={` ${getBgColor(
				product.category ? product.category : 'OTHER'
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
					className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(
						product.category ? product.category : 'OTHER'
					)}`}
				>
					#{product.partNumber ? product.partNumber : 'OTHER'}
				</div>
				<div
					className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(
						product.category ? product.category : 'OTHER'
					)}`}
				>
					{product.category ? product.category : 'OTHER'}
				</div>
				{!product.isActive && (
					<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
						<span className='text-white font-semibold'>Out of Stock</span>
					</div>
				)}
			</div>

			<div className='p-4 flex flex-col item-center justify-between'>
				<div className='flex flex-col items-center justify-center mb-3 text-white'>
					<div className='p-2 rounded-full border border-gray-200'>
						{getCategoryIcon(product.category ? product.category : 'OTHER')}
					</div>
					<h3 className='text-lg font-semibold  mb-1'>{product.title}</h3>
					{/* <p className='text-md font-bold'>STOCK: {product.stock}</p> */}
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
