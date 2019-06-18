import React from 'react';
import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  BackHandler,
  Text,
} from 'react-native';
import { Camera, Permissions } from 'expo';
import PropTypes from 'prop-types';

import CloseCameraButton from '../../../../components/ElectricMeter/Camera/CloseCameraButton';
import TakePhotoButton from '../../../../components/ElectricMeter/Camera/TakePhotoButton';
import SavePhotoButton from '../../../../components/ElectricMeter/Camera/SavePhotoButton';

import createStyles from './Camera.styles';

const styles = createStyles();

class CameraScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      type: Camera.Constants.Type.back,
      hasCameraPermission: false,
      currentPhoto: null,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    BackHandler.addEventListener('hardwareBackPress', this.closeCamera);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.closeCamera);
  }

  takePhoto = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        skipProcessing: true,
      };
      const photo = await this.camera.takePictureAsync(options);
      this.setState({ currentPhoto: photo });
    }
  };

  savePhoto = () => {

  };

  render() {
    const {
      hasCameraPermission,
      currentPhoto,
      type,
    } = this.state;
    const { navigation } = this.props;

    if (hasCameraPermission === null) {
      return <View />;
    } if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.wrapper}>
        {currentPhoto === null
          ? (
            <Camera
              style={styles.wrapper}
              type={type}
              ref={(ref) => {
                this.camera = ref;
              }}
              ratio="16:9"
            >
              <View style={styles.cameraContainer}>
                <CloseCameraButton closeCamera={navigation.goBack} />
                <TakePhotoButton takePicture={this.takePhoto} />
              </View>
            </Camera>
          )
          : (
            <ImageBackground
              style={styles.wrapper}
              source={currentPhoto.uri}
            >
              <KeyboardAvoidingView
                style={styles.cameraContainer}
                behaviour="padding"
                enabled
              />
              <CloseCameraButton closeCamera={navigation.goBack} />
              <SavePhotoButton savePhoto={this.savePhoto} />
            </ImageBackground>
          )
          }
      </View>
    );
  }
}

export default CameraScreen;
