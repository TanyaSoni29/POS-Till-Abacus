/** @format */

import CustomerEntry from '../components/CustomerEntry/CustomerEntry';
import ProductMenuList from '../components/ProductSearch/ProductMenuList';
import ProductSearch from '../components/ProductSearch/ProductSearch';

export default function Home() {
	return (
		<div className='text-black p-4'>
			<div className='flex flex-col justify-between items-center gap-4'>
				<div className='flex justify-between items-center gap-4'>
					<div className='w-[50%]'>
						<ProductSearch />
					</div>
					<div className='w-[50%]'>
						<CustomerEntry />
					</div>
				</div>

				<div className='w-full'>
					<ProductMenuList />
				</div>
			</div>
		</div>
	);
}
