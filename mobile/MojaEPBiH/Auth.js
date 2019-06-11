import { AsyncStorage } from 'react-native';

const KEY = 'USER_TOKEN';

export const isSignedIn = () => new Promise((resolve, reject) => {
  AsyncStorage.getItem(KEY).then((res) => {
    if (res !== null) {
      resolve(true);
    } else {
      resolve(false);
    }
  }).catch(err => reject(err));
});

export const onSignIn = async (token) => {
  await AsyncStorage.setItem(KEY, token);
};

export const onSignOut = async () => {
  await AsyncStorage.removeItem(KEY);
};

export const getToken = () => new Promise((resolve, reject) => {
  AsyncStorage.getItem(KEY).then((res) => {
    if (res !== null) {
      resolve(res);
    } else {
      reject();
    }
  }).catch(err => reject(err));
});
