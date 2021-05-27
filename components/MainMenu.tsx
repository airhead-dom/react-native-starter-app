import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './Button';
import {CommonComponentProps} from '../types';
import {useNavigation} from '@react-navigation/native';

type MainMenuProps = CommonComponentProps & {};

const MainMenu: React.FC<MainMenuProps> = ({style = {}}) => {
  const navigation = useNavigation();

  const onNavClick = (destination: string) => {
    navigation.navigate(destination);
  };

  return (
    <View style={[mainMenuStyle.view, style]}>
      <Button title={'Todo'} onPress={() => onNavClick('Todo')} />
      <Button title={'Animation'} onPress={() => onNavClick('Animation')} />
      <Button
        title={'Camera'}
        style={mainMenuStyle.cameraBtnStyle}
        onPress={() => onNavClick('Camera')}
      />
    </View>
  );
};

export default MainMenu;

const mainMenuStyle = StyleSheet.create({
  view: {
    width: '80%',
    padding: 30,
  },
  cameraBtnStyle: {
    backgroundColor: '#ffc300',
  },
});
