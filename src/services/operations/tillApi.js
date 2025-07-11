/** @format */

import { handleGetReq } from '../apiRequestHandler';
import { tillEndpoints } from '../apis';

const { GET_TILLS_PRODUCT_SHORTCUTS } = tillEndpoints;
export async function getTillProductShortcuts(SetID) {
	const response = await handleGetReq(GET_TILLS_PRODUCT_SHORTCUTS(SetID));
	console.log('get all GET_TILLS_PRODUCT_SHORTCUTS response ---', response);

	if (response.status === 'success') {
		return response;
	}
	return null;
}
