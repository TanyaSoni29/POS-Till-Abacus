/** @format */

import { Outlet } from 'react-router-dom';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';

export default function AppLayout() {
	return (
		<div className='h-screen flex '>
			<div className='flex flex-col flex-1 overflow-hidden'>
				<Header />
				<main className='flex-1 overflow-auto bg-white'>
					<Outlet />
				</main>
			</div>
			<Sidebar />
		</div>
	);
}
