import http from 'http';
import socketIO from 'socket.io';

export default (app, onConnectionCallback) => {
	const server = http.Server(app);
	const io = socketIO(server);

	io.on('connection', onConnectionCallback);

	return server;
};
