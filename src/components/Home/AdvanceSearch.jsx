/** @format */
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import FormRow from '../common/FormRow';

export default function AdvanceSearch({ setAdvanceSearchOpen }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log('Form submitted:', data);
	};

	const close = () => setAdvanceSearchOpen(false);
	return (
		<div
			className='fixed inset-0 flex justify-center items-center bg-gray-200/25'
			onClick={close}
		>
			<div
				className='bg-white p-4 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center gap-4'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='w-full flex flex-col items-center gap-2'>
					<div className='w-full flex items-center justify-between'>
						<span>Search</span>
						<button
							className='p-1 hover:bg-gray-100 rounded'
							onClick={close}
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
							label='Make'
							error={errors?.make?.message}
						>
							<input
								type='text'
								placeholder='Enter Make..'
								{...register('make', {
									required: 'This field is required.',
								})}
								className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</FormRow>

						<FormRow
							label='Supplier'
							error={errors?.supplier?.message}
						>
							<input
								type='text'
								placeholder='Enter Supplier..'
								{...register('supplier', {
									required: 'This field is required.',
								})}
								className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</FormRow>

						<div className='w-full flex gap-2 justify-end items-center'>
							<button
								type='button'
								className='bg-gradient-to-r from-gray-300 to-red-600 px-2 py-2 text-white rounded-lg text-sm font-semibold'
								onClick={close}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-2 text-white rounded-lg text-sm font-semibold'
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
