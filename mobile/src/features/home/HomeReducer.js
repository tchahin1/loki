import * as types from '../../actions/types';

const INITIAL_STATE = {
  notification: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.NOTIFICATION_RECIEVED:
      return { ...state, notification: true };
    default:
      return state;
  }
};
