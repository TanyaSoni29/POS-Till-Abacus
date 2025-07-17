/** @format */

export default function CheckoutTabs({ tabs, toggleActiveTab, activeTab }) {
	return (
		<div className='flex justify-start items-center gap-4 px-6 py-4'>
			<div className='text-gray-700 flex justify-center items-center space-x-4'>
				{tabs.map((tab) => (
					<button
						onClick={() => toggleActiveTab(tab.key)}
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
	);
}
