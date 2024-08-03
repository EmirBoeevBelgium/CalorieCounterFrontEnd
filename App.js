import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigator from './config/Navigator';
import { AppContext } from './context/AppContext';


export default function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  /*const addFavoriteSong = (song) => {
    setFavoriteSongs((prevFavorites) => [...prevFavorites, song]);
  };

  const removeFavoriteSong = (songId) => {
    setFavoriteSongs((prevFavorites) => prevFavorites.filter((song) => song.id !== songId));
  };*/

  const appContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme,
      favoriteSongs,
      //addFavoriteSong,
      //removeFavoriteSong,
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
