/** @format */

// import { sendLogs } from '../../utils/getLogs';
import { handleGetReq } from '../apiRequestHandler';
import { customerEndpoints } from '../apis';

const {
	GET_CUSTOMERS,
	SEARCH_CUSTOMERS,
	// CREATE_CUSTOMERS,
	// UPDATE_CUSTOMERS,
	// DELETE_CUSTOMERS,
	// GET_CUSTOMERS_BY_ID,
} = customerEndpoints;

export async function getCustomers() {
	const response = await handleGetReq(GET_CUSTOMERS);
	console.log('get all customers response ---', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: GET_LOCAL_POI2,
		// 		reqBody: searchTerm,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
	return null;
}

// export async function createPoi(data) {
// 	const response = await handlePostReq(CREATE_LOCAL_POI, data);
// 	console.log('create local poi response ---', response);

// 	if (response.status === 'success') {
// 		// sendLogs(
// 		// 	{
// 		// 		url: CREATE_LOCAL_POI,
// 		// 		reqBody: data,
// 		// 		headers: setHeaders(),
// 		// 		response: response,
// 		// 	},
// 		// 	'info'
// 		// );
// 		toast.success('Local POI Created Successfully');
// 		return response;
// 	}
// 	return null;
// }

// export async function updatePoi(data) {
// 	const response = await handlePostReq(UPDATE_LOCAL_POI, data);
// 	console.log('update local poi response ---', response);

// 	if (response.status === 'success') {
// 		// sendLogs(
// 		// 	{
// 		// 		url: UPDATE_LOCAL_POI,
// 		// 		reqBody: data,
// 		// 		headers: setHeaders(),
// 		// 		response: response,
// 		// 	},
// 		// 	'info'
// 		// );
// 		toast.success('Local POI Updated Successfully');
// 		return response;
// 	}
// 	return null;
// }

// export async function deletePoi(id) {
// 	const response = await handleGetReq(DELETE_LOCAL_POI(id));
// 	console.log('delete local poi response ---', response);
// 	if (response.status === 'success') {
// 		// sendLogs(
// 		// 	{
// 		// 		url: DELETE_LOCAL_POI,
// 		// 		reqBody: { id },
// 		// 		headers: setHeaders(),
// 		// 		response: response,
// 		// 	},
// 		// 	'info'
// 		// );
// 		toast.success('Local POI Deleted Successfully');
// 		return response;
// 	}
// 	return false;
// }

export async function searchCustomers(filters) {
	const response = await handleGetReq(SEARCH_CUSTOMERS(filters));
	console.log('get all search customers response ---', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: GET_LOCAL_POI2,
		// 		reqBody: searchTerm,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
	return null;
}
