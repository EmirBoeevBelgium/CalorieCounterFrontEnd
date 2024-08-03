import React from "react";
import { View, Text, Switch , StyleSheet} from "react-native";
import { AppContext } from "../context/AppContext";

const Settings = ({colors}) => {
    
    const myColors  = colors;
    const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);

    const toggleSwitch = () => {
        setIsDarkTheme(currentState => !currentState);
    };
    return (
        <View style={styles.container}>
            <Text style={{color: myColors.text, ...styles.text, fontWeight: "bold"}}>Change theme</Text>
            <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isDarkTheme ? '#19fa05' : '#eb4034'} 
            onValueChange={toggleSwitch} value={isDarkTheme}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 20
    },
    text: {
      marginRight: 10,
      fontSize: 16,
    }
  });

export default Settings