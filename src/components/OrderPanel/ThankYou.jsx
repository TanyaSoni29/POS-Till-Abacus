/** @format */

import { CheckCircle } from 'lucide-react';

export default function ThankYou() {
	return (
		<div className='h-full flex items-center justify-center p-8'>
			<div className='text-center'>
				<CheckCircle
					className='mx-auto text-green-500 mb-4'
					size={64}
				/>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>
					Payment Successful!
				</h2>
				<p className='text-gray-600'>Thank you for your purchase</p>
			</div>
		</div>
	);
}
