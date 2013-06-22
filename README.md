# Websocket server performance comparison

Compare websocket performance between puma (threaded) and thin.
(evented). We use the node.js implementation as a control.

# Apps

- [ ] rails with thin and tubesock
- [ ] rails with puma and tubesock
- [ ] node.js websocket implementation

# Tests

- [ ] (0) Test the test server functionality
- [ ] (1) Test the latency of an echo
- [ ] (2) Test the maximum number of connections
- [ ] (3) Find out how the number of concurrent operations affects the response
  time (Use two different 'operations' designed to break threaded
and evented servers)

# Server functionality

| Operation                             | Endpoint    |
| ------------------------------------- | ----------- |
| Connect                               | any         |
| Echo (latency)                        | /echo       |
| Busy wait                             | /bw_echo    |
| Busy wait, short idle wait, busy wait | /bw_iw_echo |

