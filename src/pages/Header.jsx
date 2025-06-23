/** @format */
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useState } from 'react';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className='text-black border-b border-sky-100 p-4'>
			<div className='flex justify-start items-center gap-2 md:gap-4'>
				<button
					onClick={() => setIsMenuOpen((prev) => !prev)}
					className='px-2 py-2 rounded-full bg-sky-50 hover:bg-sky-200 duration-300 transition-all border border-sky-100'
				>
					{isMenuOpen ? <MenuOpenIcon /> : <MenuIcon />}
				</button>
				<div>
					<h2 className='text-lg font-bold tracking-wider text-sky-950'>
						EPOS ERP CO.
					</h2>
				</div>
			</div>
		</div>
	);
}
