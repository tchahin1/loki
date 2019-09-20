import { combineReducers } from 'redux';
import ServerTextEnum from '../assets/enum/ServerTextEnum';
import SignInReducer from '../features/sign-in/SignInReducer';
import AccountReducer from '../features/account/AccountReducer';
import SignUpReducer from '../features/sign-up/SignUpReducer';
import ElectricMeterReducer from '../features/electric-meter/ElectricMeterReducer';
import PlaceOfMeasurementModal from '../components/helpers/PlaceOfMeasurementModalReducer';
import FailureReportReducer from '../features/failure-report/FailureReportReducer';
import HomeReducer from '../features/home/HomeReducer';
import QuestionsAndComplaintsReducer from '../features/questions-and-complaints/QuestionsAndComplaintsReducer';
import MyProfileReducer from '../features/myprofile/MyProfileReducer';


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
  signIn: SignInReducer,
  account: AccountReducer,
  signUp: SignUpReducer,
  electricMeter: ElectricMeterReducer,
  measurementPlaceModal: PlaceOfMeasurementModal,
  failureReport: FailureReportReducer,
  home: HomeReducer,
  qac: QuestionsAndComplaintsReducer,
  profile: MyProfileReducer,
});
