/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';

import PokemonScreen from './screen/PokemonScreen';
// import PokemonNavigator from './navigation/PokemonNavigator';
import PokemonDetailScreen from './screen/PokemonDetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
        <Stack.Screen name="Detailscreen" component={PokemonDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
