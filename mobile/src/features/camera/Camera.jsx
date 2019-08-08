import React from 'react';
import {
  View,
  ImageBackground,
  BackHandler,
} from 'react-native';
import { Camera, Permissions } from 'expo';
import PropTypes from 'prop-types';

import CloseCameraButton from '../../components/camera/CloseCameraButton';
import TakePhotoButton from '../../components/camera/TakePhotoButton';
import SavePhotoButton from '../../components/camera/SavePhotoButton';

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

  closeCamera = () => {
    const { currentPhoto } = this.state;
    if (currentPhoto !== null) {
      this.setState({ currentPhoto: null });
    } else {
      this.goBack();
    }
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.navigate(navigation.state.params.onBackButtonPressScreen);
  };

  render() {
    const {
      hasCameraPermission,
      currentPhoto,
      type,
    } = this.state;
    const { navigation } = this.props;

    if (hasCameraPermission === null || hasCameraPermission === false) {
      return <View />;
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
                <CloseCameraButton closeCamera={this.closeCamera} />
                <TakePhotoButton takePicture={this.takePhoto} />
              </View>
            </Camera>
          )
          : (
            <ImageBackground
              style={styles.cameraContainer}
              source={{ uri: currentPhoto.uri }}
            >
              <CloseCameraButton closeCamera={this.closeCamera} />
              <SavePhotoButton savePhoto={() => navigation.state.params.savePhoto(currentPhoto)} />
            </ImageBackground>
          )
        }
      </View>
    );
  }
}

export default CameraScreen;
