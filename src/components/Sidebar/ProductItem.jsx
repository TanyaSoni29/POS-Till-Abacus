/** @format */
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
				<span className='cursor-pointer bg-sky-50 border-sky-100 rounded-full px-2 py-2 text-sm'>
					<AddIcon />
				</span>{' '}
				{item.quantity}{' '}
				<span className='cursor-pointer bg-sky-50 border-sky-100 rounded-full px-2 py-2 text-sm'>
					<RemoveIcon />
				</span>
			</td>
			<td className='p-2 text-center'>₹{item.eachPrice.toLocaleString()}</td>
			<td className='p-2 text-center'>
				₹{(item.quantity * item.eachPrice).toLocaleString()}
			</td>
		</tr>
	);
}
