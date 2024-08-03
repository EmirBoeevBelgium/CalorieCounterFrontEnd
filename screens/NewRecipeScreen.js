import React from 'react';
import { ScrollView, View, StyleSheet, Button, Text } from 'react-native';
import NewRecipe from '../components/NewRecipe';
import { useTheme } from '@react-navigation/native';


const NewRecipeScreen = () => {

  const { colors } = useTheme();

    return (
    <NewRecipe colors={colors}/>
  );
}

const styles = StyleSheet.create({
  body: {
      width: "100%"
  }
});

export default NewRecipeScreen;
