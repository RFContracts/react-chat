class CustomSocket {
  constructor() {
    this.socket = new WebSocket('ws://localhost:8080');
    this.socketInit();
    this._reconnect = () => {};
    this.handlers = {};
    this.errorHandlers = [];
  };

  socketInit = () => {
    this.socket.onmessage = this._onMessage;
    this.socket.onopen = this._onOpen;
    this.socket.onerror = this._onError;
    this.socket.onclose = this._onClose;
  };

  _onMessage = (res) => {
    const _res = JSON.parse(res.data);
    this.handlers[_res.type] && this.handlers[_res.type](_res);
  };

  _onOpen = () => {
    console.log('WS connection successful');
    this._reconnect()
  };

  _onClose = () => {
    this.socket = new WebSocket('ws://localhost:8080');
    this.socketInit()
  };

  _onError = () => {
    this.errorHandlers.forEach(el => {
      el()
    })
  };

  setReconnect = (handler) => {
    this._reconnect = handler
  };

  addHandler(type, handler) {
    this.handlers[type] = handler;
  };

  addError(handler) {
    this.errorHandlers.push(handler)
  }

  getInstance() {
    return this.socket;
  };

  send(message) {
    this.socket.readyState === WebSocket.OPEN && this.socket.send(message)
  }
}

const socket = new CustomSocket();

export default socket;
