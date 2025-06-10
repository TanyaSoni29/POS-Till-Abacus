/** @format */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import Error from './pages/Error';
import Home from './pages/Home';

/** @format */
const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Home />,
				errorElement: <Error />,
			},
		],
	},
]);
export default function App() {
	return <RouterProvider router={router} />;
}
