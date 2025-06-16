/** @format */

export default function ProductItem({ item }) {
	return (
		<li>
			<div className=''>
				<p>{item.productName}</p>
				<p>{item.partNo}</p>
			</div>
			<p>{item.quantity}</p>
			<p>{item.eachPrice}</p>
			<p>{item.quantity * item.eachPrice}</p>
		</li>
	);
}
