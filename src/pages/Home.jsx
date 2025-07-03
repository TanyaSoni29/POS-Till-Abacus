/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { OrderTabs } from '../components/OrderTabs';
import { Search, Scan } from 'lucide-react';
import { setSelectedCategory } from '../slices/categorySlice';
import { useMemo, useState } from 'react';
import { updateOrder } from '../slices/orderSlice';
import { ProductCard } from '../components/ProductCard';

const getCategoryColor = (category) => {
	const colors = {
		All: 'bg-gray-600 hover:bg-gray-700',
		Coffee: 'bg-amber-600 hover:bg-amber-700',
		Pastries: 'bg-pink-600 hover:bg-pink-700',
		Salads: 'bg-green-600 hover:bg-green-700',
		Mains: 'bg-blue-600 hover:bg-blue-700',
		Beverages: 'bg-cyan-600 hover:bg-cyan-700',
	};
	return colors[category] || 'bg-gray-600 hover:bg-gray-700';
};
export default function Home() {
	const dispatch = useDispatch();
	const { categories, selectedCategory } = useSelector(
		(state) => state.category
	);
	const { products } = useSelector((state) => state.product);
	const { activeOrderId, orders } = useSelector((state) => state.order);

	const [searchQuery, setSearchQuery] = useState('');
	const activeOrder = orders.find((order) => order.id === activeOrderId);
	// Filter products based on search and category
	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const matchesSearch =
				product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.category.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory =
				selectedCategory === 'All' || product.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [products, searchQuery, selectedCategory]);

	const updateOrderInStore = (orderId, updates) => {
		dispatch(
			updateOrder(
				{ id: orderId, updates } // Use object destructuring for clarity
			)
		);
	};

	const addToCart = (product) => {
		console.log(product);
		if (!activeOrder) return;

		const existingItem = activeOrder.items.find(
			(item) => item.product.id === product.id
		);
		let newItems;

		if (existingItem) {
			newItems = activeOrder.items.map((item) =>
				item.product.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
		} else {
			newItems = [...activeOrder.items, { product, quantity: 1 }];
		}

		updateOrderInStore(activeOrderId, { items: newItems });
	};

	const getCartQuantity = (productId) => {
		if (!activeOrder) return 0;
		const item = activeOrder.items.find(
			(item) => item.product.id === productId
		);
		return item ? item.quantity : 0;
	};

	const updateCartQuantity = (product, quantity) => {
		if (!activeOrder) return;

		let newItems;
		if (quantity <= 0) {
			newItems = activeOrder.items.filter(
				(item) => item.product.id !== product.id
			);
		} else {
			const existingItem = activeOrder.items.find(
				(item) => item.product.id === product.id
			);
			if (existingItem) {
				newItems = activeOrder.items.map((item) =>
					item.product.id === product.id ? { ...item, quantity } : item
				);
			} else {
				newItems = [...activeOrder.items, { product, quantity }];
			}
		}

		updateOrder(activeOrderId, { items: newItems });
	};

	return (
		<>
			{/* Order Tabs */}
			<OrderTabs />

			{/* Search and Categories */}
			<div className='p-6 space-y-4'>
				<div className='flex gap-4'>
					<div className='relative flex-1'>
						<Search
							className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
							size={20}
						/>
						<input
							type='text'
							placeholder='Search products...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<button className='px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2'>
						<Scan size={20} />
						Scan
					</button>
				</div>

				<div className='flex gap-2 overflow-x-auto pb-2'>
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => dispatch(setSelectedCategory(category))}
							className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
								selectedCategory === category
									? `text-white ${getCategoryColor(category)}`
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
							}`}
						>
							{category}
						</button>
					))}
				</div>
			</div>

			{/* Products Grid */}
			<div className='flex-1 px-6 pb-6'>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{filteredProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onAddToCart={addToCart}
							cartQuantity={getCartQuantity(product.id)}
							onUpdateQuantity={updateCartQuantity}
						/>
					))}
				</div>

				{filteredProducts.length === 0 && (
					<div className='text-center py-12'>
						<div className='text-gray-400 mb-4'>
							<Search
								size={48}
								className='mx-auto'
							/>
						</div>
						<h3 className='text-lg font-semibold text-gray-600 mb-2'>
							No products found
						</h3>
						<p className='text-gray-500'>
							Try adjusting your search or filter criteria
						</p>
					</div>
				)}
			</div>
		</>
	);
}
