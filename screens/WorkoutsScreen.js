import React from 'react';
import { useTheme } from '@react-navigation/native';
import Workouts from '../components/Workouts';

const WorkoutsScreen = () => {
  const { colors } = useTheme();

    return (
    <Workouts colors={colors}/>
  );
}


export default WorkoutsScreen;