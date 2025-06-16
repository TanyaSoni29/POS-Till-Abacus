/** @format */

import ProductItem from './ProductItem';

const fakeProduct = [
	{
		partNo: 1,
		productName: 'Cycle',
		quantity: 1,
		eachPrice: 1200,
	},
	{
		partNo: 2,
		productName: 'Motor Cycle',
		quantity: 1,
		eachPrice: 1200,
	},
	{
		partNo: 3,
		productName: 'Helmet',
		quantity: 1,
		eachPrice: 1200,
	},
	{
		partNo: 4,
		productName: 'Cycle 2',
		quantity: 1,
		eachPrice: 1200,
	},
	{
		partNo: 5,
		productName: 'Motor Cycle2',
		quantity: 1,
		eachPrice: 1200,
	},
	{
		partNo: 6,
		productName: 'Cycle 3',
		quantity: 1,
		eachPrice: 1200,
	},
];
export default function ProductList() {
	return (
		<ul className='divide-y divide-stone-200'>
			{fakeProduct.map((item) => (
				<ProductItem
					item={item}
					key={item.partNo}
				/>
			))}
		</ul>
	);
}
