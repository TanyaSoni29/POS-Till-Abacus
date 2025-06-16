/** @format */
export default function ProductItem({ item }) {
	return (
		<tr className='border-t border-stone-200 hover:bg-stone-50'>
			<td className='p-2'>
				<div className='flex flex-col'>
					<span className='font-medium'>{item.productName}</span>
					<span className='text-sm text-stone-500'>#{item.partNo}</span>
				</div>
			</td>
			<td className='p-2 text-center'>
				<span className='cursor-pointer'>➕</span> {item.quantity}{' '}
				<span className='cursor-pointer'>➖</span>
			</td>
			<td className='p-2 text-center'>₹{item.eachPrice.toLocaleString()}</td>
			<td className='p-2 text-center'>
				₹{(item.quantity * item.eachPrice).toLocaleString()}
			</td>
		</tr>
	);
}
