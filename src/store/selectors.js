import { createSelector } from 'reselect';

// ======================================================
// -------------------- LOADING DATA --------------------
// ======================================================
export const selectorLoadingData = createSelector(
	(state, type) => state.app[type].isLoading,
	isLoading => isLoading
);

// ======================================================
// -------------------- RECEIVING DATA ------------------
// ======================================================
export const selectorReceivingData = createSelector(
	(state, type) => state.app[type].data,
	data => data
);

// ======================================================
// ------------------- FETCHING ERROR -------------------
// ======================================================
export const selectorFetchingError = createSelector(
	(state, type) => state.app[type].error,
	error => error
);

// ======================================================
// ------------------ CURRENCIES TYPES ------------------
// ======================================================
export const selectorCurrenciesTypes = createSelector(
	state => state.app.reservations_list.currencies_types,
	currencies_types => currencies_types
);

// ======================================================
// -------------------- DEFAULT RATE --------------------
// ======================================================
export const selectorDefaultRate = createSelector(
	state => state.app.currencies_list.defaultRate,
	defaultRate => defaultRate
);
