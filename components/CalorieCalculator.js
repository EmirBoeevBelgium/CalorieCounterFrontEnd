import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppContext } from '../context/AppContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const CalorieCalculator = ({ colors }) => {
    const myColors = colors;
    const { recipes, workouts, isConsumedCalsVisible, isBurnedCalsVisible, removeRecipe, removeWorkout } = useContext(AppContext);
    const [servings, setServings] = useState({});
    const [hours, setHours] = useState({});

    const handleServingsChange = (recipeId, value) => {
        setServings({ ...servings, [recipeId]: parseFloat(value) || 0 });
    };

    const handleHoursChange = (workoutId, value) => {
        setHours({ ...hours, [workoutId]: parseFloat(value) || 0 });
    };

    const calculateTotalCalories = () => {
        return recipes.reduce((total, recipe) => {
            const servingCount = servings[recipe.id] || 0;
            return total + (recipe.totalKiloCalories * servingCount);
        }, 0);
    };

    const calculateTotalBurnedCalories = () => {
        return workouts.reduce((total, workout) => {
            const hourCount = hours[workout.id] || 0;
            return total + (workout.burnedKiloCaloriesPHour * hourCount);
        }, 0);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.sectionTitle, { color: myColors.text }]}>Added recipes</Text>
            <View style={styles.sectionDivider} />
            {recipes.length === 0 ? (
                <Text style={[styles.noItemsText, { color: myColors.text }]}>No recipes added</Text>
            ) : (
                recipes.map((recipe) => (
                    <View key={recipe.id} style={[styles.itemContainer, { borderColor: myColors.borderColor }]}>
                        <View style={styles.itemRow}>
                            <Text style={[styles.itemText, { color: myColors.text }]} numberOfLines={1}>
                                {recipe.recipeName}
                            </Text>
                            <TouchableOpacity onPress={() => removeRecipe(recipe.id)} style={styles.removeButton}>
                                <Icon name="trash" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={[styles.input, { borderColor: myColors.borderColor }]}
                            placeholder="Servings"
                            placeholderTextColor={myColors.placeholder}
                            keyboardType="numeric"
                            onChangeText={(value) => handleServingsChange(recipe.id, value)}
                        />
                        <Text style={[styles.calorieText, { color: myColors.text }]}>
                            {`Calories: ${(recipe.totalKiloCalories * (servings[recipe.id] || 0)).toFixed(2)} kCal`}
                        </Text>
                    </View>
                ))
            )}

            <Text style={[styles.sectionTitle, { color: myColors.text }]}>Added workouts</Text>
            <View style={styles.sectionDivider} />
            {workouts.length === 0 ? (
                <Text style={[styles.noItemsText, { color: myColors.text }]}>No workouts added</Text>
            ) : (
                workouts.map((workout) => (
                    <View key={workout.id} style={[styles.itemContainer, { borderColor: myColors.borderColor }]}>
                        <View style={styles.itemRow}>
                            <Text style={[styles.itemText, { color: myColors.text }]} numberOfLines={1}>
                                {workout.workoutName}
                            </Text>
                            <TouchableOpacity onPress={() => removeWorkout(workout.id)} style={styles.removeButton}>
                                <Icon name="trash" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={[styles.input, { borderColor: myColors.borderColor }]}
                            placeholder="Hours"
                            placeholderTextColor={myColors.placeholder}
                            keyboardType="numeric"
                            onChangeText={(value) => handleHoursChange(workout.id, value)}
                        />
                        <Text style={[styles.calorieText, { color: myColors.text }]}>
                            {`Burned Calories: ${(workout.burnedKiloCaloriesPHour * (hours[workout.id] || 0)).toFixed(2)} kCal`}
                        </Text>
                    </View>
                ))
            )}

            <View style={styles.totalContainer}>
                {isConsumedCalsVisible && (
                    <Text style={[styles.totalText, { color: myColors.text }]}>
                        {`Total eaten calories: ${calculateTotalCalories().toFixed(2)} kCal`}
                    </Text>
                )}
                {isBurnedCalsVisible && (
                    <Text style={[styles.totalText, { color: myColors.text }]}>
                        {`Total burned calories: ${calculateTotalBurnedCalories().toFixed(2)} kCal`}
                    </Text>
                )}
                <Text style={[styles.totalText, { color: myColors.text }]}>
                    {`Net calories: ${(calculateTotalCalories() - calculateTotalBurnedCalories()).toFixed(2)} kCal`}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    sectionDivider: {
        height: 1,
        backgroundColor: '#ddd',
        marginBottom: 16,
    },
    noItemsText: {
        fontSize: 18,
        color: '#888', // Adjust color if needed
        textAlign: 'center',
        marginVertical: 20,
    },
    itemContainer: {
        marginBottom: 20,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'column',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemText: {
        fontSize: 18,
        flex: 1,
        marginRight: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 8,
        backgroundColor: 'white',
    },
    calorieText: {
        fontSize: 16,
    },
    totalContainer: {
        marginTop: 20,
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    removeButton: {
        backgroundColor: '#eb4034',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CalorieCalculator;
