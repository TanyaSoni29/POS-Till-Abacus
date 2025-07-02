/** @format */

const BASE = import.meta.env.VITE_BASE_URL;

export const customerEndpoints = {
	GET_CUSTOMERS: `${BASE}/api/Customer`,
	GET_CUSTOMERS_BY_ID: (id) => `${BASE}/api/Customer/${id}`,
	CREATE_CUSTOMERS: `${BASE}/api/Customer/`,
	UPDATE_CUSTOMERS: (id) => `${BASE}/api/Customer/${id}`,
	DELETE_CUSTOMERS: (id) => `${BASE}/api/Customer/${id}`,
};
