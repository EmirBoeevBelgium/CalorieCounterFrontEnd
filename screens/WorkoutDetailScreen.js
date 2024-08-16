import React from 'react';
import WorkoutDetail from '../components/WorkoutDetail';
import { useTheme } from '@react-navigation/native';

const WorkoutDetailScreen = ({route}) => {
    const { colors } = useTheme();
    const myRoute = route
    return (
        <WorkoutDetail colors={colors} route={myRoute}/>
    )
}

export default WorkoutDetailScreen