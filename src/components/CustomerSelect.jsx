/** @format */

import { useState } from 'react';
import { User, ChevronDown, Users } from 'lucide-react';

export const CustomerSelect = ({
	customers,
	selectedCustomer,
	onSelectCustomer,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors min-w-[200px]'
			>
				<User
					className='text-blue-600'
					size={20}
				/>
				<div className='flex-1 text-left'>
					<p className='font-medium text-gray-900'>
						{selectedCustomer ? selectedCustomer.firstname : 'Select Customer'}
					</p>
					{selectedCustomer && selectedCustomer.loyaltyPoints !== undefined && (
						<p className='text-sm text-gray-600'>
							{selectedCustomer.loyaltyPoints} points
						</p>
					)}
				</div>
				<ChevronDown
					size={16}
					className={`text-gray-400 transition-transform ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{isOpen && (
				<div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto'>
					{customers.map((customer) => (
						<button
							key={customer.id}
							onClick={() => {
								onSelectCustomer(customer);
								setIsOpen(false);
							}}
							className='w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-3'
						>
							<Users
								size={16}
								className='text-gray-400'
							/>
							<div className='flex-1'>
								<p className='font-medium text-gray-900'>
									{customer?.firstname}
								</p>
								{customer?.email && (
									<p className='text-sm text-gray-600'>{customer?.email}</p>
								)}
								{customer?.loyaltyPoints !== undefined && (
									<p className='text-sm text-blue-600'>
										{customer.loyaltyPoints} loyalty points
									</p>
								)}
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
};
