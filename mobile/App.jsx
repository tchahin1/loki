import React from 'react';
import ReduxThunk from 'redux-thunk';
import PropTypes from 'prop-types';
import {
  AppLoading, Font, Icon,
} from 'expo';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import serverTextReducer from './src/reducers/ServerTextReducer';
import SpaceMonoFont from './src/assets/fonts/SpaceMono-Regular.ttf';
import createRootNavigator from './src/navigation/router';
import { isSignedIn } from './Auth';

// added applyMiddleware!!!!
const store = createStore(serverTextReducer, {}, applyMiddleware(ReduxThunk));

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    checkedSignIn: false,
    signedIn: false,
  };

  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  };

  static defaultProps = {
    skipLoadingScreen: false,
  };

  componentDidMount() {
    isSignedIn().then(res => this.setState({
      signedIn: res,
      checkedSignIn: true,
    }));
  }

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
    const { isLoadingComplete, checkedSignIn, signedIn } = this.state;
    const { skipLoadingScreen } = this.props;

    const AppContainer = createAppContainer(createRootNavigator(signedIn));

    if (!isLoadingComplete && !skipLoadingScreen && !checkedSignIn) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
