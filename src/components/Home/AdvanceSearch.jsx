/** @format */
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/common/FormRow';
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
			className='fixed inset-0 flex justify-center items-center bg-black/25 z-50 overflow-visible'
			onClick={close}
		>
			<div
				className='bg-white p-4 rounded-lg shadow-lg max-w-[90rem] w-full flex flex-col items-center gap-4'
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
						<div className='flex items-center gap-2'>
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

							<FormRow
								label='Search 1'
								error={errors?.search1?.message}
							>
								<input
									type='text'
									placeholder='Enter Supplier..'
									{...register('search1', {
										required: 'This field is required.',
									})}
									className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</FormRow>

							<FormRow
								label='Search 2'
								error={errors?.search2?.message}
							>
								<input
									type='text'
									placeholder='Enter Supplier..'
									{...register('search2', {
										required: 'This field is required.',
									})}
									className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</FormRow>
						</div>
						<div className='flex items-center gap-2'>
							<FormRow
								label='MFR No'
								error={errors?.mfrNumber?.message}
							>
								<input
									type='text'
									placeholder='Enter MfrNumber..'
									{...register('mfrNumber', {
										required: 'This field is required.',
									})}
									className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</FormRow>

							<FormRow
								label='Details'
								error={errors?.details?.message}
							>
								<input
									type='text'
									placeholder='Enter Details..'
									{...register('details')}
									className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</FormRow>
							<div className='flex items-center gap-2 w-full'>
								<FormRow
									label='Size'
									error={errors?.size?.message}
								>
									<input
										type='text'
										placeholder='Enter Size..'
										{...register('size')}
										className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</FormRow>

								<FormRow
									label='Color'
									error={errors?.color?.message}
								>
									<input
										type='text'
										placeholder='Enter Color..'
										{...register('color', {
											required: 'This field is required.',
										})}
										className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</FormRow>
							</div>
							<div className='flex items-center gap-2 w-full'>
								<FormRow
									label='Gender'
									error={errors?.gender?.message}
								>
									<input
										type='text'
										placeholder='Enter Gender..'
										{...register('gender')}
										className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</FormRow>

								<FormRow
									label='Year'
									error={errors?.year?.message}
								>
									<input
										type='text'
										placeholder='Enter Year..'
										{...register('year', {
											required: 'This field is required.',
										})}
										className='w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
								</FormRow>
							</div>
						</div>

						<div className='flex items-center gap-2'>
							<FormRow label='Stock Filter'>
								<div className='border border-gray-300 rounded-lg p-2 space-y-2 w-full flex items-center gap-2 justify-between'>
									<div>
										<label className='flex items-center gap-2'>
											<input
												type='radio'
												value='all'
												{...register('stockFilter')}
												defaultChecked
											/>
											<span className='text-blue-600 font-semibold'>
												ALL PRODUCTS
											</span>
										</label>
									</div>
									<div>
										<label className='flex items-center gap-2'>
											<input
												type='radio'
												value='allShops'
												{...register('stockFilter')}
											/>
											<span>STOCK (ALL SHOPS)</span>
										</label>
									</div>
									<div>
										<label className='flex items-center gap-2'>
											<input
												type='radio'
												value='here'
												{...register('stockFilter')}
											/>
											<span>STOCK HERE</span>
										</label>
									</div>
									<div className='flex items-center gap-2'>
										<label className='flex items-center gap-2'>
											<input
												type='radio'
												value='stockAt'
												{...register('stockFilter')}
											/>
											<span>STOCK AT</span>
										</label>
										<input
											type='text'
											placeholder='Shop ID'
											{...register('stockAtValue')}
											className='w-16 px-1 py-0.5 border border-gray-300 rounded'
										/>
									</div>
									<div>
										<label className='flex items-center gap-2'>
											<input
												type='radio'
												value='notInStock'
												{...register('stockFilter')}
											/>
											<span>NOT IN STOCK (ALL SHOPS)</span>
										</label>
									</div>
								</div>
							</FormRow>
						</div>

						<div className='w-full flex gap-2 justify-end items-center'>
							<button
								type='button'
								className='px-3 py-2 bg-transparent border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2'
								onClick={close}
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

					<div className='w-full flex items-center overflow-x-auto'>Table</div>
				</div>
			</div>
		</div>
	);
}
