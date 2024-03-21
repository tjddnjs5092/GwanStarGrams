import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AppNavigator from '@/navigator/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        <StatusBar />
        <AppNavigator className="flex-1 bg-black" />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
