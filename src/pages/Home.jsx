/** @format */

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';

import { setSelectedCategory } from '../slices/categorySlice';
import { addToCart } from '../slices/orderSlice';
import { OrderTabs } from '../components/Home/OrderTabs';
import { ProductCard as HospitalityProductCard } from '../components/Home/Hospitality/ProductCard';
import { ProductCard as RetailProductCard } from '../components/Home/Retail/ProductCard';
import { refreshTillProductShortcuts } from '../slices/productSlice';
import AdvanceSearch from '../components/Home/AdvanceSearch';
import { getTillProduct } from '../services/operations/tillApi';

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
	const { activePanel } = useSelector((state) => state.setting);
	const { categories, selectedCategory } = useSelector(
		(state) => state.category
	);
	const { products } = useSelector((state) => state.product);
	const { activeOrderId, orders } = useSelector((state) => state.order);

	const [searchQuery, setSearchQuery] = useState('');
	const [advanceSearchOpen, setAdvanceSearchOpen] = useState(false);
	const activeOrder = orders.find((order) => order.id === activeOrderId);
	// Filter products based on search and category
	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const matchesSearch =
				product?.partNumber
					?.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				product?.title?.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory =
				selectedCategory === 'ALL' || product.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [products, searchQuery, selectedCategory]);

	const addToCartHandler = async (addProduct) => {
		dispatch(addToCart(addProduct));
	};

	const getCartQuantity = (productId) => {
		if (!activeOrder) return 0;
		const item = activeOrder.items.find(
			(item) => item.product.id === productId
		);
		return item ? item.quantity : 0;
	};

	const handleKeyDownInSearch = async (e) => {
		if (activePanel === 'hospitality') return;
		if (e.key === 'Enter') {
			e.preventDefault();
			// Trigger search or scan action
			try {
				const response = await getTillProduct(searchQuery, '01');
				const product = response.data;
				if (!product) throw new Error('Product not found');
				await addToCartHandler(product); // ✅ Reuse existing logic
				setSearchQuery(''); // Optional: clear search field
			} catch (error) {
				console.log(error);
			}
		}
	};

	const retailCategories = [
		...new Set(
			products.map((product) => (product.category ? product.category : 'ALL'))
		),
	];

	useEffect(() => {
		dispatch(refreshTillProductShortcuts('A'));
	}, [dispatch, activePanel]);

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
							placeholder={
								activePanel === 'hospitality'
									? 'Search products...'
									: 'Search Part Number...'
							}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyDown={handleKeyDownInSearch}
							className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
					</div>
					<button
						className='px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2'
						onClick={() => setAdvanceSearchOpen(true)}
					>
						<Search size={20} />
						Advance
					</button>
				</div>

				<div className='flex gap-2 overflow-x-auto pb-2'>
					{activePanel === 'hospitality' &&
						categories.map((category) => (
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

					{activePanel === 'retail' &&
						retailCategories.map((category) => (
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
			{activePanel === 'hospitality' && (
				<div className='flex-1 px-6 pb-6 overflow-y-auto max-h-[39rem]'>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
						{filteredProducts.map((product) => (
							<HospitalityProductCard
								key={product.partNumber}
								product={product}
								activeOrder={activeOrder}
								onAddToCart={addToCartHandler}
								cartQuantity={getCartQuantity(product.partNumber)}
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
			)}

			{/* Retail Product Grid */}
			{activePanel === 'retail' && (
				<div className='flex-1 px-6 pb-6 overflow-y-auto max-h-[39rem]'>
					<div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
						{filteredProducts.map((product) => (
							<RetailProductCard
								key={product.partNumber}
								product={product}
								activeOrder={activeOrder}
								onAddToCart={addToCartHandler}
								cartQuantity={getCartQuantity(product.partNumber)}
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
			)}

			{advanceSearchOpen && (
				<AdvanceSearch setAdvanceSearchOpen={setAdvanceSearchOpen} />
			)}
		</>
	);
}
