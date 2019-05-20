export const receivedTextFromServerAction = text => (
  {
    type: 'RECEIVED_TEXT',
    payload: text,
  }
);

export const serverUnavailableAction = () => (
  {
    type: 'SERVER_UNAVAILABLE',
    payload: 'Server not reachable',
  }
);

export const waitingForServerAction = () => (
  {
    type: 'WAITING',
    payload: 'Waiting for the response ...',
  }
);
