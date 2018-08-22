var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(1337, function() { });

// create the http server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);

  //on message event
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
        console.log(message);
        //send the received message ECHO
        connection.sendUTF(message.utf8Data);
    }
  });

  //disconnect event
  connection.on('close', function(connection) {
    console.log('connection closed');
  });
});