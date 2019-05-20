import { combineReducers } from 'redux';

const changeServerText = text => ({
  current: text,
});

const INITIAL_STATE = {
  current: 'App loading...',
};

const serverTextReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RECEIVED_TEXT':
      return changeServerText(action.payload);
    case 'SERVER_UNAVAILABLE':
      return changeServerText(action.payload);
    case 'WAITING':
      return changeServerText(action.payload);
    default:
      return state;
  }
};

export default combineReducers({ serverText: serverTextReducer });
