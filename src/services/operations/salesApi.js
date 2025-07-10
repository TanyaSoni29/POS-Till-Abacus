/** @format */

import { handlePostReq } from '../apiRequestHandler';
import { salesEndpoints } from '../apis';

const { CREATE_SALE, COMPLETE_PAYMENT } = salesEndpoints;

export async function createSale(data) {
	const response = await handlePostReq(CREATE_SALE, data);
	console.log('create sale operation', response);
	if (response.status === 'success') {
		return response;
	}
	return response;
}

export async function completePayment(data) {
	const response = await handlePostReq(COMPLETE_PAYMENT, data);
	console.log('create complete payment operation', response);
	if (response.status === 'success') {
		return response;
	}
	return response;
}
