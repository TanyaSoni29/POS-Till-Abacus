/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	activePanel: 'retail',
};

const settingSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		setActivePanel(state, action) {
			state.activePanel = action.payload;
		},
	},
});

export const { setActivePanel } = settingSlice.actions;
export default settingSlice.reducer;
