import ServerTextEnum from '../assets/enum/ServerTextEnum';

export const receivedTextFromServerAction = text => (
  {
    type: ServerTextEnum.RECEIVED.type,
    payload: text,
  }
);

export const serverUnavailableAction = () => (
  {
    type: ServerTextEnum.UNAVAILABLE.type,
    payload: ServerTextEnum.UNAVAILABLE.text,
  }
);

export const waitingForServerAction = () => (
  {
    type: ServerTextEnum.WAITING.type,
    payload: ServerTextEnum.WAITING.text,
  }
);
