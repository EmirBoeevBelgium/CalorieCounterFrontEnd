import React from 'react';
import MuscleGroupDetail from '../components/MuscleGroupDetail';
import { useTheme } from '@react-navigation/native';

const MuscleGroupDetailScreen = ({route}) => {
    const { colors } = useTheme();
    const myRoute = route
    return (
        <MuscleGroupDetail colors={colors} route={myRoute}/>
    )
}

export default MuscleGroupDetailScreen