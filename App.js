import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigator from './config/Navigator';
import { AppContext } from './context/AppContext';


export default function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [isConsumedCalsVisible, setIsConsumedCalsVisible] = useState(true);
  const [isBurnedCalsVisible, setIsBurnedCalsVisible] = useState(true);

  const addRecipe = (recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, recipe]);
  };

  const removeRecipe = (recipeId) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
  };


  const addWorkout = (workout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
  };

  const removeWorkout = (workoutId) => {
    setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== workoutId));
  };

  const appContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme,
      recipes,
      addRecipe,
      removeRecipe,
      workouts,
      addWorkout,
      removeWorkout,
      isConsumedCalsVisible,
            setIsConsumedCalsVisible,
            isBurnedCalsVisible,
            setIsBurnedCalsVisible
    }
  });
  return (
    <AppContext.Provider value={appContext}>
       <Navigator myTheme={isDarkTheme} myAppContext={appContext}/>
    </AppContext.Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
