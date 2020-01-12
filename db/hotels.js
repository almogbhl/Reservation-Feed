import { query } from './pg';

export const getHotelsList = async () => {
	try {
		return await new Promise((resolve, reject) => {
			const text = 'SELECT * FROM hotels';

			query(text, (error, results) => {
				if (error) reject(error);

				console.log(`[info]: getHotelsList - SUCCEED`);
				resolve(results.rows);
			});
		});
	} catch (err) {
		console.log(`[error]: getHotelsList - FAILED - ${err}`);

		return null;
	}
};
