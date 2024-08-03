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
import MuscleGroupsScreen from '../screens/MuscleGroupsScreen';
import NewRecipeScreen from '../screens/NewRecipeScreen';

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

  const MuscleGroupsScr = () => (
    <Stack.Navigator>
      <Stack.Screen name="MuscleGroups" component={MuscleGroupsScreen} />
      <Stack.Screen name="MuscleGroup" component={MuscleGroupDetailScreen} />
    </Stack.Navigator>
  );
  const SettingsScr = () => (
    <Stack.Navigator>
      <Stack.Screen name='Settings' component={SettingsScreen}/>
    </Stack.Navigator>
  );

  const Navigator = () => {
   
      const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

    return (
      <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
        <AppContext.Provider value={{ isDarkTheme, setIsDarkTheme}}>
        <Tab.Navigator screenOptions={{ headerShown: false}}>
          <Tab.Screen name='Recipes' component={RecipesScr}/>
          <Tab.Screen name='Workouts' component={WorkoutsScr}/>
          <Tab.Screen name='Muscle groups' component={MuscleGroupsScr}/>
          <Tab.Screen name="Settings" component={SettingsScr}/>
        </Tab.Navigator>
        </AppContext.Provider>
      </NavigationContainer>
     
    );
}

export default Navigator;