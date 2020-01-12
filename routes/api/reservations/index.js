import express from 'express';
import { getAllReservations } from '../../../db/reservations';

const router = express.Router();

router.get('/', async (req, res) => {
	const allReservations = await getAllReservations();
	const currencies = allReservations.map(item => item.currency.toUpperCase());
	const reservationsCurrenciesTypes = [...new Set(currencies)];

	res.send({ reservations: allReservations, currenciesTypes: reservationsCurrenciesTypes });
});

export default router;
