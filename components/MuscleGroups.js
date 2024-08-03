import React, { useState, useEffect } from 'react';
import { ListItem, Image, SearchBar } from 'react-native-elements';
import { FlatList, ScrollView, Text, View, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';



const MuscleGroups = ({colors}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [searchResult, setSearchResult] = useState('');


    const muscleGroupImages = {
        "Abdominals": require("../assets/Abdominals.jpg"),
        "Biceps": require("../assets/Biceps.jpg"),
        "Calves": require("../assets/Calves.jpg"),
        "Deltoids": require("../assets/Deltoids.jpg"),
        "Wrist flexors": require("../assets/Flexors.jpg"),
        "Hamstrings": require("../assets/Hamstrings.jpg"),
        "Heart": require("../assets/Heart.jpg"),
        "Lats": require("../assets/Lats.jpg"),
        "Pectorals": require("../assets/Pectorals.jpg"),
        "Quadriceps": require("../assets/Quadriceps.jpg"),
        "Trapezius": require("../assets/Trapezius.jpg"),
        "Triceps": require("../assets/Triceps.jpg")
    };

    const myColors = colors
    useEffect(() => {
        const apiUrl = 'https://fitness-api-boeev-emir-399322ec1a53.herokuapp.com/musclegroups';
    
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

      const filteredData = data ? data.filter(musclegroup => musclegroup.muscleGroupName.toLowerCase().includes(searchResult.toLowerCase())) : [];

      return (
        <View style={{ flex: 1, textAlignVertical: 'middle' }}>
      {loading ? (
        <Text style={{ color: myColors.text }}>Loading...</Text>
      ) : (
        <>
          <SearchBar
            placeholder="Search by muscle group name..."
            onChangeText={setSearchResult}
            value={searchResult}
            containerStyle={{backgroundColor: myColors.background}}
            inputContainerStyle={{backgroundColor: myColors.background}}
            inputStyle={{ color: myColors.text, backgroundColor: myColors.background, paddingLeft: 10, paddingRight: 10}}
          />
          <FlatList
            data={filteredData}
            keyExtractor={(muscleGroup) => muscleGroup.id.toString()}
            renderItem={({ item: muscleGroup }) => (
              <View>
                <ListItem
                  containerStyle={{ backgroundColor: myColors.background, borderColor: myColors.border }}
                  bottomDivider
                  onPress={() => {navigation.navigate('MuscleGroup', { muscleGroup });}}
                >
                  <Image
                            source={muscleGroupImages[muscleGroup.muscleGroupName]}
                            style={{ width: 50, height: 50 }}
                        />
                  <ListItem.Content style={{ backgroundColor: myColors.background}}>
                    <ListItem.Title style={{ color: myColors.text, fontWeight: "bold" }}>
                      {`${muscleGroup.muscleGroupName.substring(0,1).toUpperCase() + muscleGroup.muscleGroupName.substring(1)}`}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </View>
            )}
          />
        </>
      )}
    </View>
      );
}

export default MuscleGroups