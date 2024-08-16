import React from 'react';
import CalorieCalculator from '../components/CalorieCalculator';
import { useTheme } from '@react-navigation/native';

const CalorieCalculatorScreen = ({route}) => {
    const { colors } = useTheme();
    const myRoute = route
    return (
        <CalorieCalculator colors={colors} route={myRoute}/>
    )
}

export default CalorieCalculatorScreen