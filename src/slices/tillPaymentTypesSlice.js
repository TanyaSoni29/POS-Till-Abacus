/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getTillPaymentTypes } from '../services/operations/tillApi';

const initialState = {
	paymentTypes: [],
};

const paymentTypeSlice = createSlice({
	name: 'paymentType',
	initialState,
	reducers: {
		setPaymentTypes(state, action) {
			state.paymentTypes = action.payload;
		},
	},
});

export function refreshPaymentTypes() {
	return async (dispatch) => {
		const response = await getTillPaymentTypes();
		if (response) dispatch(setPaymentTypes(response));
		return response;
	};
}

export const { setPaymentTypes } = paymentTypeSlice.actions;
export default paymentTypeSlice.reducer;
