/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getCustomers } from '../services/operations/customersApi';

const initialState = {
	customers: [],
};

const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		setCustomers(state, action) {
			state.customers = action.payload;
		},
	},
});

export function refreshCustomers() {
	return async (dispatch) => {
		try {
			const response = await getCustomers();
			if (response.status === 'success') {
				dispatch(
					setCustomers([
						{ id: '0', firstname: 'Walk-in Customer', loyaltyPoints: 0, accNo: "00000" },
						...response.data,
					])
				);
			}
		} catch (err) {
			console.error('Error refreshing customers:', err);
		}
	};
}

export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;
