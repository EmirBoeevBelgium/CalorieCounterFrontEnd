import React from 'react';
import { ScrollView, View, StyleSheet, Button, Text } from 'react-native';
import RecipeDetail from '../components/RecipeDetail';
import { useTheme } from '@react-navigation/native';

const RecipeDetailScreen = ({route}) => {
    const { colors } = useTheme();
    const myRoute = route
    return (
        <RecipeDetail colors={colors} route={myRoute}/>
    )
}

export default RecipeDetailScreen