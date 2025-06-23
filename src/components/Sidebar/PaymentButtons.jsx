/** @format */

export default function PaymentButtons() {
	return (
		<div className='border-t border-stone-200 w-full'>
			<div className='flex flex-col justify-center items-center gap-2'>
				<div className='flex justify-between items-center gap-2 h-[20%] w-full p-8'>
					<div>
						<p>Items</p>
						<p>Total Discount</p>
						<p></p>
					</div>
					<div className='bg-stone-700 h-full w-[1px]'></div>
					<div>
						<p>Total</p>
						<p>Due</p>
						<p>Weight</p>
					</div>
				</div>
				<div className='flex justify-center items-center gap-2 h-[60%] mt-0 mb-4'>
					<button className=' bg-red-600 text-red-50 px-4 py-2 cursor-pointer rounded-lg hover:bg-red-400 transition-all duration-300 uppercase font-semibold'>
						Cancel All
					</button>

					<button className=' bg-blue-600 text-blue-50 px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-400 transition-all duration-300 uppercase font-semibold'>
						Layway
					</button>
					<button className=' bg-stone-600 text-stone-50 px-4 py-2 cursor-pointer rounded-lg hover:bg-stone-400 transition-all duration-300 uppercase font-semibold'>
						Quote
					</button>

					<button className=' bg-green-600 text-green-50 px-4 py-2 cursor-pointer rounded-lg hover:bg-green-400 transition-all duration-300 uppercase font-semibold'>
						Pay
					</button>
				</div>
			</div>
		</div>
	);
}
