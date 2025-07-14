/** @format */

import { Check, CheckCheck, X } from 'lucide-react';
import { useState } from 'react';

export default function Checkout({ onclose }) {
	const [activeTab, setActiveTab] = useState('express');

	const tabs = [
		{ key: 'express', label: 'Express Checkout', icon: <Check size={20} /> },
		{
			key: 'advance',
			label: 'Advance Checkout',
			icon: <CheckCheck size={20} />,
		},
	];
	return (
		<div
			className='fixed inset-0 flex justify-center items-center bg-black/25 overflow-hidden'
			onClick={onclose}
		>
			<div
				className='bg-white rounded-lg shadow-lg max-w-5xl w-full flex flex-col gap-2'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className='w-full h-[4rem] px-6 py-4 border-b border-b-gray-200 flex justify-between items-center'>
					<span>Header</span>
					<button
						className='bg-transparent hover:bg-gray-100 cursor-pointer p-2 rounded-lg'
						onClick={onclose}
					>
						<X size={16} />
					</button>
				</div>

				{/* Checkout Tabs */}
				<div className='flex justify-start items-center gap-4 px-6 py-4'>
					<div className='text-gray-700 flex justify-center items-center space-x-4'>
						{tabs.map((tab) => (
							<button
								onClick={() => setActiveTab(tab.key)}
								key={tab.key}
								className={`cursor-pointer p-2 rounded-lg flex item-center justify-center ${
									activeTab === tab.key
										? 'bg-blue-100 text-blue-700 border border-blue-600'
										: ' hover:text-gray-800 hover:bg-gray-200 '
								} `}
							>
								{tab.icon}
								<span>{tab.label}</span>
							</button>
						))}
					</div>
				</div>

				{/* Tab Content */}
				<div className='px-6 py-4'>
					{activeTab === 'express' && (
						<div className='flex flex-col gap-6'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
								{/* Left Panel - Summary */}
								<div className='bg-white border border-gray-200 rounded-xl p-4 space-y-4'>
									<button
										className='w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-lg hover:border-blue-400'
										onClick={() => setActiveTab('advance')}
									>
										SPLIT PAYMENT
									</button>
									<h3 className='text-lg font-semibold'>Summary</h3>
									<div className='flex justify-between'>
										<span className='text-gray-700'>Amount Due:</span>
										<span className='font-bold text-lg text-black'>£25.00</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-700'>V.A.T.:</span>
										<span className='text-gray-700'>£4.99</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-700'>Discounts:</span>
										<span className='text-gray-700'>£0.00</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-red-600 font-semibold'>Change:</span>
										<span className='text-red-600 font-bold'>£0.00</span>
									</div>
								</div>

								{/* Right Panel - Number Pad */}
								<div className='md:col-span-2 flex flex-col justify-between'>
									<div className='flex justify-between items-center mb-2'>
										<input
											type='text'
											readOnly
											value='0.00'
											className='text-right text-2xl border border-gray-300 rounded-md px-4 py-2 w-full font-mono'
										/>
										<button className='ml-4 px-4 py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200'>
											CANCEL
										</button>
									</div>
									<div className='grid grid-cols-4 gap-2'>
										{[
											'1',
											'2',
											'3',
											'£5',
											'4',
											'5',
											'6',
											'£10',
											'7',
											'8',
											'9',
											'£20',
											'.',
											'0',
											'<',
											'£50',
										].map((btn, i) => (
											<button
												key={i}
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
								{['CASH', 'CARD', 'INTEGRATED CARD', 'CREDIT'].map(
									(method, i) => (
										<button
											key={i}
											className='col-span-1 py-3 px-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 font-semibold'
										>
											{method}
										</button>
									)
								)}
							</div>
						</div>
					)}
					{activeTab === 'advance' && <div>Advance</div>}
				</div>
			</div>
		</div>
	);
}
