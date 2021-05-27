import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainMenu from '../components/MainMenu';
import {CommonComponentProps} from '../types';
import {StackScreenProps} from '@react-navigation/stack';

type HomeScreenNavigationProp = StackScreenProps<any, 'Home'>;

type HomeScreenProps = CommonComponentProps & HomeScreenNavigationProp & {};

const homeScreenStyle = StyleSheet.create({
  view: {
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
});

const HomeScreen: React.FC<HomeScreenProps> = ({style = {}, navigation}) => {
  return (
    <View style={[homeScreenStyle.view, style]}>
      <Text style={homeScreenStyle.title}>React Native Starter</Text>

      <MainMenu />
    </View>
  );
};

export default HomeScreen;
