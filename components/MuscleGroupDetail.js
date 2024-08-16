import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

const MuscleGroupDetail = ({ route, colors }) => {
    const { muscleGroup } = route.params;
    const myColors = colors;

   


    return (
        <View style={styles.container}>
            <Text style={[styles.titleText, { color: myColors.text }]}>
                Name: {muscleGroup.muscleGroupName}
            </Text>

            <Text style={[{marginTop: 10}, { color: myColors.text }, {fontSize: 20}]}>
                Description:
            </Text>
            <Text style={[{marginTop: 10}, { color: myColors.text }, {fontSize: 15}]}>
                { muscleGroup.muscleGroupDescription }
            </Text>
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

export default MuscleGroupDetail;