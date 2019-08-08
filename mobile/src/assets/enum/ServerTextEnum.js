const ServerTextEnum = {
  RECEIVED: { type: 'RECEIVED_TEXT' },
  UNAVAILABLE: { type: 'SERVER_UNAVAILABLE', text: 'Server not reachable' },
  WAITING: { type: 'WAITING', text: 'Waiting for the response ...' },
};
Object.freeze(ServerTextEnum);

export default ServerTextEnum;
