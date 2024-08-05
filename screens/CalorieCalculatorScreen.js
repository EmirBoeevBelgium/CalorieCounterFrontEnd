import React from 'react';
import { ScrollView, View, StyleSheet, Button, Text } from 'react-native';
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