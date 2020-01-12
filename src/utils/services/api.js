import io from 'socket.io-client';

const socket = io('http://localhost:9999');

socket.on('connect', () => {
	console.log('connect to socket io');
});

// ======================================================
// ------------------- GET RESERVATIONS -----------------
// ======================================================
export function subscribeToSocketio(cb) {
	socket.on('reservation', data => {
		return cb(null, data);
	});
}
