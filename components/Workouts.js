import React, { useState, useEffect, useContext } from 'react';
import { ListItem, Image, SearchBar, Button } from 'react-native-elements';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';

const Workouts = ({ colors }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchResult, setSearchResult] = useState('');

    const { workouts, addWorkout } = useContext(AppContext);

    const navigation = useNavigation();
    const myColors = colors;

    useEffect(() => {
        const apiUrl = 'https://fitness-api-boeev-emir-399322ec1a53.herokuapp.com/workouts';
    
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

    const filteredData = data ? data.filter(workout => workout.workoutName.toLowerCase().includes(searchResult.toLowerCase())) : [];

    const handleWorkout = (workoutId) => {
        const isAdded = workouts.some((workout) => workout.id === workoutId);
        if (!isAdded) {
            const workoutToAdd = data.find((workout) => workout.id === workoutId);
            addWorkout({ ...workoutToAdd, isAdded: true });
        }
        console.log(workouts);
    };

    return (
        <View style={{ flex: 1, textAlignVertical: 'middle' }}>
            {loading ? (
                <Text style={{ color: myColors.text }}>Loading...</Text>
            ) : (
                <>
                    <SearchBar
                        placeholder="Search by name..."
                        onChangeText={setSearchResult}
                        value={searchResult}
                        containerStyle={{ backgroundColor: myColors.background }}
                        inputContainerStyle={{ backgroundColor: myColors.background }}
                        inputStyle={{ color: myColors.text, backgroundColor: myColors.background, paddingLeft: 10, paddingRight: 10 }}
                    />
                    <FlatList
                        data={filteredData}
                        keyExtractor={(workout) => workout.id.toString()}
                        renderItem={({ item: workout }) => {
                            const isAdded = workouts.some((w) => w.id === workout.id);
                            return (
                                <ListItem
                                    containerStyle={{ backgroundColor: myColors.background, borderColor: myColors.border }}
                                    bottomDivider
                                    onPress={() => { navigation.navigate('Workout', { workout }); }}
                                >
                                    <Image source={require("../assets/dumbell.jpg")} style={{ width: 50, height: 50 }} />
                                    <ListItem.Content>
                                        <ListItem.Title style={{ color: myColors.text, fontWeight: "bold" }}>
                                            {`${workout.workoutName.substring(0, 1).toUpperCase() + workout.workoutName.substring(1)}`}
                                        </ListItem.Title>
                                        <ListItem.Title style={{ color: myColors.text }}>
                                            {`Burned calories: ${workout.burnedKiloCaloriesPHour} kCal/H`}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <Button
                                        title="Add"
                                        buttonStyle={{
                                            backgroundColor: isAdded ? myColors.disabledButtonBackground : myColors.buttonBackground
                                        }}
                                        titleStyle={{ color: isAdded ? myColors.disabledButtonText : myColors.buttonText }}
                                        disabled={isAdded}
                                        onPress={() => handleWorkout(workout.id)}
                                    />
                                    <ListItem.Chevron />
                                </ListItem>
                            );
                        }}
                    />
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

export default Workouts;
