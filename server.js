import express from 'express';
import open from 'open';
import routes from '@upstay/routes';
import * as reservationsService from '@upstay/services/reservations';
import serverDev from './server.dev';
import serverIO from './server.io';
import { addReservation } from './db/reservations';

const app = express();
const port = process.env.PORT || 9999;
const appURL = `http://localhost:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(routes);

serverDev(app);

// socket.io server
const server = serverIO(app, socket => {
	reservationsService.start(async reservation => {
		const addedReservation = await addReservation(reservation);

		if (addedReservation) {
			socket.emit('reservation', reservation);
		}
	});
});

server.listen(port, () => {
	console.log(`Server started ${appURL}`);
	open(appURL);
});
