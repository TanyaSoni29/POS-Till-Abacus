/** @format */

import { useSelector } from 'react-redux';

export default function AdvanceCheckout({
	setSelectedPaymentType,
	tenderedAmounts,
	selectedPaymentType,
	amountDue,
	advanceCalChange,
	calButtons,
	handleAdvanceButtonClick,
	handleClickEnter,
	isProcessing,
	setTenderedAmounts,
}) {
	const { paymentTypes } = useSelector((state) => state.paymentType);
	return (
		<div className='flex flex-col gap-6'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{/* Left Panel: Payment Type Inputs */}
				<div className='space-y-2'>
					<h3 className='font-bold text-blue-600 mb-2'>PAYMENT TYPE</h3>
					{paymentTypes.map((type) => (
						<div
							key={type?.id}
							className='flex items-center justify-between'
						>
							<label className='text-gray-700 text-sm'>{type.name}:</label>
							<input
								type='text'
								onClick={() => setSelectedPaymentType(type.name)}
								value={tenderedAmounts[type.name] ?? ''}
								defaultValue='0.00'
								onChange={(e) => {
									const inputValue = e.target.value;

									// Allow empty input
									if (inputValue === '') {
										setTenderedAmounts((prev) => ({
											...prev,
											[type.name]: '',
										}));
										return;
									}

									// Allow valid decimal values
									if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
										setTenderedAmounts((prev) => ({
											...prev,
											[type.name]: inputValue,
										}));
									}
								}}
								className={`border border-gray-300 rounded px-2 py-1 text-sm w-24 cursor-pointer bg-white ${
									selectedPaymentType === type.name
										? 'ring-2 ring-blue-500'
										: ''
								}`}
							/>
						</div>
					))}

					{/* Giant Reference Fields */}
					<div className='mt-2'>
						<label className='block text-sm font-medium'>GIANT REF:</label>
						<input
							type='text'
							className='w-full border border-gray-300 rounded px-2 py-1 mt-1'
						/>
					</div>
				</div>

				{/* Middle Panel: Cash Options + Summary */}
				<div className='flex flex-col justify-between col-span-2 gap-4'>
					<div className='grid grid-cols-2 gap-4'>
						{/* Amount Summary */}
						<div className='space-y-2 mt-4'>
							<div className='flex justify-between'>
								<span className='text-gray-600'>AMOUNT DUE:</span>
								<span className='font-bold text-black text-lg'>
									£{amountDue?.toFixed(2)}
								</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-600'>TENDERED:</span>
								<span className='text-gray-800'>£0.00</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-600'>REMAINING:</span>
								<span className='text-gray-800'>£0.00</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-red-600 font-semibold'>CHANGE:</span>
								<span className='text-red-600 font-bold'>
									£{advanceCalChange}
								</span>
							</div>
						</div>
						<div className='space-y-2'>
							<button className='w-full py-2 bg-green-500 text-white rounded-lg font-semibold'>
								DONE
							</button>
							<button className='w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold'>
								CUSTOMER PRESENT
							</button>
							<button className='w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold'>
								RETURN TO SALE
							</button>
						</div>
					</div>
					{/* Cal Buttons */}
					<div className='grid grid-cols-4 gap-2'>
						{calButtons.map((btn, i) => (
							<button
								key={i}
								onClick={() => handleAdvanceButtonClick(btn)}
								className='py-3 text-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100 text-lg font-semibold'
							>
								{btn}
							</button>
						))}
						<button
							className='col-span-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold'
							onClick={handleClickEnter}
							disabled={isProcessing}
						>
							ENTER
						</button>
						{/* Bottom Row: Account Balance */}
						<div className='col-span-4 text-sm text-right font-semibold text-blue-600'>
							ACCOUNT BALANCE: £100350.73
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
