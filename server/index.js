const WebSocket = require('ws');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 9875;

app.use('/',express.static(path.resolve(__dirname, '../client')));

// start regular web server, listening on PORT
const myServer = app.listen(PORT);
console.log('Starting server on port ' + PORT);

// start web socket server
const wsServer = new WebSocket.Server({
    noServer: true
});

// define action on connection
wsServer.on('connection', (ws) => {
    // action on messsage sent
    ws.on('message', (msg) => {
        // serve all connected clients...
        wsServer.clients.forEach(function each(client) {
            // ...but only if client is ready
            if (client.readyState === WebSocket.OPEN) {
              client.send(msg.toString());
            }
        });
    });
});

// define action for upgrade (http to websocket) event
myServer.on('upgrade', async function upgrade(request, socket, head) {
    wsServer.handleUpgrade(request, socket, head, function done(ws) {
      wsServer.emit('connection', ws, request);
    });
});