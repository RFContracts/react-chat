const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (res) => {
    const _res = JSON.parse(res);
    let message;

    switch (_res.type) {
      case 'Login':
        const id = Date.now();
        ws.id = id;
        ws.name = _res.data.name;
        message = createMessage('Login', {
          id,
          name: _res.data.name
        });
        send('sendToOne', message, ws);

        message = createMessage('NewUser', JSON.parse(message).payload);

        send('sendToOther', message, ws);
        message = createMessage('GetUserList', {
          users: Array.from(wss.clients).reduce((acc, user) => {
            if (user.id) {
              acc.push({
                id: user.id,
                name: user.name
              });
            }
            return acc
          }, [])
        });
        send('sendToOne', message, ws);
        break;

      case 'SendMessage':
        message = createMessage('SendMessage', {
          owner_name: ws.name,
          text: _res.data.text
        });
        send('sendToAll', message);
        break;
    }
  });

});

function createMessage(type, payload) {
  return JSON.stringify({
    type,
    payload,
  });
}

function send(type, message, ws = null) {
  switch(type) {
    case 'sendToOne':
      if (!ws) {
        console.error('Client is not defined');
        return;
      }
      ws.send(message);
      break;
    case 'sendToAll':
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
      break;
    case 'sendToOther':
      if (!ws) {
        console.error('Client is not defined');
        return;
      }
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      })
  }
}
