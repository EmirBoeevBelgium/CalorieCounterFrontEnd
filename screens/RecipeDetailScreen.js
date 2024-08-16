import React from 'react';
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