import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ListItem, Image, SearchBar, Button } from 'react-native-elements';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';

const Recipes = ({ colors }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchResult, setSearchResult] = useState('');

    const { recipes, addRecipe } = useContext(AppContext);

    const navigation = useNavigation();
    const myColors = colors;

    const fetchData = useCallback(() => {
        const apiUrl = 'https://fitness-api-boeev-emir-399322ec1a53.herokuapp.com/recipes';
        setLoading(true);
        fetch(apiUrl)
            .then(response => response.json())
            .then(resultData => {
                setData(resultData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    useFocusEffect(fetchData);

    const filteredData = data ? data.filter(recipe => recipe.recipeName.toLowerCase().includes(searchResult.toLowerCase())) : [];

    const handleRecipe = (recipeId) => {
        const isAdded = recipes.some((recipe) => recipe.id === recipeId);
        if (!isAdded) {
            const recipeToAdd = data.find((recipe) => recipe.id === recipeId);
            addRecipe({ ...recipeToAdd, isAdded: true });
        }

        console.log(recipes);
    };

    return (
        <View style={{ flex: 1, textAlignVertical: 'middle' }}>
            {loading ? (
                <Text style={{ color: myColors.text }}>Loading...</Text>
            ) : (
                <>
                    <SearchBar
                        placeholder="Search by recipe name..."
                        onChangeText={setSearchResult}
                        value={searchResult}
                        containerStyle={{ backgroundColor: myColors.background }}
                        inputContainerStyle={{ backgroundColor: myColors.background }}
                        inputStyle={{ color: myColors.text, backgroundColor: myColors.background, paddingLeft: 10, paddingRight: 10 }}
                    />
                    <FlatList
                        data={filteredData}
                        keyExtractor={(recipe) => recipe.id.toString()}
                        renderItem={({ item: recipe }) => {
                            const isAdded = recipes.some((r) => r.id === recipe.id);
                            return (
                                <View>
                                    <ListItem
                                        containerStyle={{ backgroundColor: myColors.background, borderColor: myColors.border }}
                                        bottomDivider
                                        onPress={() => { navigation.navigate('Recipe', { recipe }); }}
                                    >
                                        <Image source={require("../assets/fork-knife.jpg")} style={{ width: 50, height: 50 }} />
                                        <ListItem.Content style={{ backgroundColor: myColors.background }}>
                                            <ListItem.Title style={{ color: myColors.text, fontWeight: "bold" }}>
                                                {`${recipe.recipeName.charAt(0).toUpperCase() + recipe.recipeName.slice(1)}`}
                                            </ListItem.Title>
                                            <ListItem.Subtitle style={{ color: myColors.text }}>
                                                {`Obtained calories: ${recipe.totalKiloCalories} kCal/Serving`}
                                            </ListItem.Subtitle>
                                        </ListItem.Content>
                                        <Button
                                            title="Add"
                                            buttonStyle={{
                                                backgroundColor: isAdded ? myColors.disabledButtonBackground : myColors.buttonBackground
                                            }}
                                            titleStyle={{ color: isAdded ? myColors.disabledButtonText : myColors.buttonText }}
                                            disabled={isAdded}
                                            onPress={() => handleRecipe(recipe.id)}
                                        />
                                        <ListItem.Chevron />
                                    </ListItem>
                                </View>
                            );
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Add your own recipe"
                            onPress={() => navigation.navigate('New recipe')}
                            buttonStyle={{
                               backgroundColor: myColors.buttonBackground
                            }}
                            titleStyle={{color: myColors.buttonText}}
                        />
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    buttonStyle: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonTitle: {
        fontSize: 16,
        color: '#fff',
    },
});

export default Recipes;