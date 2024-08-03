import React from 'react';
import { ScrollView, View, StyleSheet, Button, Text } from 'react-native';
import MuscleGroups from '../components/MuscleGroups';
import { useTheme } from '@react-navigation/native';


const MuscleGroupsScreen = () => {

  const { colors } = useTheme();

    return (
    <MuscleGroups colors={colors}/>
  );
}

const styles = StyleSheet.create({
  body: {
      width: "100%"
  }
});

export default MuscleGroupsScreen;
