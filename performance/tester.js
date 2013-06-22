var functionalTests = require('./functional')
var VolumeTests = require('./volume')

var ft = functionalTests.against('localhost', 8910)
var vol = VolumeTests.against('localhost', 8910)

var runAllTests = [ft.testConnect, ft.testEcho, ft.testBusyEcho, ft.testBusyIdleEcho, vol.maxConnections].reduce(function(test, nextTest) {
  return function(finished) {
    test(function() {
      nextTest(finished);
    });
  }
});

runAllTests(function() {
  console.log("All tests finished")
});


