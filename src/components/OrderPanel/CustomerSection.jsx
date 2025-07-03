/** @format */

import { useState } from 'react';
import { ChevronDown, Plus, Search, User, Users } from 'lucide-react';
import AddCustomerModal from './AddCustomerModal';
export default function CustomerSection({
	selectedCustomer,
	onSelectCustomer,
	customers,
}) {
	const [searchQuery, setSearchQuery] = useState('');
	const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
	const [addCustomerOpen, setAddCustomerIOpen] = useState(false);

	const filterCunstomers = customers.filter((customer) =>
		customer.firstname.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleClose = () => {
		setAddCustomerIOpen(false);
	};

	return (
		<div className='p-4 border-b border-gray-200'>
			<h3 className='text-sm font-semibold text-gray-700 mb-2'>Customer</h3>
			<div className='relative'>
				<div
					onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)}
					className='w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors'
				>
					<div className='flex items-center gap-2'>
						<User
							size={18}
							className='text-blue-600'
						/>
						<span className='font-medium text-gray-900'>
							{selectedCustomer?.firstname}
						</span>
					</div>

					<div className='flex items-center gap-2'>
						{/* <button className='p-1 hover:bg-gray-100 rounded'>
							<Plus
								size={16}
								className='text-gray-600'
							/>
						</button> */}
						<ChevronDown
							size={16}
							className={`text-gray-400 transition-transform ${
								isCustomerDropdownOpen ? 'rotate-180' : ''
							}`}
						/>
					</div>
				</div>

				{isCustomerDropdownOpen && (
					<div className='absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-2'>
						<div className='flex flex-col'>
							<div className='flex gap-4'>
								<div className='relative flex-1'>
									<Search
										className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
										size={20}
									/>
									<input
										type='text'
										placeholder='Search products...'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className='w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</div>
							</div>
							<div className='py-2 border-b border-gray-100'>
								<button
									className='w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 rounded-lg h-10'
									onClick={() => setAddCustomerIOpen(true)}
								>
									<Plus
										size={18}
										className='text-blue-600'
									/>
									<span className='ml-2 text-md font-semibold text-blue-600'>
										Add Customer
									</span>
								</button>
							</div>
						</div>

						{filterCunstomers.map((customer) => (
							<button
								key={customer.id}
								onClick={() => {
									onSelectCustomer(customer);
									setIsCustomerDropdownOpen(false);
								}}
								className='w-full px-3 py-2 text-left overflow-y-auto max-h-48 hover:bg-gray-50 border-b border-gray-100 last:border-b-0'
							>
								<div className='flex items-center gap-2'>
									<Users
										size={16}
										className='text-grey-700'
									/>
									<div>
										<p className='font-medium text-gray-900'>
											{customer?.firstname}
										</p>
										{customer?.email && (
											<p className='text-grey-700'>{customer?.email}</p>
										)}
										{customer?.loyaltyNo && (
											<p className='text-blue-500'>{customer?.loyaltyNo}</p>
										)}
									</div>
								</div>

								{customer.loyaltyPoints > 0 && (
									<p className='text-sm text-gray-600'>
										{customer.loyaltyPoints} points
									</p>
								)}
							</button>
						))}

						{addCustomerOpen && <AddCustomerModal onclose={handleClose} />}
					</div>
				)}
			</div>
		</div>
	);
}
