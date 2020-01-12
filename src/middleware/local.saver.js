export const save_state_locally = store => next => action => {
	next(action);
	localStorage.setItem('UpStay_data', JSON.stringify(store.getState()));
	return;
};

export const get_local_state = () => JSON.parse(localStorage.getItem('UpStay_data')) || {};
