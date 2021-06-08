import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Camera as ExpoCamera} from 'expo-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
  },
  cameraActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  bottomActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
  },
  ratioButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 1000,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 10,
  },
  ratioSelector: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 3,
    paddingVertical: 5,
  },
  ratioSelectorText: {
    textAlign: 'center',
    paddingVertical: 5,
  },
  snapButtonOuter: {
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: '#fff',
    padding: 5,
    width: 75,
    height: 75,
    backgroundColor: 'transparent',
  },
  snapButtonInner: {
    borderRadius: 1000,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  cancelButtonOuter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 60,
    lineHeight: 63,
  },
  swapButtonContainer: {
    position: 'absolute',
    left: '12.5%',
    top: 75,
  },
  swapButtonOuter: {
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: '#fff',
    padding: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  swapButtonIcon: {
    width: 22.5,
    height: 22.5,
  },
});

const getRatioNumber = (ratio: string) => {
  console.log(ratio);
  const numbers = ratio.split(':');

  // eslint-disable-next-line radix
  return [parseInt(numbers[0]), parseInt(numbers[1])];
};

const Camera = () => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [cameraRef, setCameraRef] = useState<null | ExpoCamera>(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.front);
  const [ratios, setRatios] = useState<string[]>([]);
  const [selectedRatio, setSelectedRatio] = useState('50:23');
  const [selectedRatioInt, setSelectedRatioInt] = useState([50, 23]);
  const [showRatioSelector, setShowRatioSelector] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await ExpoCamera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onRefChange = useCallback(ref => {
    setCameraRef(ref);
  }, []);

  useEffect(() => {
    if (cameraRef) {
      (async () => {
        const supportedRatios = await cameraRef.getSupportedRatiosAsync();

        console.log(supportedRatios);

        if (supportedRatios?.length) {
          setRatios(supportedRatios);

          //  set largest maxiumum supported ratios
          setSelectedRatio(supportedRatios[supportedRatios.length - 1]);
          setSelectedRatioInt(
            getRatioNumber(supportedRatios[supportedRatios.length - 1]),
          );
        }
      })();
    }
  }, [cameraRef]);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const onRatioButtonClick = () => {
    setShowRatioSelector(prevState => !prevState);
  };

  const onRatioSelect = (ratio: string) => {
    setSelectedRatio(ratio);
    setSelectedRatioInt(getRatioNumber(ratio));
    setShowRatioSelector(false);
  };

  const showRatios = () => {
    if (ratios.length) {
      return ratios.map((r, i) => (
        <Text
          key={i}
          style={styles.ratioSelectorText}
          onPress={() => onRatioSelect(r)}>
          {r}
        </Text>
      ));
    } else {
      return <></>;
    }
  };

  const snap = () => {
    if (isCameraReady) {
      cameraRef?.pausePreview();
      setPaused(true);
    }
  };

  const cancel = () => {
    if (isCameraReady) {
      cameraRef?.resumePreview();
      setPaused(false);
    }
  };

  const onSwitchClick = () => {
    setType(prevState => {
      if (prevState === ExpoCamera.Constants.Type.back) {
        return ExpoCamera.Constants.Type.front;
      } else {
        return ExpoCamera.Constants.Type.back;
      }
    });
  };

  return (
    <View style={styles.container}>
      <ExpoCamera
        style={[
          styles.camera,
          {
            aspectRatio: selectedRatioInt[1] / selectedRatioInt[0],
          },
        ]}
        type={type}
        ref={onRefChange}
        ratio={selectedRatio}
        onCameraReady={onCameraReady}>
        <View style={styles.cameraActionContainer}>
          <View>
            <Text style={styles.ratioButton} onPress={onRatioButtonClick}>
              RATIO
            </Text>
            <View
              style={[
                styles.ratioSelector,
                // eslint-disable-next-line react-native/no-inline-styles
                {display: showRatioSelector ? 'flex' : 'none'},
              ]}>
              {showRatios()}
            </View>
          </View>
        </View>
      </ExpoCamera>

      <View
        style={[styles.cameraActionContainer, styles.bottomActionContainer]}>
        <View style={{display: paused ? 'none' : 'flex'}}>
          <TouchableWithoutFeedback onPress={snap}>
            <View style={styles.snapButtonOuter}>
              <View style={styles.snapButtonInner} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{display: paused ? 'flex' : 'none'}}>
          <TouchableWithoutFeedback onPress={cancel}>
            <View style={[styles.snapButtonOuter, styles.cancelButtonOuter]}>
              <Text style={styles.cancelButtonText}>&times;</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.swapButtonContainer}>
          <TouchableWithoutFeedback onPress={onSwitchClick}>
            <View style={styles.swapButtonOuter}>
              <Image
                source={require('./swap.png')}
                style={styles.swapButtonIcon}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default Camera;
