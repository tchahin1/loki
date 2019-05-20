import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform, StatusBar, View,
} from 'react-native';
import {
  AppLoading, Font, Icon,
} from 'expo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import serverTextReducer from './reducers/ServerTextReducer';
import SpaceMonoFont from './assets/fonts/SpaceMono-Regular.ttf';
import createStyles from './App.styles';
import HomeScreen from './screens/Home';

const styles = createStyles();

const store = createStore(serverTextReducer);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  };

  static defaultProps = {
    skipLoadingScreen: false,
  };

  loadResourcesAsync = async () => Promise.all([
    Font.loadAsync({
      ...Icon.Ionicons.font,
      'space-mono': SpaceMonoFont,
    }),
  ]);

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <HomeScreen />
        </View>
      </Provider>
    );
  }
}
