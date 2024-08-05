import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const NewRecipe = ({ colors }) => {
    const [recipeName, setRecipeName] = useState('');
    const [totalKiloCalories, setTotalKiloCalories] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
    const [instructions, setInstructions] = useState(['']);

    const myColors = colors;
    const navigation = useNavigation();

    const handleAddRecipe = async () => {
        const recipeData = {
            recipeName,
            recipeInstructions: instructions.map((instruction, index) => ({
                instruction,
                step: index + 1
            })),
            recipeIngredients: ingredients.map(ingredient => ({
                ingredientName: ingredient.name,
                ingredientAmount: ingredient.amount
            })),
            totalKiloCalories: parseInt(totalKiloCalories, 10) || 0
        };

        try {
            const response = await fetch('https://fitness-api-boeev-emir-399322ec1a53.herokuapp.com/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Recipe added successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: '' }]);
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = ingredients.map((ingredient, i) => {
            if (i === index) {
                return { ...ingredient, [field]: value };
            }
            return ingredient;
        });
        setIngredients(newIngredients);
    };

    const handleAddInstruction = () => {
        setInstructions([...instructions, '']);
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = instructions.map((instruction, i) => {
            if (i === index) {
                return value;
            }
            return instruction;
        });
        setInstructions(newInstructions);
    };

    const handleDeleteIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleDeleteInstruction = (index) => {
        setInstructions(instructions.filter((_, i) => i !== index));
    };

    return (
        <ScrollView style={[styles.body, { backgroundColor: myColors.background }]}>
            <TextInput
                style={[styles.input, {backgroundColor: 'white', color: 'black'}]}
                placeholder="Recipe Name"
                value={recipeName}
                onChangeText={setRecipeName}
            />
            <TextInput
                style={[styles.input, {backgroundColor: 'white', color: 'black'}]}
                placeholder="Total kCal"
                keyboardType="numeric"
                value={totalKiloCalories}
                onChangeText={setTotalKiloCalories}
            />
            <Text style={[styles.label, { color: myColors.text }]}>Ingredients:</Text>
            {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingrInstrContainer}>
                    <TextInput
                        style={[styles.ingredientInput]}
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        onChangeText={(text) => handleIngredientChange(index, 'name', text)}
                    />
                    <TextInput
                        style={[styles.ingredientInput]}
                        placeholder="Ingredient amount"
                        value={ingredient.amount}
                        onChangeText={(text) => handleIngredientChange(index, 'amount', text)}
                    />
                    <TouchableOpacity onPress={() => handleDeleteIngredient(index)} style={styles.deleteButton}>
                        <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
                <Icon name="plus" size={20} color={myColors.text} />
                <Text style={{ color: myColors.text, marginLeft: 10 }}>Add Ingredient</Text>
            </TouchableOpacity>
            <Text style={[styles.label, { color: myColors.text }]}>Instructions:</Text>
            {instructions.map((instruction, index) => (
                <View key={index} style={styles.ingrInstrContainer}>
                    <Text style={{ marginRight: 10, color: myColors.text }}>Step {index + 1}</Text>
                    <TextInput
                        style={[styles.instructionInput]}
                        placeholder="Instruction"
                        value={instruction}
                        onChangeText={(text) => handleInstructionChange(index, text)}
                        multiline={true}
                    />
                    <TouchableOpacity onPress={() => handleDeleteInstruction(index)} style={styles.deleteButton}>
                        <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={handleAddInstruction}>
                <Icon name="plus" size={20} color={myColors.text} />
                <Text style={{ color: myColors.text, marginLeft: 10 }}>Add Instruction</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Save" 
                    onPress={handleAddRecipe} 
                    buttonStyle={{
                        backgroundColor: myColors.buttonBackground
                    }}
                    titleStyle={{ color:  myColors.buttonText }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        height: 40,

    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    ingrInstrContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ingredientInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        height: 40,
        backgroundColor: 'white'
    },
    instructionInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        height: 80,
        backgroundColor: 'white'
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    deleteButton: {
        marginLeft: 10,
        padding: 5,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default NewRecipe;