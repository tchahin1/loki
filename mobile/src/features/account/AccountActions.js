import * as types from '../../actions/types';

const logoutUser = () => (dispatch) => {
  dispatch({ type: types.SIGN_OUT_USER });
};

export default logoutUser;
