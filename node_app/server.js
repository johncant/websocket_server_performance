var ws = require('websocket')
var http = require('http');

waitTime = 0.2; // seconds
WebSocketServer = ws.server

function busyWait(cb) {
  var currentTime = process.hrtime();
  var nsEnd = currentTime[1]+waitTime*1000000000;
  var endTime = [currentTime[0]+Math.floor(nsEnd/1000000000), nsEnd % 1000000000]
  for(;currentTime[0]<endTime[0] || currentTime[1]<endTime[1]; currentTime=process.hrtime()) {
    // lol
  }
  cb();
}

function idleWait(cb) {
  setTimeout(cb, waitTime*1000);
}

// Server setup
var server = http.createServer(function(request, response) {
  console.log(request.url)
  response.writeHead(200);
  response.end();
});

server.listen(8910, function() {
  console.log('Node server listening on port 8910');
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

// Endpoints
wsServer.on('request', function(request) {
  var path = request.httpRequest.url;
  var connection = request.accept('json', request.origin);

  var echoAfter = function(func) {
    connection.on('message', function(message) {
      var reply = function() {
        connection.sendUTF(message.utf8Data);
      }
      if (func) {
        func(reply);
      } else {
        reply()
      }
    });
  }

  // reply after appropriate wait
  if (path == '/echo') {
    echoAfter();
  } else if (path == '/bw_echo') {
    echoAfter(function(reply) {
      busyWait(reply);
    });
  } else if (path == '/bw_iw_echo') {
    echoAfter(function(reply) {
      busyWait(function() {
        idleWait(reply);
      });
    });
  } else {
    console.log('Incorrect path');
  }

});
