import axios from 'axios';
import api from '../../utils/services/config';
import * as constants from '../constants/app.constants';

// ======================================================
// ----------------- ADD NEW RESERVATION ----------------
// ======================================================
export const addNewReservation = newReservation => ({
	type: constants.ADD_NEW_RESERVATION,
	payload: newReservation
});

// ======================================================
// --------------------- FILTER LIST --------------------
// ======================================================
export const filterList = value => ({
	type: constants.FILTER_LIST,
	payload: value
});

// ======================================================
// ----------------- CHANGE DEFAULT RATE ----------------
// ======================================================
export const changeDefaultRate = currency => ({
	type: constants.CHANGE_DEFAULT_RATE,
	payload: currency
});

// ======================================================
// --------- FETCH MULTIPLE REQUESTS FROM SERVER ---------
// ======================================================
export const fetchMultipleRequestsFromServer = ({ type, params }) => {
	return function(dispatch) {
		const fetch_details = getFetchingDetails(type, {});
		dispatch({ type: fetch_details.FETCHING });

		const requests = params.from.map(request => {
			if (request === params.to) return false;

			const helper = { from: request, to: params.to };
			const getUrl = getFetchingDetails(type, helper);
			return axios.get(getUrl.API_URL);
		});

		const URLS = requests.filter(item => item);

		Promise.all(URLS)
			.then(values => {
				const rates = {};
				values.map(item => {
					rates[item.data.fromCurrency] = item.data;
				});

				dispatch({ type: fetch_details.FETCHED, payload: rates });
			})
			.catch(error => {
				// Error
				console.log(error);
				dispatch({
					type: fetch_details.ERROR,
					payload: `${type} - Error`
				});
			});
	};
};

// ======================================================
// ---------------- FETCH DATA FROM SERVER --------------
// ======================================================
export const fetchDataFromServer = (type, params) => {
	return function(dispatch) {
		const fetch_details = getFetchingDetails(type, params);

		dispatch({ type: fetch_details.FETCHING });

		return axios
			.get(fetch_details.API_URL)
			.then(response => {
				// Success
				dispatch({ type: fetch_details.FETCHED, payload: response.data });
			})
			.catch(error => {
				// Error
				console.log(error);
				dispatch({
					type: fetch_details.ERROR,
					payload: `${type} - Error`
				});
			});
	};
};

const getFetchingDetails = (type, params) => {
	const helper = {
		API_URL: '',
		FETCHING: '',
		FETCHED: '',
		ERROR: ''
	};

	switch (type) {
		case 'reservations_list':
			helper.API_URL = api.reservations_list;
			helper.FETCHING = constants.FETCHING_RESERVATIONS_LIST;
			helper.FETCHED = constants.FETCHED_RESERVATIONS_LIST;
			helper.ERROR = constants.FETCHING_RESERVATIONS_LIST_ERROR;
			break;
		case 'currencies_list':
			helper.API_URL = api.currencies_list;
			helper.FETCHING = constants.FETCHING_CURRENCIES_LIST;
			helper.FETCHED = constants.FETCHED_CURRENCIES_LIST;
			helper.ERROR = constants.FETCHING_CURRENCIES_LIST_ERROR;
			break;
		case 'currencies_rates':
			helper.API_URL = api.currencies_rates(params);
			helper.FETCHING = constants.FETCHING_CURRENCIES_RATES;
			helper.FETCHED = constants.FETCHED_CURRENCIES_RATES;
			helper.ERROR = constants.FETCHING_CURRENCIES_RATES_ERROR;
			break;
		case 'hotels_list':
			helper.API_URL = api.hotels_list;
			helper.FETCHING = constants.FETCHING_HOTELS_LIST;
			helper.FETCHED = constants.FETCHED_HOTELS_LIST;
			helper.ERROR = constants.FETCHING_HOTELS_LIST_ERROR;
			break;

		default:
			break;
	}

	return helper;
};
