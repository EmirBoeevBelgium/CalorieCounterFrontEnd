import React, { useState, useEffect, useContext } from 'react';
import { ListItem, Image, SearchBar } from 'react-native-elements';
import { FlatList, ScrollView, Text, View, StyleSheet, TouchableOpacity, SectionList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';



const RecipeDetail = ({route, colors}) => {

    const { recipe } = route.params
    const myColors = colors
    const navigation = useNavigation();

    const sortedInstructions = [...recipe.recipeInstructions].sort((a, b) => a.step - b.step);

    const recipeData = [
        {
          title: 'Ingredients',
          data: recipe.recipeIngredients,
        },
        {
          title: 'Instructions',
          data: sortedInstructions,
        }
      ];


    return (
        <View style={styles.body}>
        <Text style={[styles.titleText, { color: myColors.text }]}>Recipe: {recipe.recipeName}</Text>
        <Text style={[styles.calorieText, { color: myColors.text }]}>Total obtained kCal: {recipe.totalKiloCalories}</Text>
        <SectionList
        style={{marginTop: 20}}
        sections={recipeData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, section }) => {
          if (section.title === 'Ingredients') {
            return (
              <View style={{marginTop: 10}}>
                <Text style={{color: myColors.text}}>{item.ingredientAmount} {item.ingredientName}</Text>
              </View>
            );
          } else {
            return (
              <View style={{marginTop: 10}}>
                <Text style={[{color: myColors.text}, {textDecorationLine: 'underline'}]}>Step {item.step}</Text>
                <Text style={{color: myColors.text}}>{item.instruction}</Text>
              </View>
            );
          }
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ color: myColors.text, fontWeight: "bold", fontSize: 18, marginTop: 20}}>{title}</Text>
        )}
      />
        </View>
        
    )
}

const styles = StyleSheet.create({
    titleText: {
      fontSize: 30,
      fontWeight: 'bold'
    },
    calorieText: {
      fontSize: 20
    },
    body: {
        marginBottom: 40, 
      marginLeft: 15,
      marginTop: 4
    }
  });

export default RecipeDetail