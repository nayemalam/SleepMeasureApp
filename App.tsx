import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import MainStackNavigator from './src/navigation/MainStackNavigator';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
