/** @format */

export default function Summary({ amountDue, vat, discounts, change }) {
	return (
		<>
			<h3 className='text-lg font-semibold'>Summary</h3>
			<SummaryRow
				label='Amount Due:'
				value={`£${amountDue?.toFixed(2)}`}
				bold
			/>
			<SummaryRow
				label='V.A.T.:'
				value={`£${vat?.toFixed(2)}`}
			/>
			<SummaryRow
				label='Discounts:'
				value={`£${discounts?.toFixed(2)}`}
			/>
			<SummaryRow
				label='Change:'
				value={`£${change}`}
				highlight
			/>
		</>
	);
}

function SummaryRow({ label, value, bold, highlight }) {
	return (
		<div className='flex justify-between'>
			<span
				className={`text-gray-700 ${
					highlight ? 'text-red-600 font-semibold' : ''
				}`}
			>
				{label}
			</span>
			<span
				className={`${bold ? 'font-bold text-lg' : ''} ${
					highlight ? 'text-red-600 font-bold' : ''
				}`}
			>
				{value}
			</span>
		</div>
	);
}
