import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomeScreen from '.';
import serverTextReducer from '../../../reducers/ServerTextReducer';

const store = createStore(serverTextReducer);

describe('Home snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the home screen', async () => {
    const tree = renderer.create(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
