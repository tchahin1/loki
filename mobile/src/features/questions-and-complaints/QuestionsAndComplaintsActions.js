import * as types from '../../actions/types';
import api from '../../api/network.config';

export const initialize = () => ({
  type: types.INITIALIZE_QAC,
});

export const nameChanged = text => ({
  type: types.QAC_NAME_CHANGED,
  payload: text,
});

export const legalNameChanged = text => ({
  type: types.QAC_LEGAL_NAME_CHANGED,
  payload: text,
});

export const surnameChanged = text => ({
  type: types.QAC_SURNAME_CHANGED,
  payload: text,
});

export const addressChanged = text => ({
  type: types.QAC_ADDRESS_CHANGED,
  payload: text,
});

export const codeChanged = text => ({
  type: types.QAC_CODE_CHANGED,
  payload: text,
});

export const emailChanged = text => ({
  type: types.QAC_EMAIL_CHANGED,
  payload: text,
});

export const phoneChanged = text => ({
  type: types.QAC_PHONE_CHANGED,
  payload: text,
});

export const requestChanged = text => ({
  type: types.QAC_REQUEST_CHANGED,
  payload: text,
});

const sendQACFormSuccess = (dispatch, response) => {
  console.log(response);
  dispatch({ type: types.SEND_QAC_SUCCESS });
};

const sendQACFormFail = (dispatch, response) => {
  console.log(response);
  dispatch({ type: types.SEND_QAC_FAIL });
};

export const resetQACStatus = () => ({
  type: types.RESET_QAC_STATUS,
});

export const sendQACForm = ({
  customerType, subsidiary, name, legalName, surname, address, code, email, phone, request, token,
}) => (dispatch) => {
  dispatch({ type: types.SEND_QAC });

  fetch(`${api}/qac/save`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      privateKey: token,
    },
    body: JSON.stringify({
      customerType,
      subsidiaryId: subsidiary,
      name,
      legalName,
      surname,
      address,
      code,
      email,
      phone,
      request,
    }),
  }).then((response) => {
    if (response.ok) {
      sendQACFormSuccess(dispatch, response);
    } else {
      sendQACFormFail(dispatch, response);
    }
  });
};
