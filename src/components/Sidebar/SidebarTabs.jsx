/** @format */
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ProductList from './ProductList';
export default function SidebarTabs() {
	return (
		<div>
			<div className='w-full justify-evenly items-center flex gap-4 p-4 bg-gray-100 text-gray-400 border-b border-gray-400'>
				<div className='w-full h-full flex flex-col items-center justify-center hover:shadow-md transition-all duration-100'>
					<AccountCircleOutlinedIcon className='' />
					<button className='w-full h-full'>Customer</button>
				</div>
				<div className='h-full w-[1px] bg-gray-400'></div>
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<PostAddOutlinedIcon />
					<button className='h-full w-full'>Order</button>
				</div>
			</div>
			<ProductList />
		</div>
	);
}
