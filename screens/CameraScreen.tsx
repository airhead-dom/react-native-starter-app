import React from 'react';
import {View, StyleSheet} from 'react-native';
import Camera from '../features/camera/Camera';

const cameraScreenStyle = StyleSheet.create({
  view: {
    flex: 1,
  },
});

const CameraScreen = () => {
  return (
    <View style={cameraScreenStyle.view}>
      <Camera />
    </View>
  );
};

export default CameraScreen;
