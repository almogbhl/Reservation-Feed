import express from 'express';
import { getHotelsList } from '../../../db/hotels';

const router = express.Router();

router.get('/', async (req, res) => {
	const hotelsList = await getHotelsList();
	const newHotelsList = {};
	hotelsList.map(item => (newHotelsList[item.id] = item.name));

	res.send(newHotelsList);
});

export default router;
