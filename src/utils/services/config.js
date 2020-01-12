const api = {
	reservations_list: 'http://localhost:9999/api/reservations/',
	currencies_list: `http://localhost:9999/api/currencies/`,
	hotels_list: `http://localhost:9999/api/hotels/`,
	currencies_rates: ({ from, to }) => `http://localhost:9999/api/currencies/rates/${from}-${to}`
};

export default api;
