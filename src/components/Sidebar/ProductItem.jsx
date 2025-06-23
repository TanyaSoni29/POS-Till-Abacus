/** @format */
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
export default function ProductItem({ item }) {
	return (
		<tr className='border-t border-stone-200 hover:bg-stone-50'>
			<td className='p-2'>
				<div className='flex flex-col'>
					<span className='font-medium'>{item.productName}</span>
					<span className='text-sm text-stone-500'>#{item.partNo}</span>
				</div>
			</td>
			<td className='p-2 text-start flex items-center'>
				<span className='cursor-pointer bg-sky-50 border-sky-100 rounded-full px-1 py-1 text-sm'>
					<AddIcon fontSize='small' />
				</span>{' '}
				<span className='text-sm'>{item.quantity} </span>
				<span className='cursor-pointer bg-sky-50 border-sky-100 rounded-full px-1 py-1 text-sm'>
					<RemoveIcon fontSize='small' />
				</span>
			</td>
			<td className='p-2 text-center'>₹{item.eachPrice.toLocaleString()}</td>
			<td className='p-2 text-center'>
				₹{(item.quantity * item.eachPrice).toLocaleString()}
			</td>
			<td className='p-2 flex justify-center items-center'>
				<div className='px-2 py-2 flex justify-center items-center rounded-full border border-red-100 bg-red-50'>
					<DeleteIcon
						fontSize='small'
						className='text-red-500 text-xs'
					/>
				</div>
			</td>
		</tr>
	);
}
