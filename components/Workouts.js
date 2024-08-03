import React, { useState, useEffect } from 'react';
import { ListItem, Image, SearchBar } from 'react-native-elements';
import { FlatList, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



const Workouts = ({colors}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [searchResult, setSearchResult] = useState('');
    const [extraData, setExtraData] = useState(null);

    const myColors = colors
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
      }, [extraData]);

      
      const filteredData = data ? data.filter(workout => workout.workoutName.toLowerCase().includes(searchResult.toLowerCase())) : [];

      return (
        <View style={{flex: 1, textAlignVertical: 'middle'}}>
          {loading ? (
            <Text style={{color: myColors.text}}>Loading...</Text>
          ) : (
            <>
          <SearchBar
            placeholder="Search by name..."
            onChangeText={setSearchResult}
            value={searchResult}
            containerStyle={{backgroundColor: myColors.background}}
            inputContainerStyle={{backgroundColor: myColors.background}}
            inputStyle={{ color: myColors.text, backgroundColor: myColors.background, paddingLeft: 10, paddingRight: 10}}
          />
             <FlatList
              data={filteredData}
              keyExtractor={(workout) => workout.id.toString()}
              renderItem={({ item: workout }) => (
                <ListItem containerStyle={{backgroundColor: myColors.background, borderColor: myColors.border}}
                  bottomDivider
                  onPress={() => {navigation.navigate('Workout', { workout });}}
                >
                  <Image source={require("../assets/dumbell.jpg")} style={{ width: 50, height: 50 }} />
                  <ListItem.Content>
                  
                    <ListItem.Title style={{color: myColors.text}}>
                    {`${workout.workoutName.substring(0,1).toUpperCase() + workout.workoutName.substring(1)}`}</ListItem.Title>
                    <ListItem.Title style={{color: myColors.text}}>
                    {`Burned calories: ${workout.burnedKiloCaloriesPHour} kCal/H`}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              )}
              />         
              </>
          )}
          
        </View>
      );
}


const styles = StyleSheet.create({
  addArtistTouchableOpacity: {
    position: 'absolute', 
    right: 50, 
    bottom: 20
  },
  addArtistView: {
    borderRadius: 50,
    width: 50, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});
export default Workouts