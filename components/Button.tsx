import React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
} from 'react-native';
import {CommonComponentProps} from '../types';

type ButtonProps = CommonComponentProps & {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  underlayColor?: ColorValue;
  onPress?: () => void;
};

const buttonStyle = StyleSheet.create({
  touchable: {
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#ffd166',
    borderColor: '#ffd166',
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
});

const Button: React.FC<ButtonProps> = ({
  title,
  style = {},
  titleStyle = {},
  underlayColor = '#ffc300',
  onPress = () => {},
}) => {
  return (
    <TouchableHighlight
      style={[buttonStyle.touchable, style]}
      underlayColor={underlayColor}
      onPress={onPress}>
      <Text style={[buttonStyle.text, titleStyle]}>{title}</Text>
    </TouchableHighlight>
  );
};

export default Button;
