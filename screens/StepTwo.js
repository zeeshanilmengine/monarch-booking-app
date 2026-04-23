import React from 'react';
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';

const contactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  message: Yup.string(),
  consent: Yup.boolean().oneOf([true], 'Consent is required'),
});

const StepTwo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookingData } = route.params;

  const handleFinalSubmit = async (values, { resetForm }) => {
  try {
    const formData = {
      // Step Two fields
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message || 'No message',
      consent: values.consent ? 'Yes' : 'No',

      // Step One fields
      bookingType: bookingData.bookingType,
      pickupAddress: bookingData.pickupAddress,
      dropoffAddress: bookingData.dropoffAddress,
      pickupDateTime: new Date(bookingData.pickupDateTime).toLocaleString(),
      dropoffDateTime: new Date(bookingData.dropoffDateTime).toLocaleString(),
      passengers: bookingData.passengers,
      vehicleType: bookingData.vehicleType,
      smallSuitcases: bookingData.smallSuitcases,
      largeSuitcases: bookingData.largeSuitcases,
    };

    const response = await fetch('https://formspree.io/f/meozlbvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      Alert.alert('Success', 'Booking submitted!');
      resetForm();
      navigation.navigate('ThankYou');
    } else {
      Alert.alert('Error', 'Submission failed. Please try again later.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
};


  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', message: '', consent: false }}
      validationSchema={contactSchema}
      onSubmit={handleFinalSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={require('../assets/icon.png')} style={styles.logo} />

          <TextInput
            label="Name*"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            style={styles.input}
          />
          {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <TextInput
            label="Email*"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={styles.input}
            keyboardType="email-address"
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextInput
            label="Phone*"
            value={values.phone}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            style={styles.input}
            keyboardType="phone-pad"
          />
          {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

          <TextInput
            label="Message"
            value={values.message}
            onChangeText={handleChange('message')}
            onBlur={handleBlur('message')}
            style={styles.input}
            multiline
          />

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={values.consent ? 'checked' : 'unchecked'}
              onPress={() => setFieldValue('consent', !values.consent)}
            />
            <Text>I agree to terms and conditions*</Text>
          </View>
          {touched.consent && errors.consent && <Text style={styles.error}>{errors.consent}</Text>}

          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Submit Booking
          </Button>
        </ScrollView>
      )}
    </Formik>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  logo: {
    width: 260,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  button: {
    marginTop: 20,
  },
});
