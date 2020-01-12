import { query } from './pg';

export const addReservation = async reservation => {
	try {
		const values = addReservationValues(reservation);

		return await new Promise((resolve, reject) => {
			const queryConfig = {
				text:
					'INSERT INTO reservations(uuid, hotel_id, currency, price, guest_name, room_name, arrival_date, nights, insertion_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);',
				values
			};

			query(queryConfig, error => {
				if (error) return reject(error);

				console.log(`[info]: new reservation added - SUCCEED`);
				return resolve(true);
			});
		});
	} catch (err) {
		console.log(`[error]: addReservation - FAILED - ${err}`);

		return null;
	}
};

export const getAllReservations = async () => {
	try {
		return await new Promise((resolve, reject) => {
			const text = 'SELECT * FROM reservations';

			query(text, (error, results) => {
				if (error) reject(error);

				console.log(`[info]: getAllReservations - SUCCEED`);
				resolve(results.rows);
			});
		});
	} catch (err) {
		console.log(`[error]: getAllReservations - FAILED - ${err}`);

		return null;
	}
};

export const deleteAllReservation = async () => {
	try {
		return await new Promise((resolve, reject) => {
			const text = 'DELETE FROM reservations';

			query(text, (error, results) => {
				if (error) reject(error);

				console.log(`[info]: deleteAllReservation - SUCCEED`);
				resolve(results.rows);
			});
		});
	} catch (err) {
		console.log(`[error]: deleteAllReservation - FAILED - ${err}`);

		return null;
	}
};

const addReservationValues = reservation => {
	const queryValues = [];
	const insertion_date = new Date().toISOString();

	for (const key in reservation) {
		queryValues.push(reservation[key]);
	}
	queryValues.push(insertion_date);

	return queryValues;
};
