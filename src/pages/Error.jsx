/** @format */

import { useMoveBack } from '../hook/useMoveBack';

export default function Error() {
	const moveBack = useMoveBack();
	return (
		<div className='flex flex-col justify-center item-center h-screen bg-red-100 text-red-800'>
			<h2> The page you are looking for could not be found 😢</h2>
			<button onClick={moveBack}>👈🏻 Go Back</button>
		</div>
	);
}
