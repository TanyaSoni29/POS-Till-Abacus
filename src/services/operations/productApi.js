/** @format */

import { handleGetReq } from '../apiRequestHandler';
import { PrtoductEndpoiunts } from '../apis';

const { GET_PRODUCTS_BY_PART_NUMBER } = PrtoductEndpoiunts;

export async function getProductByPartNumber(partNumber) {
	const response = await handleGetReq(GET_PRODUCTS_BY_PART_NUMBER(partNumber));
	console.log('get all GET_PRODUCTS_BY_PART_NUMBER response ---', response);
	if (response.status === 'success') {
		return response;
	}
	return response;
}
