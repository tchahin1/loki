import { combineReducers } from 'redux';
import ServerTextEnum from '../assets/enum/ServerTextEnum';
import SignInReducer from '../features/sign-in/SignInReducer'; // added
import AccountReducer from '../features/account/AccountReducer';
import SignUpReducer from '../features/sign-up/SignUpReducer';
import ElectricMeterReducer from '../features/electric-meter/ElectricMeterReducer';
import PlaceOfMeasurementModalReducer from '../components/helpers/PlaceOfMeasurementModalReducer';
import HomeReducer from '../features/home/HomeReducer';

const changeServerText = text => ({
  current: text,
});

const INITIAL_STATE = {
  current: ServerTextEnum.WAITING.text,
};

const serverTextReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ServerTextEnum.RECEIVED.type:
      return changeServerText(action.payload);
    case ServerTextEnum.UNAVAILABLE.type:
      return changeServerText(action.payload);
    case ServerTextEnum.WAITING.type:
      return changeServerText(action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  serverText: serverTextReducer,
  signIn: SignInReducer, // added
  account: AccountReducer,
  signUp: SignUpReducer,
  electricMeter: ElectricMeterReducer,
  measurementPlaceModal: PlaceOfMeasurementModalReducer,
  home: HomeReducer,
});
