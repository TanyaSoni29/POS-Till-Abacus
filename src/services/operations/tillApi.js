/** @format */

import { handleGetReq } from '../apiRequestHandler';
import { tillEndpoints } from '../apis';

const {
	GET_TILLS_PRODUCT_SHORTCUTS,
	GET_TILL_PRODUCT,
	GET_TILL_PAYMENT_TYPES,
} = tillEndpoints;
export async function getTillProductShortcuts(SetID) {
	const response = await handleGetReq(GET_TILLS_PRODUCT_SHORTCUTS(SetID));
	console.log('get all GET_TILLS_PRODUCT_SHORTCUTS response ---', response);

	if (response.status === 'success') {
		return response;
	}
	return null;
}

export async function getTillProduct(partnumber, locCode) {
	const response = await handleGetReq(GET_TILL_PRODUCT(partnumber, locCode));
	console.log('get all GET_TILL_PRODUCT response ---', response);

	if (response.status === 'success') {
		return response;
	}
	return null;
}

export async function getTillPaymentTypes() {
	const response = await handleGetReq(GET_TILL_PAYMENT_TYPES);
	console.log('get all GET_TILL_PAYMENT_TYPES response ---', response);

	if (response.status === 'success') {
		return response.data;
	}
	return null;
}
