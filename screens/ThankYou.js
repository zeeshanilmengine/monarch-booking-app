import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';

const ThankYou = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text variant="titleLarge" style={styles.message}>Thank you for your booking!</Text>
      <Text style={styles.subText}>We’ve received your request and will be in touch shortly.</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('StepOne')}
        buttonColor="#1976D2"
      >
        Make Another Booking
      </Button>
    </View>
  );
};

export default ThankYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 250,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  message: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    marginBottom: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
});
