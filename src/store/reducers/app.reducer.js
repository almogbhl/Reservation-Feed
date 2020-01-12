import produce from 'immer';

import * as constants from '../constants/app.constants';

export const initialState = {
	reservations_list: {
		data: {
			original_list: null,
			filtered_list: null,
			filter_query: ''
		},
		currencies_types: null,
		isLoading: false,
		error: ''
	},
	hotels_list: {
		data: null,
		isLoading: false,
		error: ''
	},
	currencies_list: {
		defaultRate: 'USD',
		data: null,
		isLoading: false,
		error: ''
	},
	currencies_rates: {
		data: {
			to: {}
		},
		isLoading: false,
		error: ''
	}
};

export default (state = initialState, action) => {
	return produce(state, draft => {
		switch (action.type) {
			// ======================================================
			// ------------------ ADD_NEW_RESERVATION ---------------
			// ======================================================
			case constants.ADD_NEW_RESERVATION:
				if (draft.reservations_list.data.original_list) {
					draft.reservations_list.data.original_list.push(action.payload);

					// only when the search query is emty - add to the list
					if (!draft.reservations_list.data.filter_query.length) {
						draft.reservations_list.data.filtered_list.push(action.payload);
					}
				} else {
					draft.reservations_list.data.original_list = [action.payload];
					draft.reservations_list.data.filtered_list = [action.payload];
				}
				break;
			// ======================================================
			// ---------------------- FILTER LIST -------------------
			// ======================================================
			case constants.FILTER_LIST:
				draft.reservations_list.data.filter_query = action.payload;
				if (draft.reservations_list.data.original_list) {
					draft.reservations_list.data.filtered_list = draft.reservations_list.data.original_list.filter(
						item => item.uuid.includes(action.payload)
					);
				}
				break;
			// ======================================================
			// ------------------ CHANGE DEFAULT RATE ---------------
			// ======================================================
			case constants.CHANGE_DEFAULT_RATE:
				draft.currencies_list.defaultRate = action.payload;

				break;
			// ======================================================
			// ---------------------- HOTELS_LIST -------------------
			// ======================================================
			case constants.FETCHING_HOTELS_LIST:
				draft.hotels_list.isLoading = true;
				break;
			case constants.FETCHED_HOTELS_LIST:
				draft.hotels_list.isLoading = false;
				draft.hotels_list.data = action.payload;
				draft.hotels_list.error = '';
				break;
			case constants.FETCHING_HOTELS_LIST_ERROR:
				draft.hotels_list.isLoading = false;
				draft.hotels_list.error = action.payload;

				break;
			// ======================================================
			// -------------------- CURRENCIES_LIST -----------------
			// ======================================================
			case constants.FETCHING_CURRENCIES_LIST:
				draft.currencies_list.isLoading = true;
				break;
			case constants.FETCHED_CURRENCIES_LIST:
				draft.currencies_list.isLoading = false;
				draft.currencies_list.data = action.payload;
				draft.currencies_list.error = '';
				break;
			case constants.FETCHING_CURRENCIES_LIST_ERROR:
				draft.currencies_list.isLoading = false;
				draft.currencies_list.error = action.payload;

				break;
			// ======================================================
			// ------------------- CURRENCIES_RATES -----------------
			// ======================================================
			case constants.FETCHING_CURRENCIES_RATES:
				draft.currencies_rates.isLoading = true;
				break;
			case constants.FETCHED_CURRENCIES_RATES:
				draft.currencies_rates.isLoading = false;
				draft.currencies_rates.error = '';
				// layout design:
				// to: {
				//    EUR: {
				//		  from: {
				//			  USD: { rate: 1.235432, ... }
				//        }
				//    }
				// }
				for (let key in action.payload) {
					if (draft.currencies_rates.data.to[action.payload[key].toCurrency]) {
						if (draft.currencies_rates.data.to[action.payload[key].toCurrency]) {
							draft.currencies_rates.data.to[action.payload[key].toCurrency]['from'][
								key
							] = action.payload[key];
						}
					} else {
						draft.currencies_rates.data.to[action.payload[key].toCurrency] = {
							from: {
								[key]: action.payload[key]
							}
						};
					}
				}

				break;
			case constants.FETCHING_CURRENCIES_RATES_ERROR:
				draft.currencies_rates.isLoading = false;
				draft.currencies_rates.error = action.payload;

				break;

			// ======================================================
			// ------------------- RESERVATIONS_LIST ----------------
			// ======================================================
			case constants.FETCHING_RESERVATIONS_LIST:
				draft.reservations_list.isLoading = true;
				break;
			case constants.FETCHED_RESERVATIONS_LIST:
				draft.reservations_list.isLoading = false;
				draft.reservations_list.error = '';
				draft.reservations_list.currencies_types = action.payload.currenciesTypes;

				if (draft.reservations_list.data.original_list) {
					draft.reservations_list.data.original_list.push(...action.payload.reservations);
					draft.reservations_list.data.filtered_list.push(...action.payload.reservations);
				} else {
					draft.reservations_list.data.original_list = action.payload.reservations;
					draft.reservations_list.data.filtered_list = action.payload.reservations;
				}
				break;
			case constants.FETCHING_RESERVATIONS_LIST_ERROR:
				draft.reservations_list.isLoading = false;
				draft.reservations_list.error = action.payload;

				break;

			// ======================================================
			// ----------------------- DEFAULT ----------------------
			// ======================================================
			default:
				return draft;
		}
	});
};
