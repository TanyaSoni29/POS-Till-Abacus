/** @format */

import { Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/common/FormRow';

export default function AddCustomerModal({ onclose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};
	
	return (
		<div
			className='fixed inset-0 flex justify-center items-center bg-black/25 overflow-hidden'
			onClick={onclose}
		>
			<div
				className='bg-white rounded-lg shadow-lg max-w-5xl w-full flex flex-col'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className='w-full h-[4rem] px-6 py-4 border-b border-b-gray-200'>
					<div className='flex items-center justify-between'>
						<p className='font-bold text-xl'>Enter Customer</p>
						<button
							className='p-1 hover:bg-gray-100 rounded'
							onClick={onclose}
						>
							<X
								size={16}
								className='text-grey-700'
							/>
						</button>
						{/* <div className='flex gap-2 justify-end items-center'>
							<button
								type='button'
								className='px-3 py-2 bg-transparent border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2'
								onClick={onclose}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2'
							>
								<Save size={16} />
								Save Customer
							</button>
						</div> */}
					</div>
				</div>

				<div className='w-full p-6 h-full'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='flex items-center gap-2'>
							<FormRow
								label='Customer Number'
								error={errors?.customerAccount?.message}
							>
								<input
									type='text'
									placeholder='Enter customer number...'
									{...register('customerAccount', 'This field is required')}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
								/>
							</FormRow>
							<FormRow
								label='Claim Ref'
								error={errors?.claimRef?.message}
							>
								<input
									type='text'
									placeholder='Enter claim ref...'
									{...register('claimRef')}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
								/>
							</FormRow>
							<FormRow
								label='Purchase Order No.'
								error={errors?.purchaseOrderNo?.message}
							>
								<input
									type='text'
									placeholder='Enter purchase order number...'
									{...register('purchaseOrderNo')}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
								/>
							</FormRow>
						</div>
						<div className='flex items-center gap-2 mb-4'>
							<FormRow
								label='Loyalty Card No.'
								error={errors?.loyaltyCardNo?.message}
							>
								<input
									type='text'
									placeholder='Enter loyalty card Number...'
									{...register('loyaltyCardNo')}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
								/>
							</FormRow>
							<FormRow
								label='Customer Category'
								error={errors?.customerCategory?.message}
							>
								<input
									type='text'
									placeholder='Enter customer category...'
									{...register('customerCategory')}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
								/>
							</FormRow>
							<FormRow
								label='Details'
								error={errors?.details?.message}
							>
								<input
									type='text'
									placeholder='Enter details...'
									{...register('details')}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
								/>
							</FormRow>
						</div>
						<div className='flex gap-2 justify-end items-center'>
							<button
								type='button'
								className='px-3 py-2 bg-transparent border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2'
								onClick={onclose}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2'
							>
								<Save size={16} />
								Save Customer
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
