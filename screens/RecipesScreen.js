import React from 'react';
import { ScrollView, View, StyleSheet, Button, Text } from 'react-native';
import Recipes from '../components/Recipes';
import { useTheme } from '@react-navigation/native';


const RecipesScreen = () => {

  const { colors } = useTheme();

    return (
    <Recipes colors={colors}/>
  );
}

const styles = StyleSheet.create({
  body: {
      width: "100%"
  }
});

export default RecipesScreen;
