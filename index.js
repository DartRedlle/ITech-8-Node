var express=require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.get('/',function(request, response)
{
    response.sendFile(__dirname + '/index.html');
});


connections = [];
 



io.sockets.on('connection', function(socket) {
	console.log("Connection succsesfull");
	// Add new conection
	connections.push(socket);


	socket.on('disconnect', function(data) {
		// Delete user
		connections.splice(connections.indexOf(socket), 1);
		console.log("Disconnection succsesfull");
	});


	socket.on('send mess', function(data) {
		// Внутри функции мы передаем событие 'add mess',
		// которое будет вызвано у всех пользователей и у них добавиться новое сообщение 
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});

});
