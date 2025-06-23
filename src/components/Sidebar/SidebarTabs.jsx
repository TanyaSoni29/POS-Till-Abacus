/** @format */
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ProductList from './ProductList';
import PaymentButtons from './PaymentButtons';
export default function SidebarTabs() {
	return (
		<div className='flex flex-col justify-start items-center gap-2 h-screen'>
			<div className='w-full justify-evenly items-center flex gap-4 px-4 py-3.5 bg-sky-50 text-gray-400 border-b border-sky-100'>
				<div className='w-full h-full flex flex-col items-center justify-center transition-all duration-100'>
					<AccountCircleOutlinedIcon className='' />
					<button className='w-full h-full'>Customer</button>
				</div>
				<div className='h-full w-[1px] bg-gray-400'></div>
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<PostAddOutlinedIcon />
					<button className='h-full w-full'>Order</button>
				</div>
			</div>
			<div className='h-[40rem] w-full'>
				<ProductList />
			</div>
			<PaymentButtons />
		</div>
	);
}
