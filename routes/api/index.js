import express from 'express';
import reservations from './reservations';
import currencies from './currencies';
import hotels from './hotels';

const router = express.Router();

router.use('/reservations', reservations);
router.use('/hotels', hotels);
router.use('/currencies', currencies);

export default router;
