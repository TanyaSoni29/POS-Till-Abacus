/** @format */

import Summary from "./Summary";

const paymentMethodBtn = ['CASH', 'CARD', 'INTEGRATED CARD', 'CREDIT'];

export default function ExpressCheckout({
	toggleActiveTab,
	amountDue,
	tax,
	discountTotal,
	calChange,
	expressInputValue,
	handleButtonClick,
    calButtons
}) {
	return (
		<div className='flex flex-col gap-6'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{/* Left Panel - Summary */}
				<div className='bg-white border border-gray-200 rounded-xl p-4 space-y-4'>
					<button
						className='w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-lg hover:border-blue-400'
						onClick={() => toggleActiveTab('advance')}
					>
						SPLIT PAYMENT
					</button>
					<Summary
						amountDue={amountDue}
						vat={tax}
						discounts={discountTotal}
						change={calChange}
					/>
				</div>

				{/* Right Panel - Number Pad */}
				<div className='md:col-span-2 flex flex-col justify-between'>
					<div className='flex justify-between items-center mb-2'>
						<input
							type='text'
							readOnly
							value={expressInputValue}
							className='text-right text-2xl border border-gray-300 rounded-md px-4 py-2 w-full font-mono'
						/>
						<button className='ml-4 px-4 py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200'>
							CANCEL
						</button>
					</div>
					{/* Cal Buttons */}
					<div className='grid grid-cols-4 gap-2'>
						{calButtons.map((btn, i) => (
							<button
								key={i}
								onClick={() => handleButtonClick(btn)}
								className='py-3 text-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100 text-lg font-semibold'
							>
								{btn}
							</button>
						))}
					</div>
				</div>
			</div>
			{/* Right Panel - Payment Methods */}
			<div className='grid grid-cols-4 col-span-4 gap-3 items-start'>
				{paymentMethodBtn.map((method, i) => (
					<button
						key={i}
						className='col-span-1 py-3 px-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 font-semibold'
					>
						{method}
					</button>
				))}
			</div>
		</div>
	);
}
