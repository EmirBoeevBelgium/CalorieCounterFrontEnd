import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

const Settings = ({ colors }) => {
    const myColors = colors;
    const {
        isDarkTheme, setIsDarkTheme,
        isConsumedCalsVisible, setIsConsumedCalsVisible,
        isBurnedCalsVisible, setIsBurnedCalsVisible
    } = React.useContext(AppContext);

    const toggleThemeSwitch = () => {
        setIsDarkTheme(currentState => !currentState);
    };

    const toggleConsumedCalsSwitch = () => {
        setIsConsumedCalsVisible(currentState => !currentState);
    };

    const toggleBurnedCalsSwitch = () => {
        setIsBurnedCalsVisible(currentState => !currentState);
    };

    return (
        <View style={styles.container}>
            <View style={styles.settingRow}>
                <Text style={[styles.text, { color: myColors.text }]}>Change Theme</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDarkTheme ? '#19fa05' : '#eb4034'}
                    onValueChange={toggleThemeSwitch}
                    value={isDarkTheme}
                />
            </View>

            <View style={styles.settingRow}>
                <Text style={[styles.text, { color: myColors.text }]}>Show Consumed Calories</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isConsumedCalsVisible ? '#19fa05' : '#eb4034'}
                    onValueChange={toggleConsumedCalsSwitch}
                    value={isConsumedCalsVisible}
                />
            </View>

            <View style={styles.settingRow}>
                <Text style={[styles.text, { color: myColors.text }]}>Show Burned Calories</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isBurnedCalsVisible ? '#19fa05' : '#eb4034'}
                    onValueChange={toggleBurnedCalsSwitch}
                    value={isBurnedCalsVisible}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        marginRight: 10,
    },
});

export default Settings;
