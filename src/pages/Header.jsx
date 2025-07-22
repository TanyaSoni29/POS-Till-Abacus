/** @format */

import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import { useDispatch } from 'react-redux';
import { setActivePanel } from '../slices/settingSlice';
import { LogOut } from 'lucide-react';
export default function Header() {
	const dispatch = useDispatch();
	return (
		<div className='bg-white shadow-sm border-b border-gray-200 px-6 py-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl'>
						<StoreMallDirectoryOutlinedIcon
							className='text-white'
							size={24}
						/>
					</div>
					<div>
						<h1 className='text-xl font-bold text-gray-900'>EPOS System</h1>
						<p className='text-sm text-gray-600'>Store #001</p>
					</div>
					<div className='flex items-center gap-2'>
						<button
							className='bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-2 text-white rounded-lg text-sm font-semibold'
							onClick={() => dispatch(setActivePanel('retail'))}
						>
							Retail
						</button>
						<button
							className='bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-2 text-white rounded-lg text-sm font-semibold'
							onClick={() => dispatch(setActivePanel('hospitality'))}
						>
							Hospitality
						</button>
					</div>
				</div>
				<div className='flex items-center gap-4'>
					<div className='flex items-center gap-2 text-gray-600'>
						<div className='w-8 h-8 bg-gray-300 rounded-full'></div>
						<span className='font-medium'>John Doe</span>
					</div>
					<div className='text-gray-600'>
						<LogOut size={20} />
					</div>
				</div>
			</div>
		</div>
	);
}
