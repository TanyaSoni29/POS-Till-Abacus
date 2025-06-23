/** @format */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ProductSearch() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
		reset,
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				partNo: 0,
			});
		}
	}, [reset, isSubmitSuccessful]);
	return (
		<div className='flex flex-col justify-center item-center'>
			<h2 className='text-lg font-semibold uppercase mb-2'>Product Search</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex justify-start items-center gap-2 border border-sky-100 p-4 w-auto rounded-md'
			>
				<div className='flex flex-col justify-center items-center'>
					<input
						type='number'
						placeholder='Part No. / MPN / Barcode'
						className=' bg-gray-50 px-3 py-2 md:px-4 md:py-2 focus:outline-none focus:ring focus:focus:ring-sky-100 border border-sky-50 rounded-sm'
						{...register('partNo', { required: true })}
					/>
					{errors?.partNo && (
						<span className='text-sm text-red-400 bg-red-200 p-4'>
							{errors.partNo.message}
						</span>
					)}
				</div>

				<div className='flex flex-col justify-center items-center'>
					<input
						type='number'
						placeholder='Stock No.'
						className=' bg-gray-50 px-3 py-2 md:px-4 md:py-2 focus:outline-none focus:ring focus:focus:ring-sky-100 border border-sky-50 rounded-sm'
					/>
				</div>

				<div className='flex justify-center items-center'>
					<input
						type='number'
						placeholder='Reservation / Quote No.'
						className=' bg-gray-50 px-3 py-2 md:px-4 md:py-2 focus:outline-none focus:ring focus:focus:ring-sky-100 border border-sky-50 rounded-sm'
					/>
				</div>

				<button
					type='submit'
					className='inline-block text-sm rounded-full bg-blue-400  font-semibold tracking-wide text-stone-50 uppercase transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:ring focus:ring-blue-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed px-3 py-2 md:px-4 md:py-2'
				>
					Submit
				</button>
			</form>
		</div>
	);
}
