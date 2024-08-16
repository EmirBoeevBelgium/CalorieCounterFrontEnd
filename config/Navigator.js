import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RecipesScreen from '../screens/RecipesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LightTheme from '../themes/LightTheme';
import DarkTheme from '../themes/DarkTheme';
import { AppContext } from '../context/AppContext';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
import MuscleGroupDetailScreen from '../screens/MuscleGroupDetailScreen';
import NewRecipeScreen from '../screens/NewRecipeScreen';
import CalorieCalculatorScreen from '../screens/CalorieCalculatorScreen';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

const RecipesScr = () => (
    <Stack.Navigator>
      <Stack.Screen name="Recipes" component={RecipesScreen} />
      <Stack.Screen name="Recipe" component={RecipeDetailScreen} />
      <Stack.Screen name="New recipe" component={NewRecipeScreen} />
    </Stack.Navigator>
  );
  const WorkoutsScr = () => (
    <Stack.Navigator>
      <Stack.Screen name="Workouts" component={WorkoutsScreen} />
      <Stack.Screen name="Workout" component={WorkoutDetailScreen} />
      <Stack.Screen name="MuscleGroup" component={MuscleGroupDetailScreen} />
    </Stack.Navigator>
  );

  const CalorieCalculatorScr = () => (
    <Stack.Navigator>
      <Stack.Screen name='Calorie calculator' component={CalorieCalculatorScreen}/>
    </Stack.Navigator>
  );

  const SettingsScr = () => (
    <Stack.Navigator>
      <Stack.Screen name='Settings' component={SettingsScreen}/>
    </Stack.Navigator>
  );

  

  const Navigator = () => {
   
      const { isDarkTheme, setIsDarkTheme, recipes, addRecipe, removeRecipe, workouts, addWorkout, removeWorkout, isConsumedCalsVisible,
        setIsConsumedCalsVisible,
        isBurnedCalsVisible,
        setIsBurnedCalsVisible } = useContext(AppContext);

    return (
      <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
        <AppContext.Provider value={{ isDarkTheme, setIsDarkTheme, recipes, addRecipe, removeRecipe, workouts, addWorkout, removeWorkout,  isConsumedCalsVisible,
            setIsConsumedCalsVisible,
            isBurnedCalsVisible,
            setIsBurnedCalsVisible}}>
        <Tab.Navigator screenOptions={{ headerShown: false}}>
          <Tab.Screen name='Recipes' component={RecipesScr}/>
          <Tab.Screen name='Workouts' component={WorkoutsScr}/>
          <Tab.Screen name='Calculator' component={CalorieCalculatorScr}/>
          <Tab.Screen name="Settings" component={SettingsScr}/>
        </Tab.Navigator>
        </AppContext.Provider>
      </NavigationContainer>
     
    );
}

export default Navigator;