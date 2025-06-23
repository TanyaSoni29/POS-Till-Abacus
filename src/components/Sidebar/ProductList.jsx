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
		<table className='w-full h-auto border-collapse'>
			<thead>
				<tr className='bg-sky-50 font-bold text-md'>
					<th className='p-2 text-left'>Product</th>
					<th className='p-2 text-center'>Quantity</th>
					<th className='p-2 text-center'>Each</th>
					<th className='p-2 text-center'>Total</th>
					<th className='p-2 text-center'>Delete</th>
				</tr>
			</thead>
			<tbody className='overflow-y-auto'>
				{fakeProduct.map((item) => (
					<ProductItem
						item={item}
						key={item.partNo}
					/>
				))}
			</tbody>
		</table>
	);
}
