var ws = require('websocket');
var uuid = require('uuid');

var WebSocketClient = ws.client

// Generic echo functionality test

exports.against = function(host, port) {

  var genericEchoTest = function(requireEcho, text, endpoint) {

    return function(finished) {

      var failure = function() {
        process.stdout.write("FAIL\n");
        finished();
      }

      var success = function() {
        process.stdout.write("OK\n");
        finished();
      }


      var client = new WebSocketClient();

      client.on('connectFailed', function(error) {
        console.log('Connect Error: ' + error.toString());
        failure();
      });

      client.on('connect', function(connection) {
        var testString = uuid.v4();
        var timeout;
        var cleanup = function(func) {
          if (connection.connected) {
            connection.close();
          }
          func();

          if (timeout) {
            clearTimeout(timeout);
          }
        }

        if (requireEcho) {
          timeout = setTimeout(function() {
            cleanup(failure);
          }, 2000);

          connection.sendUTF(testString);

          connection.on('message', function(message) {
            if (message.utf8Data == testString) {
              cleanup(success);
            }
          });

        } else {
          cleanup(success);
        }
      });

      client.connect('ws://'+host+':'+port+endpoint, 'json');
      process.stdout.write(text+" ... ");

    }
  }

  return {
    testConnect: genericEchoTest(false, "Server accepts connections", '/echo'),
    testEcho: genericEchoTest(true, "Server echoes", '/echo'),
    testBusyEcho: genericEchoTest(true, "Server echoes with busy wait", '/bw_echo'),
    testBusyIdleEcho: genericEchoTest(true, "Server echoes with combined wait", '/bw_iw_echo')
  }

}
