import express from 'express';
import axios from 'axios';

const router = express.Router();

const API = {
	currencies_list: `http://api.openrates.io/latest`,
	currencies_rates: (from, to) => `http://api.openrates.io/latest?base=${from}&symbols=${to}`
};

router.get('/', (req, res) => {
	const URL = `${API.currencies_list}`;

	axios
		.get(URL)
		.then(response => {
			const currencies = ['EUR'];
			for (const key in response.data.rates) {
				currencies.push(key);
			}

			console.log(`[info]: get currencies list - SUCCEED`);
			res.send(currencies.sort());
		})
		.catch(err => {
			console.log(`[error]: currencies list - FAILED - ${err.message}`);
		});
});

router.get('/rates/:from-:to', (req, res) => {
	const fromCurrency = req.params.from;
	const toCurrency = req.params.to;
	const URL = API.currencies_rates(fromCurrency, toCurrency);

	axios
		.get(URL)
		.then(response => {
			const currencyRate = {
				rate: response.data.rates[toCurrency],
				toCurrency,
				fromCurrency
			};
			res.send(currencyRate);

			console.log(`[info]: get rates - SUCCEED`);
		})
		.catch(err => {
			console.log(`[error]: get rates - FAILED - ${err.message}`);
		});
});

export default router;
