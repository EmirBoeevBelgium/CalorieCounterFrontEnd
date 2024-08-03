import React from 'react';
import { StyleSheet } from 'react-native';
import Settings from '../components/Settings';
import { useTheme } from '@react-navigation/native';

const SettingsScreen = () => {
  const { colors } = useTheme();

    return (
    <Settings colors={colors}/>
  );
}

const styles = StyleSheet.create({
  body: {
      width: "100%"
  }
});

export default SettingsScreen;