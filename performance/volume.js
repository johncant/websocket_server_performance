var ws = require('websocket');

var WebSocketClient = ws.client

// Generic echo functionality test

exports.against = function(host, port) {

  maxConnections = function(finished) {

    var failure = function() {
      process.stdout.write("FAIL\n");
      finished();
    }

    var success = function() {
      process.stdout.write("OK, "+maxConnections+"\n");
      finished();
    }

    var connections = [];
    var maxConnections = 0;
    var enoughConnections = false;

    var addConnection = function() {
      var client = new WebSocketClient({closeTimeout: 200});

      client.on('connectFailed', function(error) {
        enoughConnections=true;
      });

      client.on('connect', function(connection) {
        connections.push(connection);
        if (maxConnections < connections.length) {
          maxConnections = connections.length
        }
      });

      client.connect('ws://'+host+':'+port+'/echo', 'json');

    }

    process.stdout.write("Finding maximum number of connections ... ");

    var interval = setInterval(function() {
      if (enoughConnections) {
        clearInterval(interval);
        setTimeout(function() {
          while(connections.length > 0) {
            connections.pop().close();
          }
          success();
        }, 1000);

      } else {
        for (var i=0; i<100;i++) {
          addConnection();
        }
      }
    }, 1);

  }

  return {
    maxConnections: maxConnections
  }

}
