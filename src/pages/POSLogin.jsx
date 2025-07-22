/** @format */

import { useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';

import FormRow from '../ui/common/FormRow';

export default function POSLogin() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		reset();
	};

	return (
		<div className='flex flex-col gap-4'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormRow
					label='Enter Password'
					error={errors.password.message}
				>
					<input
						type='password'
						placeholder='Enter password...'
						{...register('password', { required: 'This field is required' })}
						className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
					/>
				</FormRow>
				<FormRow
					label='Enter Terminal Code'
					error={errors.terminalCode.message}
				>
					<input
						type='text'
						placeholder='Enter terminal code...'
						{...register('terminalCode', {
							required: 'This field is required',
						})}
						className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
					/>
				</FormRow>
				<FormRow
					label='Enter Shop Number'
					error={errors.shopNumber.message}
				>
					<input
						type='text'
						placeholder='Enter shop number...'
						{...register('shopNumber', { required: 'This field is required' })}
						className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
					/>
				</FormRow>
				<div className='flex gap-2 justify-end items-center'>
					<button
						type='button'
						className='px-3 py-2 bg-transparent border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2'
						onClick={() => reset()}
					>
						Exist
					</button>
					<button
						type='submit'
						className='px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2'
					>
						<LogIn size={16} />
						Login
					</button>
				</div>
			</form>
		</div>
	);
}
