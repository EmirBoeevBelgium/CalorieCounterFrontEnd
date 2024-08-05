import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import muscleGroupImages from './MuscleGroupImages';

const WorkoutDetail = ({ route, colors }) => {
    const { workout } = route.params;
    const myColors = colors;

    const navigation = useNavigation();
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMuscleGroups = async () => {
            try {
                if (workout.workoutMuscleGroupIds.length === 0) {
                    throw new Error('No muscle group IDs provided.');
                }

                const requests = workout.workoutMuscleGroupIds.map(id =>
                    fetch(`https://fitness-api-boeev-emir-399322ec1a53.herokuapp.com/musclegroups/id?id=${id}`)
                        .then(response => response.json())
                        .then(data => data)
                        .catch(error => {
                            console.error(`Error fetching muscle group with ID ${id}:`, error);
                            return null;
                        })
                );

                const results = await Promise.all(requests);

                console.log('All fetched results:', results);

                setMuscleGroups(results.filter(Boolean)); // Filter out null values
            } catch (error) {
                console.error('Error fetching muscle groups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMuscleGroups();
    }, [workout.workoutMuscleGroupIds]);

    if (loading) {
        return <Text style={{ color: myColors.text }}>Loading...</Text>;
    }

    console.log(muscleGroups);

    return (
        <View style={styles.container}>
            <Text style={[styles.titleText, { color: myColors.text }]}>
                Name: {workout.workoutName}
            </Text>
            <Text style={[styles.calorieText, { color: myColors.text }]}>
                Total burned kCal: {workout.burnedKiloCaloriesPHour}
            </Text>

            <Text style={[{ marginTop: 10 }, { color: myColors.text }, { fontSize: 20 }]}>
                This workout targets the following muscle groups:
            </Text>
            <FlatList
                data={muscleGroups}
                keyExtractor={(muscleGroup) => muscleGroup.id.toString()}
                renderItem={({ item: muscleGroup }) => (
                    <ListItem
                        containerStyle={{ backgroundColor: myColors.background, borderColor: myColors.border }}
                        bottomDivider
                        onPress={() => { navigation.navigate('MuscleGroup', { muscleGroup }); }}
                    >
                        <Image
                            source={muscleGroupImages[muscleGroup.muscleGroupName]}
                            style={{ width: 50, height: 50 }}
                        />
                        <ListItem.Content style={{ backgroundColor: myColors.background }}>
                            <ListItem.Title style={{ color: myColors.text, fontSize: 15 }}>
                                {muscleGroup.muscleGroupName}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
        marginLeft: 15,
        marginTop: 4
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    calorieText: {
        fontSize: 20
    },
});

export default WorkoutDetail;