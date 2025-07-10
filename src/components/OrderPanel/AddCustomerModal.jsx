/** @format */

import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import FormRow from '../common/FormRow';

export default function AddCustomerModal({ onclose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log('Form submitted:', data);
	};
	return (
		<div
			className='fixed inset-0 flex justify-center items-center bg-gray-200/25'
			onClick={onclose}
		>
			<div
				className='bg-white p-4 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center gap-4'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='w-full flex flex-col items-center gap-2'>
					<div className='w-full flex items-center justify-between'>
						<span>New Customer</span>
						<button
							className='p-1 hover:bg-gray-100 rounded'
							onClick={onclose}
						>
							<X
								size={16}
								className='text-grey-700'
							/>
						</button>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='w-full flex flex-col gap-4'
					>
						<FormRow
							label='First Name'
							error={errors?.firstname?.message}
						>
							<input
								type='text'
								placeholder='Enter first name..'
								{...register('firstname', {
									required: 'This field is required.',
								})}
								className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</FormRow>

						<div className='w-full flex gap-2 justify-end items-center'>
							<button
								type='button'
								className='px-3 py-2 bg-transparent border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2'
							>
								Cancel
							</button>
							<button
								type='submit'
								className='px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2'
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
