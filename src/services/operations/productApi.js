/** @format */

import { handleGetReq } from '../apiRequestHandler';
import { ProductEndpoints } from '../apis';

const { GET_PRODUCTS_BY_PART_NUMBER } = ProductEndpoints;

export async function getProductByPartNumber(partNumber) {
	const response = await handleGetReq(GET_PRODUCTS_BY_PART_NUMBER(partNumber));
	console.log('get all GET_PRODUCTS_BY_PART_NUMBER response ---', response);
	if (response.status === 'success') {
		return response;
	}
	return response;
}
