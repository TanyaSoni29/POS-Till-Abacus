/** @format */

const BASE = import.meta.env.VITE_BASE_URL;

export const customerEndpoints = {
	GET_CUSTOMERS: `${BASE}/api/Customer`,
	GET_CUSTOMERS_BY_ID: (id) => `${BASE}/api/Customer/${id}`,
	CREATE_CUSTOMERS: `${BASE}/api/Customer/`,
	UPDATE_CUSTOMERS: (id) => `${BASE}/api/Customer/${id}`,
	DELETE_CUSTOMERS: (id) => `${BASE}/api/Customer/${id}`,
};

export const tillEndpoints = {
	GET_TILLS_PRODUCT_SHORTCUTS: (locCode) =>
		`${BASE}/api/Till/getTillProductShortcuts?locCode=${locCode || '00'}`,
};

export const PrtoductEndpoiunts = {
	GET_PRODUCTS_BY_PART_NUMBER: (partnumber) =>
		`${BASE}/api/Products/partnumber/${partnumber}`,
};

export const salesEndpoints = {
	CREATE_SALE: `${BASE}/api/Sales`,
};
