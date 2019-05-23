import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import api from '../../../network.config';
import createStyles from './Home.styles';
import { receivedTextFromServerAction, serverUnavailableAction, waitingForServerAction } from '../../../actions/ServerTextActions';

const styles = createStyles();

class HomeScreen extends React.Component {
    static propTypes = {
      serverText: PropTypes.shape({}).isRequired,
      serverUnavailable: PropTypes.func.isRequired,
      waitingForServer: PropTypes.func.isRequired,
      receivedTextFromServer: PropTypes.func.isRequired,
    };

    componentWillMount() {
      this.fetchServerText();
    }

    fetchServerText = () => {
      const { waitingForServer, receivedTextFromServer, serverUnavailable } = this.props;
      waitingForServer();
      fetch(`${api}/hello`).then((response) => {
        response.text().then((text) => {
          receivedTextFromServer(text);
        });
      }).catch(() => {
        serverUnavailable();
      });
    };

    render() {
      const { serverText } = this.props;
      const { current } = serverText;
      return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.getStartedContainer}>

              <Text style={styles.getStartedText}>
                      Server response:
                {' '}
                {current}
              </Text>
            </View>
            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={() => this.fetchServerText()} style={styles.helpLink}>
                <Text style={styles.helpLinkText}>Try again if not reachable</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  const { serverText } = state;
  return { serverText };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    serverUnavailable: serverUnavailableAction,
    waitingForServer: waitingForServerAction,
    receivedTextFromServer: receivedTextFromServerAction,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
