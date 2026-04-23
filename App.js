import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

import StepOne from './screens/StepOne';
import StepTwo from './screens/StepTwo';
import ThankYou from './screens/ThankYou';

const Stack = createNativeStackNavigator();

// Custom theme (blue and white)
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976D2',
    onPrimary: '#ffffff',
    background: '#131f61ff',
    surface: '#ffffffff',
    text: '#000000',
    placeholder: '#777',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StepOne">
          <Stack.Screen name="StepOne" component={StepOne} options={{ title: 'Booking Details' }} />
          <Stack.Screen name="StepTwo" component={StepTwo} options={{ title: 'Your Info' }} />
          <Stack.Screen name="ThankYou" component={ThankYou} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
