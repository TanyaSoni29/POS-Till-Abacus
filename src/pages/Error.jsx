/** @format */

import { useNavigate } from 'react-router-dom';

export default function Error() {
	const navigate = useNavigate();
	return (
		<div className='flex flex-col justify-center item-center h-screen bg-red-100 text-red-800'>
			<h2>Something Went Wrong 🥲</h2>
			<button onClick={() => navigate('/')}>👈🏻 Go Back</button>
		</div>
	);
}
