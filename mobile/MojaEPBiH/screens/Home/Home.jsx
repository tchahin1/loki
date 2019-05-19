import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '../../network.config';
import createStyles from './Home.styles';

const styles = createStyles();

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      header: null,
    };

    constructor(props) {
      super(props);
      this.state = {
        textFromServer: 'Waiting for the response ...',
      };
    }

    componentWillMount() {
      this.fetchServerText();
    }

    fetchServerText = () => {
      this.setState({
        textFromServer: 'Waiting for the response ...',
      }, () => {
        fetch(`${api}/hello`).then((response) => {
          response.text().then((text) => {
            this.setState({
              textFromServer: text,
            });
          });
        }).catch(() => {
          this.setState({
            textFromServer: 'Server not reachable!',
          });
        });
      });
    };

    render() {
      const { textFromServer } = this.state;
      return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.getStartedContainer}>

              <Text style={styles.getStartedText}>
                      Server response:
                {' '}
                {textFromServer}
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
